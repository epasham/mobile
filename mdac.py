from flask import Flask
from flask import request
from flask import abort
from flask import jsonify
from OpenSSL import SSL
from psycopg2.pool import SimpleConnectionPool
import bcrypt
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import uuid
import datetime
from flask.ext.cors import CORS

app = Flask(__name__)
cors = CORS(app, headers='Content-Type')
dbConnPool = SimpleConnectionPool(1,20,dsn='dbname=mdacdev user=mdacuser password=mdacuserpass host=mdac.cdjtssz7jhec.us-east-1.rds.amazonaws.com:5432')

class get_database:
    def __enter__(self):
        self.conn = dbConnPool.getconn()
        return self.conn
    def __exit__(self,type,value,traceback):
        dbConnPool.putconn(self.conn)

ret_success = {'code':200}
ret_error_not_json = {'msg':"Request was not properly formatted."} #400
ret_error_email_in_use = {'msg':"Email Address already in use."} #450
ret_error_user_pass = {'msg':"Either Username or Password was wrong."} #404
ret_error_missing_token = {'msg':"Missing token."} #451
ret_error_session_expired = {'msg':"Session Token Expired."} #452
ret_error_permission_denied = {'msg':"Permission Denied."} #453
ret_error_invalid_token = {'msg':"Invalid Token."} #454
ret_error_daycare_name_in_use = {'msg':"Daycare Already Exists by that Name."} #455
ret_error_daycare_name_blank = {'msg':"Daycare creation must have a name."} #456
ret_error_invalid_daycare_id = {'msg':"No Daycare for that ID."} #457
ret_error_invalid_user_id = {'msg':"No User exists for that ID."} #458
#Tried to create child with hash in use #459
ret_error_invalid_child_association_token = {'msg':"Invalid Child Association Token."} #460
ret_error_no_child_for_association_token = {'msg':"No child is associated with that token"} #461

def send_email(verification_hash, email):
    fromAddr = "mydayatcare@gmail.com"
    toAddr = email
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "MyDayAtCare Account Verification"
    msg['From'] = fromAddr
    msg['To'] = toAddr
    html = """
            <html>
              <head></head>
              <body>
                Login email: """+email+"""
                <br>Please click the link below to confirm your account.
                <br><a href='https://54.69.129.186:5000/account/verify/""" + verification_hash + """'>https://54.69.129.186:5000/account/verify/"""+ verification_hash+"""</a>
              </body>
            </html> 
            """
    text = "Please click the following link to confirm your account: https://54.69.129.186:5000/account/verify/" + verification_hash
    part1 = MIMEText(text, 'plain')
    part2 = MIMEText(html, 'html')
    msg.attach(part1)
    msg.attach(part2)
    username = "mydayatcare@gmail.com"
    password = "Dhampir1."
    server = smtplib.SMTP('smtp.gmail.com:587')
    server.ehlo()
    server.starttls()
    server.login(username,password)
    server.sendmail(fromAddr,toAddr,msg.as_string())
    server.quit()

def check_token(token):
    ret = {}
    ret['valid'] = False
    ret['user_id'] = -1
    ret['error'] = jsonify(ret_error_invalid_token)
    ret['error_code'] = 454
    with get_database() as conn:
        cur = conn.cursor()
        cur.execute("SELECT issued,user_id FROM session WHERE token = %(token)s",{"token":token})
        row = cur.fetchone()
        if row:
            sqlTime = row[0]
            sessionUser = row[1]
            ret['user_id'] = sessionUser
            if sqlTime < datetime.datetime.now() - datetime.timedelta(days=1):
                cur.execute("DELETE FROM session WHERE user_id = %(user_id)s",{"user_id":sessionUser})
                ret['error'] = jsonify(ret_error_session_expired)
                ret['error_code'] = 452
                conn.commit()
            else:
                ret['valid'] = True
    return ret
    
def isUserSiteAdmin(user_id):
    ret = {}
    ret['valid'] = False
    ret['error'] = jsonify(ret_error_permission_denied)
    ret['error_code'] = 453
    with get_database() as conn:        
        cur = conn.cursor()     
        sessionUser = user_id
        cur.execute(""" SELECT 
                          user_roles.user_id
                        FROM 
                          public.roles, 
                          public.user_roles
                        WHERE 
                          roles.id = user_roles.roles_id AND
                          roles.name = 'site_admin' AND 
                          user_roles.user_id = %(user_id)s""",{"user_id":sessionUser})
        permissionRec = cur.fetchone()
        if not permissionRec:
            ret['valid'] = False
            return ret
        else:
            ret['valid'] = True
    return ret
    
