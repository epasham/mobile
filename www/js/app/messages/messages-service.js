// A RESTful factory for retreiving messages from 'messages.json'
app.factory('messages', ['$http', function ($http) {
  var path = 'js/app/messages/messages.json';
  var messages = $http.get(path).then(function (resp) {
    return resp.data.messages;
  });

  var factory = {};
  factory.all = function () {
    return messages;
  };
  factory.get = function (id) {
    return messages.then(function(messages){
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].id == id) return messages[i];
      }
      return null;
    })
  };
  return factory;
}]);