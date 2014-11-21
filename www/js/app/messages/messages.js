app.controller('MessageCtrl', ['$scope', function($scope) {
  $scope.folds = [
    {name: 'Inbox', filter:''},
    {name: 'Starred', filter:'starred'},
    {name: 'Sent', filter:'sent'},
    {name: 'Important', filter:'important'},
    {name: 'Draft', filter:'draft'},
    {name: 'Trash', filter:'trash'}
  ];

  $scope.labels = [
    {name: 'Angular', filter:'angular', color:'#25b6b1'},
    {name: 'Bootstrap', filter:'bootstrap', color:'#602b60'},
    {name: 'Client', filter:'client', color:'#f8ca01'},
    {name: 'Work', filter:'work', color:'#a0b423'}
  ];

  $scope.addLabel = function(){
    $scope.labels.push(
      {
        name: $scope.newLabel.name,
        filter: angular.lowercase($scope.newLabel.name),
        color: '#ccc'
      }
    );
    $scope.newLabel.name = '';
  }

  $scope.labelClass = function(label) {
    return {
      'b-l-info': angular.lowercase(label) === 'angular',
      'b-l-primary': angular.lowercase(label) === 'bootstrap',
      'b-l-warning': angular.lowercase(label) === 'client',
      'b-l-success': angular.lowercase(label) === 'work'      
    };
  };

}]);

app.controller('MessageListCtrl', ['$scope', 'messages', '$stateParams', function($scope, messages, $stateParams) {
  $scope.fold = $stateParams.fold;
  messages.all().then(function(messages){
    $scope.messages = messages;
  });
}]);

app.controller('MessageDetailCtrl', ['$scope', 'messages', '$stateParams', function($scope, messages, $stateParams) {
  messages.get($stateParams.messageId).then(function(message){
    $scope.message = message;
  })
}]);

app.controller('MessageNewCtrl', ['$scope', function($scope) {
  $scope.message = {
    to: '',
    subject: '',
    content: ''
  }
  $scope.tolist = [
    {name: 'James', email:'james@gmessage.com'},
    {name: 'Luoris Kiso', email:'luoris.kiso@hotmessage.com'},
    {name: 'Lucy Yokes', email:'lucy.yokes@gmessage.com'}
  ];
}]);

angular.module('app').directive('labelColor', function(){
  return function(scope, $el, attrs){
    $el.css({'color': attrs.color});
  }
});