def isUserDaycareAdmin(user_id,daycare_id):
    ret = {}
    ret['valid'] = False
    ret['error'] = jsonify(ret_error_permission_denied)
    ret['error_code'] = 453
    with get_database() as conn:        
        cur = conn.cursor()     
        cur.execute(""" SELECT 
                          user_roles.user_id
                        FROM 
                          public.daycare, 
                          public.roles, 
                          public.user_roles
                        WHERE 
                          roles.id = user_roles.roles_id AND
                          user_roles.user_id = daycare.admin AND
                          roles.name = 'daycare_admin' AND 
                          daycare.id = %(daycare_id)s AND 
                          user_roles.user_id = %(user_id)s""", \
                          {"user_id":user_id,"daycare_id":daycare_id})
        permissionRec = cur.fetchone()
        if not permissionRec:
            ret['valid'] = False
            return ret
        else:
            ret['valid'] = True
    return ret

@app.route('/')
def hello_world():
    return 'MyDayAtCare Hello World!'

#account creation - parents
@app.route('/account/create', methods=['POST'])
def createAccount():
    if (not request.json) \
    or (not 'first_name' in request.json) \
    or (not 'last_name' in request.json) \
    or (not 'email_address' in request.json) \
    or (not 'home_phone' in request.json) \
    or (not 'cell_phone' in request.json) \
    or (not 'home_address' in request.json) \
    or (not 'home_state' in request.json) \
    or (not 'home_zip' in request.json) \
    or (not 'company_name' in request.json) \
    or (not 'work_phone' in request.json) \
    or (not 'work_address' in request.json) \
    or (not 'work_state' in request.json) \
    or (not 'work_zip' in request.json) \
    or (not 'job_title' in request.json) \
    or (not 'password' in request.json):
        return jsonify(ret_error_not_json),400  
    print (request.json)
    with get_database() as conn:
        
        cur = conn.cursor()
        cur.execute("SELECT email_address FROM users WHERE email_address = %(email)s",{"email":request.json['email_address']})
        rows = cur.fetchall()
        if len(rows) > 0:
            return jsonify(ret_error_email_in_use),450
        hashed = bcrypt.hashpw(request.json['password'],bcrypt.gensalt())

        cur.execute("""INSERT INTO users (first_name,last_name,email_address,home_phone,cell_phone,home_address,home_state,home_zip,company_name,work_phone,work_address,work_state,work_zip,job_title,hashpw)
                    VALUES(%(first)s,%(last)s,%(email)s,%(hpn)s,%(cpn)s,%(hadd)s,%(hstate)s,%(hzip)s,%(cname)s,%(wpn)s,%(wadd)s,%(wstate)s,%(wzip)s,%(job_title)s,%(pass)s)""", \
                   {"first":request.json['first_name'],"last":request.json['last_name'],"email":request.json['email_address'], \
                    "hpn":request.json['home_phone'],"cpn":request.json['cell_phone'],"hadd":request.json['home_address'], \
                    "hstate":request.json['home_state'],"hzip":request.json['home_zip'] if request.json['home_zip'] != '' else 0,"cname":request.json['company_name'], \
                    "wpn":request.json['work_phone'],"wadd":request.json['work_address'],"wstate":request.json['work_state'], \
                    "wzip":request.json['work_zip'] if request.json['work_zip'] != '' else 0,"job_title":request.json['job_title'],"pass":hashed})
        cur.execute("""SELECT id FROM users WHERE email_address = %(email)s""",{"email":request.json['email_address']})
        rows = cur.fetchall()
        newId = rows[0][0]
        verification_hash = uuid.uuid4().hex
        cur.execute("INSERT INTO account_verification (verify_hash,user_id) VALUES(%(hash)s,%(id)s)",{"hash":verification_hash,"id":newId})
        conn.commit()
        send_email(verification_hash,request.json['email_address'])
    return jsonify(ret_success)

@app.route('/account/resend',methods=['POST'])
def resendEmail():
    if (not request.json) \
    or (not 'email_address' in request.json):
        return jsonify(ret_error_not_json),400
    print (request.json)
    with get_database() as conn:
        cur = conn.cursor()
        email = request.json['email_address']
        cur.execute("SELECT id FROM users WHERE email_address = %(email)s AND verified=FALSE",{"email":email})
        rows = cur.fetchall()
        if len(rows) > 0:
            user_id = rows[0][0]
            verification_hash = uuid.uuid4().hex
            cur.execute("SELECT user_id FROM account_verification WHERE user_id = %(user_id)s",{"user_id":user_id})
            verification_rows = cur.fetchall()
            if len(verification_rows) == 1:
                cur.execute("UPDATE account_verification SET verify_hash=%(hash)s,last_attempt=NOW() WHERE user_id=%(user_id)s",
                           {"hash":verification_hash,"user_id":user_id})
                conn.commit()
                send_email(verification_hash,email)
    return jsonify(ret_success)

