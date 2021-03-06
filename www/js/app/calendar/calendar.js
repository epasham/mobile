/**
 * calendarDemoApp - 0.1.3
 */

app.controller('FullcalendarCtrl', ['$scope', '$modal', function($scope, $modal) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };

    /* event source that contains custom events on the scope */
    $scope.events = [
      {title:'snack', start: new Date(y, m, d), className: ['b-l b-2x b-primary'], allDay: true, location:'New York', info:'This a all day event that will start from 9:00 am to 9:00 pm, have fun!'},
      {title:'lunch', start: new Date(y, m, d), className: ['b-l b-2x b-info'], allDay: true, location:'New York', info:'This a all day event that will start from 9:00 am to 9:00 pm, have fun!'},
      {title:'snack', start: new Date(y, m, d), className: ['b-l b-2x b-info'], allDay: true, location:'New York', info:'This a all day event that will start from 9:00 am to 9:00 pm, have fun!'},
      {title:'Dance class', start: new Date(y, m, 3), end: new Date(y, m, 4, 9, 30), allDay: false, className: ['b-l b-2x b-danger'], location:'London', info:'Two days dance training class.'},
      {title:'Game racing', start: new Date(y, m, 6, 16, 0), className: ['b-l b-2x b-info'], location:'Hongkong', info:'The most big racing of this year.'},
      {title:'Soccer', start: new Date(y, m, 8, 15, 0), className: ['b-l b-2x b-info'], location:'Rio', info:'Do not forget to watch.'},
      {title:'Family', start: new Date(y, m, 9, 19, 30), end: new Date(y, m, 9, 20, 30), className: ['b-l b-2x b-success'], info:'Family party'},
      {title:'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2), className: ['bg-success bg'], location:'HD City', info:'It is a long long event'},
      {title:'Play game', start: new Date(y, m, d - 1, 16, 0), className: ['b-l b-2x b-info'], location:'Tokyo', info:'Tokyo Game Racing'},
      {title:'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false, className: ['b-l b-2x b-primary'], location:'New York', info:'Party all day'},
      {title:'Repeating Event', start: new Date(y, m, d + 4, 16, 0), alDay: false, className: ['b-l b-2x b-warning'], location:'Home Town', info:'Repeat every day'},      
      {title:'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/', className: ['b-l b-b b-2x b-primary']},
      {title:'Free Play', start: new Date('12/08/2014  7:00:00 AM'), end: new Date('12/08/2014  8:30:00 AM'), className: ['b-l b-b b-2x b-info']},
      {title:'Breakfast', start: new Date('12/08/2014  8:30:00 AM'), end: new Date('12/08/2014  9:00:00 AM'), className: ['b-l b-b b-2x b-success']},
      {title:'Reading', start: new Date('12/08/2014  9:00:00 AM'), end: new Date('12/08/2014  10:00:00 AM'), className: ['b-l b-b b-2x b-warning']},
      {title:'Quiet Time', start: new Date('12/08/2014  10:00:00 AM'), end: new Date('12/08/2014  10:30:00 AM'), className: ['b-l b-b b-2x b-info']},
      {title:'Snack', start: new Date('12/08/2014  10:30:00 AM'), end: new Date('12/08/2014  10:45:00 AM'), className: ['b-l b-2x b-b b-success']},
      {title:'Science Adventure', start: new Date('12/08/2014  10:45:00 AM'), end: new Date('12/08/2014  11:30:00 AM'), className: ['b-l b-b b-2x b-info']},
      {title:'Lunch', start: new Date('12/08/2014  11:30:00 AM'), end: new Date('12/08/2014  12:00:00 PM'), className: ['b-l b-b b-2x b-success']},
      {title:'Art', start: new Date('12/08/2014  12:00:00 PM'), end: new Date('12/08/2014  1:00:00 PM'), className: ['b-l b-b b-2x b-warning']},
      {title:'Soccer', start: new Date('12/08/2014  1:00:00 PM'), end: new Date('12/08/2014  2:00:00 PM'), className: ['b-l b-b b-2x b-info']}
    ];

    /* alert on dayClick */
    $scope.precision = 400;
    $scope.lastClickTime = 0;
    $scope.alertOnEventClick = function( date, jsEvent, view ){
      var time = new Date().getTime();
      if(time - $scope.lastClickTime <= $scope.precision){
          $scope.events.push({
            title: 'New Event',
            start: date,
            className: ['b-l b-2x b-info']
          });
      }
      $scope.lastClickTime = time;
    };
    /* alert on Drop */
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };

    $scope.overlay = $('.fc-overlay');
    $scope.alertOnMouseOver = function( event, jsEvent, view ){
      $scope.event = event;
      $scope.overlay.removeClass('left right').find('.arrow').removeClass('left right top pull-up');
      var wrap = $(jsEvent.target).closest('.fc-event');
      var cal = wrap.closest('.calendar');
      var left = wrap.offset().left - cal.offset().left;
      var right = cal.width() - (wrap.offset().left - cal.offset().left + wrap.width());
      if( right > $scope.overlay.width() ) { 
        $scope.overlay.addClass('left').find('.arrow').addClass('left pull-up')
      }else if ( left > $scope.overlay.width() ) {
        $scope.overlay.addClass('right').find('.arrow').addClass('right pull-up');
      }else{
        $scope.overlay.find('.arrow').addClass('top');
      }
      (wrap.find('.fc-overlay').length == 0) && wrap.append( $scope.overlay );
    }

    /* config object */
    $scope.uiConfig = {
      calendar:{
        defaultView: 'agendaWeek',
        height: 450,
        editable: true,
        header:{
          left: 'prev',
          center: 'title',
          right: 'next'
        },
        dayClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventMouseover: $scope.alertOnMouseOver
      }
    };
    
    /* add custom event*/
    $scope.open = function () {
      var modalInstance = $modal.open({
        templateUrl: 'addEvent.html'
      });

    };
    $scope.addEvent = function(newEvent) {
      $scope.events.push(newEvent);
    };

    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };

    /* Change View */
    $scope.changeView = function(view, calendar) {
      $('.calendar').fullCalendar('changeView', view);
    };

    $scope.today = function(calendar) {
      $('.calendar').fullCalendar('today');
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events];
}]);
/* EOF */