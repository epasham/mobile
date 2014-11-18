'use strict';

// signup controller
app.controller('NewChildFormController', ['$scope', '$http', '$state', 'Restangular', '$rootScope', 'storage', '$upload', function($scope, $http, $state, Restangular, $rootScope, storage, $upload) {
    $scope.authError = null;
    // $scope.signup = function() {
    //   $scope.authError = null;
    //   // Try to create
    //   Restangular.all('account/create').post("user", {name: $scope.user.name, email: $scope.user.email, password: $scope.user.password}).then(function(response) {
    //     if ( !response.data ) {
    //       $scope.authError = response;
    //     }else{
    //       $state.go('app.dashboard');
    //     }
    //   }, function(x) {
    //     $scope.authError = 'Server Error';
    //   });
    // };
    $scope.newChild = {};
    $scope.user_id = storage.get('user_id');
    $scope.newChild.token = storage.get('token');

    // angular-file-upload config

    // $scope.policy = 'ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogImFuZ3VsYXItZmlsZS11cGxvYWQifSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJGtleSIsICIiXSwKICAgIHsiYWNsIjogInByaXZhdGUifSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJENvbnRlbnQtVHlwZSIsICIiXSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJGZpbGVuYW1lIiwgIiJdLAogICAgWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsIDAsIDUyNDI4ODAwMF0KICBdCn0='
    // $scope.signature = 'm3PdHAUO9tJZbtqZH/io0QjlOcI=';
    // $scope.key = 'AKIAJJHKHYV3ABTIDDCA';

    // $upload.upload({
    //     url: 'https://mdac-images.s3-website-us-west-2.amazonaws.com/', //S3 upload url including bucket name,
    //     method: 'POST',
    //     data : {
    //       key: $scope.newChild.token, // the key to store the file on S3, could be file name or customized
    //       AWSAccessKeyId: $scope.key, 
    //       acl: 'private', // sets the access to the uploaded file in the bucker: private or public 
    //       policy: $scope.policy, // base64-encoded json policy (see article below)
    //       signature: $scope.signature, // base64-encoded signature based on policy string (see article below)
    //       "Content-Type": file.type != '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty),
    //       filename: file.name // this is needed for Flash polyfill IE8-9
    //     },
    //     file: file,
    //   });
    //end angular-file-upload config
      $scope.onFileSelect = function($files) {
      //$files: an array of files selected, each file has name, size, and type.
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        $scope.upload = $upload.upload({
          url: 'server/upload/url', //upload.php script, node.js route, or servlet url
          //method: 'POST' or 'PUT',
          //headers: {'header-key': 'header-value'},
          //withCredentials: true,
          data: {myObj: $scope.child.image},
          file: file, // or list of files ($files) for html5 only
          //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
          // customize file formData name ('Content-Disposition'), server side file variable name. 
          //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
          // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
          //formDataAppender: function(formData, key, val){}
        }).progress(function(evt) {
          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
          // file is uploaded successfully
          console.log(data);
        });
        //.error(...)
        //.then(success, error, progress); 
        // access or attach event listeners to the underlying XMLHttpRequest.
        //.xhr(function(xhr){xhr.upload.addEventListener(...)})
      }
      /* alternative way of uploading, send the file binary with the file's content-type.
         Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
         It could also be used to monitor the progress of a normal http post/put request with large data*/
      // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
    };
    $scope.addChild = function() {
      $scope.success = false;
      $scope.authError = null;
      // Try to create
      var api = Restangular.all('account/'+$scope.user_id+'/child/create/');

      // POST /accounts
      api.post($scope.newChild).then(function(response) {
        if ( response.code == 200 ) {
          $scope.success = true;
          $scope.authError = 'Success!  Please check your email for further instructions.';
        } else if ( response.code == 450 ) {
            $scope.badEmail = true;
            $scope.authError = 'Email address already in use'
        }
      }, function(x) {
        $scope.authError = $scope.response.msg;
      });
    };

  }])
 ;