@app.route('/account/verify/<possible_hash>',methods=['GET'])
def verifyAccount(possible_hash):
    with get_database() as conn:
        cur = conn.cursor()
        cur.execute("SELECT user_id FROM account_verification WHERE verify_hash = %(hash)s",{"hash":possible_hash})
        rows = cur.fetchall()
        if len(rows) == 1:
            user_id = rows[0][0]
            cur.execute("UPDATE users SET verified=TRUE WHERE id=%(user_id)s",
                       {"user_id":user_id,})
            cur.execute("DELETE FROM account_verification WHERE verify_hash = %(hash)s",{"hash":possible_hash})
            conn.commit()
    return jsonify(ret_success)

@app.route('/account/verify',methods=['POST'])
def verify():
    if (not request.json) \
    or (not 'password' in request.json) \
    or (not 'email_address' in request.json):
        return jsonify(ret_error_not_json),400
    print (request.json)
    with get_database() as conn:
        password = request.json['password']
        email = request.json['email_address']
        cur = conn.cursor()
        cur.execute("SELECT hashpw,id FROM users WHERE email_address = %(email)s",{"email":email})
        rows = cur.fetchall()
        if len(rows) == 1:
            hashpw = rows[0][0]
            user_id = rows[0][1]
            if bcrypt.hashpw(password, hashpw) == hashpw:
                cur.execute("DELETE FROM session WHERE user_id = %(user_id)s",{"user_id":user_id})
                token = uuid.uuid4().hex
                cur.execute("INSERT INTO session (token,user_id) VALUES(%(token)s,%(user_id)s)",{"token":token,"user_id":user_id})
                conn.commit()
                teacher = False
                daycareAdmin = False
                parent = False
                siteAdmin = False
                cur.execute(""" SELECT 
                                  classes.id
                                FROM 
                                  public.classes, 
                                  public.users
                                WHERE 
                                  users.id = classes.teacher AND
                                  users.id = %(user_id)s
                """,{"user_id":user_id})
                classes = cur.fetchall()
                if len(classes) > 0:
                    teacher = True
                cur.execute(""" SELECT 
                                  daycare.id
                                FROM 
                                  public.daycare
                                WHERE 
                                  daycare.admin = %(user_id)s
                """,{"user_id":user_id})
                daycares = cur.fetchall()
                if len(daycares) > 0:
                    daycareAdmin = True
                cur.execute(""" SELECT 
                                  child_user_association.child_id
                                FROM 
                                  public.child_user_association
                                WHERE 
                                  child_user_association.user_id = %(user_id)s
                """,{"user_id":user_id})
                children = cur.fetchall()
                if len(children) > 0:
                    parent = True
                cur.execute(""" SELECT 
                                  user_roles.id
                                FROM 
                                  public.user_roles, 
                                  public.roles
                                WHERE 
                                  roles.id = user_roles.roles_id AND
                                  roles.name = 'site_admin' AND 
                                  user_roles.user_id =  %(user_id)s
                """,{"user_id":user_id})
                siteAdminRec = cur.fetchall()
                if len(siteAdminRec) > 0:
                    siteAdmin = True
                return jsonify({'token':token,'user_id':user_id,'teacher':teacher,'daycare_admin':daycareAdmin,'parent':parent,'site_admin':siteAdmin}),200
    return jsonify(ret_error_user_pass),404 
    
def getUser(user_id, token):
    with get_database() as conn:
        cur = conn.cursor()     
        tokenCheck = check_token(token)
        if not tokenCheck['valid']:
              return tokenCheck['error'],tokenCheck['error_code']
        else:
            sessionUser = tokenCheck['user_id']
            if sessionUser != user_id:
                return jsonify(ret_error_permission_denied),453
            else:
                cur.execute("""SELECT first_name,
                                    last_name,
                                    email_address,
                                    home_phone,
                                    cell_phone,
                                    home_address,
                                    home_state,
                                    home_zip,
                                    company_name,
                                    work_phone,
                                    work_address,
                                    work_state,
                                    work_zip,
                                    job_title  FROM users WHERE id = %(user_id)s
                """,{"user_id":sessionUser})
                userRec = cur.fetchone()
                userFirst = userRec[0]
                userLast  = userRec[1]
                userEmail = userRec[2]
                userHpn   = userRec[3]
                userCpn   = userRec[4]
                userHadd  = userRec[5]
                userHst   = userRec[6]
                userHzip  = userRec[7]
                userCom   = userRec[8]
                userWpn   = userRec[9]
                userWadd  = userRec[10]
                userWst   = userRec[11]
                userWzip  = userRec[12]
                userJtitle= userRec[13]
                ret = {}
                children = {}
                notifications = {}
                ret['children'] = children
                ret['notifications']= notifications
                ret['id']           = user_id
                ret['first_name']   = userFirst
                ret['last_name']    = userLast
                ret['email_address']= userEmail
                ret['home_phone']   = userHpn
                ret['cell_phone']   = userCpn
                ret['home_address'] = userHadd
                ret['home_state']   = userHst
                ret['home_zip']     = userHzip
                ret['work_phone']   = userWpn
                ret['work_address'] = userWadd
                ret['wort_state']   = userWst
                ret['work_zip']     = userWzip
                ret['job_title']    = userJtitle
                ret['type']         = "Parent"
                return jsonify(ret)
        
