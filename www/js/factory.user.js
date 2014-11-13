// factory

app.factory('UserService', function() {
    var user = {};

    return {
        getUser: function () {
            return user;
        },
        setUser: function (newUser) {
            user = newUser;
        },
        setToken: function (token) {
            user.token = token;
        },
        setId: function (Id) {
            user = Id;
        }
    };
  }
]);

