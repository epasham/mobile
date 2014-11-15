'use strict';

/* Controllers */

angular.module('app')
  .controller('AppCtrl', ['$rootScope', '$scope', '$translate', '$localStorage', '$window', '$http', '$timeout', 
    function(              $rootScope,   $scope,   $translate,   $localStorage,   $window,   $http,   $timeout ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');
    $scope.changeChild = function(child) {

        $scope.child = child;

    };
    $scope.user = function() { 
      if ($rootScope.currentUser) {
      return $rootScope.currentUser;
    }
    };
    // $scope.$watch('$select', function ($select.search) {
    //   $scope.changeChild(currentChild);
    // });
      
      $scope.children = [
        {
          id: 101,    // child_id ?
          first_name: "Mary",
          last_name: "Doe",
          class_id: 1,
          checked_in: true,
          checked_in_time: 1415124826,
          picture_file: 1415124826,
          daycare_name: "Little Bo Peep",
          daycare_id: 200,
          association_token: "qwerty123456",
          points: -14,
          stock: 
            {
              diapers: 20,
              clothes: 1,
              // Meds might be optional, just want to plan for it
              medications: 
                {
                  name: "Medication Name",
                  type: "pill",
                  amount: 10,
                }
              
            },  
            events: {
              behavior: [{
                  id: 1,
                  type: "positive",   // Boolean?
                  name: "Helping",    // Event Type ID?
                  time: 1415124826,
                  points: 10
                },
                {
                  id: 2,
                  type: "negative",
                  name: "Hitting",
                  time: 1415124826,
                  points: -20
              }],
              hygiene: {
                  id: 1,
                  name: "Diaper",
                  type: 1,
                  leak_level: 3,
                  time: 1415124826
              },
              moods: {
              },
              food: [{
                  id: 1,
                  type: "food",
                  name: "Pretzels",
                  time: 1415124826,
                  percent_finished: 50
                },
                {
                  id: 2,
                  type: "drink",
                  name: "Juice",
                  time: 1415124826,
                  percent_finished: 100
                },
                {
                  id: 3,
                  type: "formula",
                  name: "Bottle",
                  time: 1415124826,
                  amount_finished: 2
                },
                {
                  id: 4,
                  type: "cereal",
                  name: "Baby Cereal",
                  time: 1415124826,
                  amount_finished: 6
              }]
            }
          },        
          {
          id: 102,    // child_id ?
          first_name: "Mary",
          last_name: "Doe",
          class_id: 1,
          checked_in: true,
          checked_in_time: 1415124826,
          picture_file: 1415124826,
          daycare_name: "Little Bo Peep",
          daycare_id: 200,
          association_token: "qwerty123456",
          points: -14,
          stock: 
            {
              diapers: 20,
              clothes: 1,
              // Meds might be optional, just want to plan for it
              medications: 
                {
                  name: "Medication Name",
                  type: "pill",
                  amount: 10,
                }
              
            },  
            events: {
              behavior: [{
                  id: 1,
                  type: "positive",   // Boolean?
                  name: "Helping",    // Event Type ID?
                  time: 1415124826,
                  points: 10
                },
                {
                  id: 2,
                  type: "negative",
                  name: "Hitting",
                  time: 1415124826,
                  points: -20
              }],
              hygiene: {
                  id: 1,
                  name: "Diaper",
                  type: 1,
                  leak_level: 3,
                  time: 1415124826
              },
              moods: {
              },
              food: [{
                  id: 1,
                  type: "food",
                  name: "Pretzels",
                  time: 1415124826,
                  percent_finished: 50
                },
                {
                  id: 2,
                  type: "drink",
                  name: "Juice",
                  time: 1415124826,
                  percent_finished: 100
                },
                {
                  id: 3,
                  type: "formula",
                  name: "Bottle",
                  time: 1415124826,
                  amount_finished: 2
                },
                {
                  id: 4,
                  type: "cereal",
                  name: "Baby Cereal",
                  time: 1415124826,
                  amount_finished: 6
              }]
            }
          },
        {
          id: 103,    // child_id ?
          first_name: "Mary",
          last_name: "Doe",
          class_id: 1,
          checked_in: true,
          checked_in_time: 1415124826,
          picture_file: 1415124826,
          daycare_name: "Little Bo Peep",
          daycare_id: 200,
          association_token: "qwerty123456",
          points: -14,
          stock: 
            {
              diapers: 20,
              clothes: 1,
              // Meds might be optional, just want to plan for it
              medications: 
                {
                  name: "Medication Name",
                  type: "pill",
                  amount: 10,
                }
              
            },  
            events: {
              behavior: [{
                  id: 1,
                  type: "positive",   // Boolean?
                  name: "Helping",    // Event Type ID?
                  time: 1415124826,
                  points: 10
                },
                {
                  id: 2,
                  type: "negative",
                  name: "Hitting",
                  time: 1415124826,
                  points: -20
              }],
              hygiene: {
                  id: 1,
                  name: "Diaper",
                  type: 1,
                  leak_level: 3,
                  time: 1415124826
              },
              moods: {
              },
              food: [{
                  id: 1,
                  type: "food",
                  name: "Pretzels",
                  time: 1415124826,
                  percent_finished: 50
                },
                {
                  id: 2,
                  type: "drink",
                  name: "Juice",
                  time: 1415124826,
                  percent_finished: 100
                },
                {
                  id: 3,
                  type: "formula",
                  name: "Bottle",
                  time: 1415124826,
                  amount_finished: 2
                },
                {
                  id: 4,
                  type: "cereal",
                  name: "Baby Cereal",
                  time: 1415124826,
                  amount_finished: 6
              }]
            }
          },
          {
            id: 104,
            first_name: "John",
            last_name: "Doe",
            class_id: 1,
            checked_in: true,
            checked_in_time: 1415779620,
            picture_file: 1415124826,
            daycare_name: "Little Bo Peep",
            daycare_id: 200,
            association_token: "qwerty123456",
            points: 27,
            stock: 
              {
                diapers: 31,
                clothes: 2,
                // Meds might be optional, just want to plan for it
                medications: 
                  {
                    name: "Medication Name",
                    type: "pill",
                    amount: 10
                  }
                
              },
              events: {
                behavior: [{
                    id: 1,
                    type: "positive",   // Boolean?
                    name: "Helping",    // Event Type ID?
                    time: 1415124826,
                    points: 10
                  },
                  {
                    id: 2,
                    type: "negative",
                    name: "Hitting",
                    time: 1415124826,
                    points: -20
                }],
                hygiene: {
                    id: 1,
                    name: "Diaper",
                    type: 1,
                    leak_level: 3,
                    time: 1415124826
                },
                moods: {
                },
                food: [{
                    id: 1,
                    type: "food",
                    name: "Pretzels",
                    time: 1415124826,
                    percent_finished: 50
                  },
                  {
                    id: 2,
                    type: "drink",
                    name: "Juice",
                    time: 1415124826,
                    percent_finished: 100
                  },
                  {
                    id: 3,
                    type: "formula",
                    name: "Bottle",
                    time: 1415124826,
                    amount_finished: 2
                  },
                  {
                    id: 4,
                    type: "cereal",
                    name: "Baby Cereal",
                    time: 1415124826,
                    amount_finished: 6
                }]
              }
          }
        ];
      // end remove

      $scope.child = {};
      $scope.child.selected = $scope.children[0];
      // config
      $scope.app = {
        name: 'My Day at Care',
        version: '1.3.2',
        // for chart colors
        color: {
          primary: '#602b60', // 7266ba
          info:    '#25b6b1', // 23b7e5
          success: '#a0b423', // 27c24c
          warning: '#f8ca01', // fad733
          danger:  '#bd1e52', // f05050
          light:   '#e8eff0', 
          dark:    '#2e313d', // 3a3f51
          black:   '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-white',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-white',
          headerFixed: true,
          asideFixed: false,
          asideFolded: false,
          asideDock: false,
          container: false
        }
      }

      // save settings to local storage
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function(){
        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = {en:'English', de_DE:'German', it_IT:'Italian'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      $scope.setLang = function(langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };

      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

  }]);