@app.route('/account/<int:user_id>',methods=['GET'])
def readUser(user_id):
  if 'token' in request.args:
      token = request.args.get('token')
      with get_database() as conn:
          cur = conn.cursor()
          return getUser(user_id, token)
  else:
      return jsonify(ret_error_missing_token),451
      
@app.route('/account',methods=['GET'])
def readAllUsers():
  if 'token' in request.args:
      token = request.args.get('token')
      with get_database() as conn:
        cur = conn.cursor()     
        tokenCheck = check_token(token)
        if not tokenCheck['valid']:
              return tokenCheck['error'],tokenCheck['error_code']
        else:
            sessionUser = tokenCheck['user_id']
            siteAdminCheck = isUserSiteAdmin(sessionUser)
            if not siteAdminCheck['valid']:
                return siteAdminCheck['error'],siteAdminCheck['error_code']
            else:
                cur.execute("""SELECT id,
                                    first_name,
                                    last_name,
                                    email_address,
                                    home_phone,
                                    cell_phone,
                                    home_address,
                                    home_state,
                                    home_zip,
                                    company_name,
                                    work_phone,
                                    work_address,
                                    work_state,
                                    work_zip,
                                    job_title  FROM users
                """,{"user_id":sessionUser})
                userRec = cur.fetchall()
                ret = []
                for rec in userRec:
                    userId    = rec[0]
                    userFirst = rec[1]
                    userLast  = rec[2]
                    userEmail = rec[3]
                    userHpn   = rec[4]
                    userCpn   = rec[5]
                    userHadd  = rec[6]
                    userHst   = rec[7]
                    userHzip  = rec[8]
                    userCom   = rec[9]
                    userWpn   = rec[10]
                    userWadd  = rec[11]
                    userWst   = rec[12]
                    userWzip  = rec[13]
                    userJtitle= rec[14]
                    user = {}
                    children = {}
                    notifications = {}
                    user['children'] = children
                    user['notifications']= notifications
                    user['id']           = userId
                    user['first_name']   = userFirst
                    user['last_name']    = userLast
                    user['email_address']= userEmail
                    user['home_phone']   = userHpn
                    user['cell_phone']   = userCpn
                    user['home_address'] = userHadd
                    user['home_state']   = userHst
                    user['home_zip']     = userHzip
                    user['work_phone']   = userWpn
                    user['work_address'] = userWadd
                    user['wort_state']   = userWst
                    user['work_zip']     = userWzip
                    user['job_title']    = userJtitle
                    user['type']         = "Parent"
                    ret.append(user)
                return jsonify(items=ret)
  else:
      return jsonify(ret_error_missing_token),451
      
