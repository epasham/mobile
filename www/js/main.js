'use strict';

/* Controllers */

angular.module('app')
  .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', '$http', '$timeout', 
    function(              $scope,   $translate,   $localStorage,   $window,   $http,   $timeout ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');
      
      //remove when api works
      // $scope.user = {
      //     id: 100,
      //     first_name: "John",
      //     last_name: "Doe",
      //     email_address: "example@example.com",
      //     home_phone: "555-555-5555",
      //     cell_phone: "555-555-5556",
      //     home_address: "2004 Nowhere Lane",
      //     home_state: "MD",
      //     home_zip: 21113,
      //     work_phone: "555-555-5556",
      //     work_address: "2004 Nowhere Lane",
      //     work_state: "MD",
      //     work_zip: 21113,
      //     job_title: "Some Title",
      //     type: "Parent"
      // };
      $scope.children = [{
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
          stock: [
            {
              diapers: 20,
              clothes: 1,
              // Meds might be optional, just want to plan for it
              medications: [
                {
                  name: "Medication Name",
                  type: "pill",
                  amount: 10,
                }
              ]
            }
          ]
          },
          {
          id: 102,
          first_name: "John",
          last_name: "Doe",
          class_id: 1,
          checked_in: true,
          checked_in_time: 1415124826,
          picture_file: 1415124826,
          daycare_name: "Little Bo Peep",
          daycare_id: 200,
          association_token: "qwerty123456",
          stock: [
            {
              diapers: 20,
              clothes: 1,
              // Meds might be optional, just want to plan for it
              medications: [
                {
                  name: "Medication Name",
                  type: "pill",
                  amount: 10
                }
              ]
            }
          ]
      }];
      // end remove
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