@app.route('/account/<int:user_id>',methods=['PUT'])
def updateUser(user_id):
    if (not request.json) \
    or (not 'first_name' in request.json) \
    or (not 'last_name' in request.json) \
    or (not 'email_address' in request.json) \
    or (not 'home_phone' in request.json) \
    or (not 'cell_phone' in request.json) \
    or (not 'home_address' in request.json) \
    or (not 'home_state' in request.json) \
    or (not 'home_zip' in request.json) \
    or (not 'company_name' in request.json) \
    or (not 'work_phone' in request.json) \
    or (not 'work_address' in request.json) \
    or (not 'work_state' in request.json) \
    or (not 'work_zip' in request.json) \
    or (not 'job_title' in request.json) \
    or (not 'token' in request.json):
        return jsonify(ret_error_not_json),400  
    print (request.json)
    token = request.json['token']
    tokenCheck = check_token(token)
    if not tokenCheck['valid']:
        return tokenCheck['error'],tokenCheck['error_code']
    else:
        with get_database() as conn:
            cur = conn.cursor()          
            sessionUser = tokenCheck['user_id']
            if sessionUser != user_id:
                return jsonify(ret_error_permission_denied),453
            else:
                cur.execute("""UPDATE users SET (first_name,last_name,email_address,home_phone,cell_phone,home_address,home_state,home_zip,company_name,work_phone,work_address,work_state,work_zip,job_title)
                    = (%(first)s,%(last)s,%(email)s,%(hpn)s,%(cpn)s,%(hadd)s,%(hstate)s,%(hzip)s,%(cname)s,%(wpn)s,%(wadd)s,%(wstate)s,%(wzip)s,%(job_title)s) WHERE id = %(user_id)s""", \
                {"first":request.json['first_name'],"last":request.json['last_name'],"email":request.json['email_address'], \
                "hpn":request.json['home_phone'],"cpn":request.json['cell_phone'],"hadd":request.json['home_address'], \
                "hstate":request.json['home_state'],"hzip":request.json['home_zip'] if request.json['home_zip'] != '' else 0,"cname":request.json['company_name'], \
                "wpn":request.json['work_phone'],"wadd":request.json['work_address'],"wstate":request.json['work_state'], \
                "wzip":request.json['work_zip'] if request.json['work_zip'] != '' else 0,"job_title":request.json['job_title'],"user_id":user_id})
                conn.commit()
        return getUser(user_id,token)

#account creation - daycare
@app.route('/daycare/create', methods=['POST'])
def createDaycare():    
    if (not request.json) \
    or (not 'company_name' in request.json) \
    or (not 'work_phone' in request.json) \
    or (not 'work_address' in request.json) \
    or (not 'work_state' in request.json) \
    or (not 'work_zip' in request.json) \
    or (not 'token' in request.json) \
    or (not 'admin_id' in request.json):
        return jsonify(ret_error_not_json),400  
    if request.json['company_name'] == '':
        return jsonify(ret_error_daycare_name_blank), 456
    print (request.json)
    with get_database() as conn:        
        cur = conn.cursor()     
        token = request.json['token']
        tokenCheck = check_token(token)
        if not tokenCheck['valid']:
              return tokenCheck['error'],tokenCheck['error_code']
        else:
            sessionUser = tokenCheck['user_id']
            siteAdminCheck = isUserSiteAdmin(sessionUser)
            if not siteAdminCheck['valid']:
                return siteAdminCheck['error'],siteAdminCheck['error_code']
            else:
                cur.execute("""SELECT id FROM daycare WHERE company_name = %(cname)s""",{"cname":request.json['company_name']})
                recId = cur.fetchone()
                if not recId:
                    cur.execute("""INSERT INTO daycare (company_name,work_phone,work_address,work_state,work_zip,admin)
                        VALUES(%(cname)s,%(wpn)s,%(wadd)s,%(wstate)s,%(wzip)s,%(admin)s)""", \
                       {"cname":request.json['company_name'], \
                        "wpn":request.json['work_phone'],"wadd":request.json['work_address'],"wstate":request.json['work_state'], \
                        "wzip":request.json['work_zip'] if request.json['work_zip'] != '' else 0,"admin":request.json['admin_id']})
                    cur.execute("""SELECT id FROM daycare WHERE company_name = %(cname)s""",{"cname":request.json['company_name']})
                    recId = cur.fetchone()
                    cur.execute("""SELECT 
                                  roles.id
                                FROM 
                                  public.roles
                                WHERE 
                                  roles.name = 'daycare_admin'""")
                    daycareRoleId = cur.fetchone()                    
                    cur.execute(""" INSERT INTO user_roles (user_id, roles_id) 
                                    VALUES (%(user_id)s,%(roles_id)s)""", \
                                    {"user_id":sessionUser,"roles_id":daycareRoleId[0]})
                    conn.commit()
                    return jsonify({'daycare_id':recId[0]}),200
                else:
                    return jsonify(ret_error_daycare_name_in_use), 455
                    
@app.route('/daycare/<int:daycare_id>', methods=['PUT'])
def updateDayacre(daycare_id):    
    if (not request.json) \
    or (not 'company_name' in request.json) \
    or (not 'work_phone' in request.json) \
    or (not 'work_address' in request.json) \
    or (not 'work_state' in request.json) \
    or (not 'work_zip' in request.json) \
    or (not 'token' in request.json) \
    or (not 'admin_id' in request.json):
        return jsonify(ret_error_not_json),400  
    if request.json['company_name'] == '':
        return jsonify(ret_error_daycare_name_blank), 456
    print (request.json)
    with get_database() as conn:        
        cur = conn.cursor()     
        token = request.json['token']
        tokenCheck = check_token(token)
        if not tokenCheck['valid']:
              return tokenCheck['error'],tokenCheck['error_code']
        else:
            sessionUser = tokenCheck['user_id']
            #siteAdminCheck = isUserSiteAdmin(sessionUser)
            daycareAdminCheck = isUserDaycareAdmin(sessionUser,daycare_id)
            if not daycareAdminCheck['valid']:
                return daycareAdminCheck['error'],daycareAdminCheck['error_code']
            else:
                cur.execute(""" SELECT 
                                  daycare.id,
                                  daycare.admin
                                FROM 
                                  public.daycare
                                WHERE 
                                  daycare.id != %(daycare_id)s AND 
                                  daycare.company_name = %(cname)s""", \
                            {"cname":request.json['company_name'], "daycare_id":daycare_id})
                recId = cur.fetchone()
                if not recId:
                    cur.execute(""" SELECT 
                                      roles.id
                                    FROM 
                                      public.roles
                                    WHERE 
                                      roles.name = 'daycare_admin'""")
                    daycareRoleId = cur.fetchone()
                    cur.execute(""" SELECT 
                                  daycare.admin
                                FROM 
                                  public.daycare
                                WHERE 
                                  daycare.id = %(daycare_id)s""", \
                                {"daycare_id":daycare_id})
                    recId = cur.fetchone()
                    cur.execute("""DELETE FROM user_roles WHERE roles_id = %(roles_id)s AND user_id = %(user_id)s""",{"roles_id":daycareRoleId,"user_id":recId[0]})
                    print (cur.query)
                    cur.execute("""UPDATE daycare SET (company_name,work_phone,work_address,work_state,work_zip,admin)
                        = (%(cname)s,%(wpn)s,%(wadd)s,%(wstate)s,%(wzip)s,%(admin)s)""", \
                       {"cname":request.json['company_name'], \
                        "wpn":request.json['work_phone'],"wadd":request.json['work_address'],"wstate":request.json['work_state'], \
                        "wzip":request.json['work_zip'] if request.json['work_zip'] != '' else 0,"admin":request.json['admin_id']})
                    cur.execute("""SELECT id FROM daycare WHERE company_name = %(cname)s""",{"cname":request.json['company_name']})
                    recId = cur.fetchone() 
                    cur.execute(""" INSERT INTO user_roles (user_id, roles_id) 
                                    VALUES (%(user_id)s,%(roles_id)s)""", \
                                    {"user_id":sessionUser,"roles_id":daycareRoleId[0]})
                    conn.commit()
                    return jsonify({'daycare_id':recId[0]}),200
                else:
                    return jsonify(ret_error_daycare_name_in_use), 455
                
def getDaycare(daycare_id):
    with get_database() as conn:
        cur = conn.cursor()   
        cur.execute("""  SELECT company_name,
                                work_phone,
                                work_address,
                                work_state,
                                work_zip,
                                admin FROM daycare WHERE id = %(daycare_id)s
                        """,{"daycare_id":daycare_id})
        #print cur.query
        companyRec = cur.fetchone()
        companyName = companyRec[0]
        companyWorkPhone = companyRec[1]
        companyWorkAdd   = companyRec[2]
        companyWorkSt    = companyRec[3]
        companyWorkZip   = companyRec[4]
        companyAdminId   = companyRec[5]
        if companyRec:
            cur.execute("""SELECT id,
                                  first_name,
                                  last_name,
                                  work_phone,
                                  work_address,
                                  work_state,
                                  work_zip,
                                  job_title FROM users where id = %(admin_id)s
                        """,{"admin_id":companyAdminId})
            #print cur.query
            ret = {}                  
            ret["daycare_id"]   = daycare_id
            ret["company_name"] = companyName
            ret["work_phone"]   = companyWorkPhone
            ret["work_address"] = companyWorkAdd
            ret["work_state"]   = companyWorkSt
            ret["work_zip"]     = companyWorkZip
            adminRecords = cur.fetchall()
            administrators = []
            for admin in adminRecords:
                record = {}
                record["id"]           = admin[0]
                record["first_name"]   = admin[1]
                record["last_name"]    = admin[2]
                record["work_phone"]   = admin[3]
                record["work_address"] = admin[4]
                record["work_state"]   = admin[5]
                record["work_zip"]     = admin[6]
                record["job_title"]    = admin[7]
                administrators.append(record)
            ret["administrators"] = administrators
            cur.execute("""SELECT 
                          users.id, 
                          users.first_name,
                          users.last_name,
                          users.work_phone, 
                          users.work_address, 
                          users.work_state, 
                          users.work_zip, 
                          users.job_title
                        FROM 
                          users, 
                          classes, 
                          daycare
                        WHERE 
                          users.id = classes.teacher AND
                          classes.daycare = daycare.id AND
                          daycare.id = %(daycare_id)s
                        """,{"daycare_id":daycare_id})
            #print cur.query
            employees = []
            employeeRecords = cur.fetchall()
            for employee in employeeRecords:
                record = {}
                record["id"]           = employee[0]
                record["first_name"]   = employee[1]
                record["last_name"]    = employee[2]
                record["work_phone"]   = employee[3]
                record["work_address"] = employee[4]
                record["work_state"]   = employee[5]
                record["work_zip"]     = employee[6]
                record["job_title"]    = employee[7]
                employees.append(record)
            ret["employees"] = employees
            
            cur.execute("""SELECT 
                          classes.id, 
                          classes.name
                        FROM 
                          public.classes, 
                          public.daycare
                        WHERE 
                          classes.daycare = daycare.id AND
                          daycare.id = %(daycare_id)s
                        GROUP BY
                          classes.id
                        """,{"daycare_id":daycare_id})
            #print cur.query
            classes = []
            classRecords = cur.fetchall()
            for classRec in classRecords:
                record = {}
                record["id"]           = classRec[0]
                record["name"]         = classRec[1]
                cur.execute("""SELECT 
                              users.id
                            FROM 
                              classes, 
                              users
                            WHERE 
                              users.id = classes.teacher AND
                              classes.id = %(class_id)s;
                            """,{"class_id":record["id"]})
                #print cur.query
                teachers = []
                teacherRecords = cur.fetchall()
                for teacher in teacherRecords:
                    teacherRec = {}
                    teacherRec["id"]           = teacher[0]                    
                    teachers.append(teacherRec)
                record["teachers"] = teachers
            classes.append(record)
            ret["classes"] = classes   
            return jsonify(ret)
        else:
            return jsonify(ret_error_invalid_daycare_id),457

@app.route('/daycare/<int:daycare_id>',methods=['GET'])
def readDaycare(daycare_id):
    return getDaycare(daycare_id)        

#child actions
@app.route('/account/<int:user_id>/child/create',methods=['POST'])
def parentCreateChild(user_id):
    if (not request.json) \
    or (not 'first_name' in request.json) \
    or (not 'last_name' in request.json) \
    or (not 'dob' in request.json) \
    or (not 'picture_file' in request.json) \
    or (not 'association_token' in request.json) \
    or (not 'token' in request.json):
        return jsonify(ret_error_not_json),400  
    print (request.json)
    token = request.json['token']
    tokenCheck = check_token(token)
    if not tokenCheck['valid']:
        return tokenCheck['error'],tokenCheck['error_code']
    else:
        with get_database() as conn:
            cur = conn.cursor()          
            sessionUser = tokenCheck['user_id']
            if sessionUser != user_id:
                return jsonify(ret_error_permission_denied),453
            else:
                cur.execute("""  SELECT 
                                    child_id,
                                    short_hash
                                 FROM 
                                    child_token_association 
                                 WHERE 
                                    short_hash = %(short_hash)s
                            """,{"short_hash":request.json['association_token']})
                tokenAssociation = cur.fetchone()
                if tokenAssociation:
                    child_id = tokenAssociation[0]
                    short_hash = tokenAssociation[1]
                    if child_id:
                        cur.execute("""  SELECT 
                                            id
                                            first_name,
                                            last_name,
                                            picture_file
                                         FROM 
                                            children
                                         WHERE 
                                            id = %(child_id)s
                                    """,{"child_id":child_id})
                        childRec = cur.fetchone()
                        child = {}
                        child['first_name']         = childRec[0]
                        child['last_name']          = childRec[1]
                        child['picture_file']       = childRec[2]
                        child['association_token']  = request.json['association_token']
                        child['msg'] = "Child Already Exists for that Association Code."
                        return jsonify(child),459
                    else:
                        cur.execute(""" INSERT INTO 
                                            children 
                                            (first_name, last_name,dob,picture_file) 
                                        VALUES 
                                            (%(first_name)s,%(last_name)s,%(dob)s,%(picture_file)s)
                                        RETURNING id
                                    """, \
                                    {"first_name":request.json['first_name'],"last_name":request.json['last_name'], \
                                     "dob":request.json['dob'],"picture_file":request.json['picture_file']})
                        new_child_id = cur.fetchone()[0]
                        cur.execute(""" UPDATE 
                                            child_token_association 
                                        SET 
                                            (child_id)
                                            = 
                                            (%(child_id)s) 
                                        WHERE 
                                            short_hash = %(short_hash)s
                                    """, \
                                    {"child_id":new_child_id, "short_hash":request.json['association_token']})
                        cur.execute(""" INSERT INTO 
                                            child_user_association 
                                            (user_id, child_id) 
                                        VALUES 
                                            (%(user_id)s,%(child_id)s)
                                    """, \
                                    {"user_id":user_id,"child_id":new_child_id})
                        conn.commit()
                        return jsonify({'child_id':new_child_id}),200
                else:
                    return jsonify(ret_error_invalid_child_association_token),460
                    
@app.route('/account/<int:user_id>/child/associate',methods=['POST'])
def parentAssociateChild(user_id):
    if (not request.json) \
    or (not 'association_token' in request.json) \
    or (not 'token' in request.json):
        return jsonify(ret_error_not_json),400  
    print (request.json)
    token = request.json['token']
    tokenCheck = check_token(token)
    if not tokenCheck['valid']:
        return tokenCheck['error'],tokenCheck['error_code']
    else:
        with get_database() as conn:
            cur = conn.cursor()          
            sessionUser = tokenCheck['user_id']
            if sessionUser != user_id:
                return jsonify(ret_error_permission_denied),453
            else:
                cur.execute("""  SELECT 
                                    child_id,
                                    short_hash
                                 FROM 
                                    child_token_association 
                                 WHERE 
                                    short_hash = %(short_hash)s
                            """,{"short_hash":request.json['association_token']})
                tokenAssociation = cur.fetchone()
                if tokenAssociation:
                    child_id = tokenAssociation[0]
                    short_hash = tokenAssociation[1]
                    if child_id:
                        cur.execute(""" SELECT 
                                            id
                                         FROM 
                                            child_user_association 
                                         WHERE 
                                            user_id = %(user_id)s
                                         AND
                                            child_id = %(child_id)s
                                    """, \
                                    {"user_id":user_id,"child_id":child_id})
                        alreadyExists = cur.fetchone()
                        if not alreadyExists:
                            cur.execute(""" INSERT INTO 
                                                child_user_association 
                                                (user_id, child_id) 
                                            VALUES 
                                                (%(user_id)s,%(child_id)s)
                                        """, \
                                        {"user_id":user_id,"child_id":child_id})
                            conn.commit()                            
                        else:
                            print ("Already Exists")
                        return jsonify(ret_success)
                    else:
                        return jsonify(ret_error_no_child_for_association_token),461
                else:
                    return jsonify(ret_error_invalid_child_association_token),460
                        
@app.route('/daycare/<int:daycare_id>/class/<int:class_id>/token_request',methods=['POST']) 
def daycareGenerateTokens(daycare_id,class_id):
    if (not request.json) \
    or (not 'number_of_tokens' in request.json) \
    or (not 'token' in request.json):
        return jsonify(ret_error_not_json),400  
    print (request.json)
    with get_database() as conn:        
        cur = conn.cursor()     
        token = request.json['token']
        tokenCheck = check_token(token)
        if not tokenCheck['valid']:
              return tokenCheck['error'],tokenCheck['error_code']
        else:
            sessionUser = tokenCheck['user_id']
            daycareAdminCheck = isUserDaycareAdmin(sessionUser,daycare_id)
            if not daycareAdminCheck['valid']:
                return daycareAdminCheck['error'],daycareAdminCheck['error_code']
            else:
                numberOfTokens = request.json['number_of_tokens']
                tokens = []
                while(numberOfTokens > 0):
                    childToken = uuid.uuid4().hex[:8]
                    cur.execute(""" SELECT 
                                      child_token_association.id
                                    FROM 
                                      public.child_token_association
                                    WHERE 
                                      child_token_association.short_hash = %(short_hash)s
                                    """,{"short_hash":childToken})
                    ret = cur.fetchone()
                    if not ret:
                        cur.execute(""" INSERT INTO
                                            child_token_association 
                                            (short_hash,class_id)
                                        VALUES
                                            (%(short_hash)s,%(class_id)s)
                                            """, \
                                        {"short_hash":childToken,"class_id":class_id})
                        tokens.append(childToken)
                        numberOfTokens -= 1
                ret = {}
                ret['association_tokens'] = tokens
                conn.commit()
                return jsonify(ret)

if __name__ == '__main__':
    app.debug = True
    app.config['PROPAGATE_EXCEPTIONS'] = True
    app.run(host='0.0.0.0', debug=False, port=5000, ssl_context=('/home/ubuntu/server.crt','/home/ubuntu/server.key'))
