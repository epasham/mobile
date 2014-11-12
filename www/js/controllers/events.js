                        var loadDashboard = function(){
                            $q.all([
                                    apiWrapper.service('Events').get({'id': $scope.student.id }).$promise,
                                    apiWrapper.service('Schedule').query({filters: 'studentEvent.Upcoming'}).$promise
                                ]).then(function(results) {
                                    if(results && results.length) {
                                        var events = results[0].data ? results[0].data : null;
                                        var schedule = results[1].data ? results[1].data : null;
                                        if(events){
                                            var ordebehaviorResponse = [],
                                                hygiene = [],
                                                behavior = [],
                                                moods = [];
                                            for (var category in events) {
                                                if(category === "HYGIENE"){
                                                    hygiene = events[category];
                                                } else if(category === "BEHAVIOR"){
                                                    behavior = events[category];
                                                } else if(category === "MOODS"){
                                                    moods = events[category];
                                                }
                                            }
                                            events = behavior.concat(moods,hygiene);
                                            for (var i in events) {
                                                if (events[i].category === "HYGIENE") {events[i].chartColor = "#53b096"}
                                                if (events[i].category === "BEHAVIOR") {events[i].chartColor = "#f2665a"}
                                                if (events[i].category === "MOODS") {events[i].chartColor = "#fcba69"}
                                                if (events[i].type.indexOf('diaper') != -1) {
                                                    events[i].maxScore = 36;
                                                    events[i].testLogo = '/assets/images/act.png';
                                                    events[i].testLogoUrl = 'http://actstudent.org';
                                                }
                                                if (events[i].type.indexOf('SAT') != -1) {
                                                    events[i].testLogo = '/assets/images/sat.png';
                                                    events[i].testLogoUrl = 'http://sat.collegeboard.org';
                                                    events[i].maxScore = events[i].type.indexOf('COMPOSITE') !== -1 ? 2400 : 800;
                                                }
                                                if (events[i].type.indexOf('PSAT') != -1) {
                                                    events[i].testLogo = '/assets/images/psat.png';
                                                    events[i].testLogoUrl = 'http://www.collegeboard.com/student/testing/psat/about.html';
                                                    events[i].maxScore = events[i].type.indexOf('COMPOSITE') !== -1 ? 240 : 80;
                                                }
                                                if (events[i].type.indexOf('PLAN') != -1) {
                                                    events[i].maxScore = 32;
                                                    events[i].testLogo = '/assets/images/plan.png';
                                                    events[i].testLogoUrl = 'http://www.actstudent.org/planstudent/';
                                                }
                                                if (events[i].type.indexOf('AP') != -1) {
                                                    events[i].maxScore = 5;
                                                    events[i].testLogo = '/assets/images/ap.png';
                                                    events[i].testLogoUrl = 'http://apstudent.collegeboard.org/home';
                                                }
                                                events[i] = {
                                                    maxScore : events[i].maxScore,
                                                    color : events[i].chartColor,
                                                    studentScore : events[i].studentSpecificValue,
                                                    test : events[i].type,
                                                    analysis : events[i].analysis,
                                                    testLogo : events[i].testLogo,
                                                    testLogoUrl : events[i].testLogoUrl,
                                                    recommendationText : events[i].recommendationText1,
                                                    chartId : 'recChartContainer' + i,
                                                    recChartSettings: {
                                                        dataSource: [
                                                        {test: 'Complete', You: events[i].studentSpecificValue},
                                                        {test: 'Remaining', You: events[i].maxScore - events[i].studentSpecificValue}
                                                        ],
                                                        series: {
                                                            argumentField: 'test',
                                                            valueField: 'You',
                                                            type: 'doughnut',
                                                            innerRadius: 0.7,
                                                            label: {
                                                                visible: false,
                                                                connector: {
                                                                    visible: false
                                                                }
                                                            }
                                                        },
                                                        palette: [events[i].chartColor, '#EDF2F4'],
                                                        tooltip: {
                                                            enabled: false
                                                        },
                                                        title: {
                                                            visible: false
                                                        },
                                                        legend: {
                                                            visible: false
                                                        }
                                                    }
                                                }
                                            }
                                            if (events.length > 0) {
                                                if (events.length < 3) {
                                                $scope.events = events;
                                                $scope.events.push.apply($scope.events, [fillerRecChart1]);
                                                $scope.events.push.apply($scope.events, [fillerRecChart2]);
                                                } else {
                                                    $scope.events = events;
                                                }
                                            } else {
                                                $scope.events = $scope.recSamples;
                                            }
                                            $scope.recSamples.push.apply($scope.recSamples, [sampleRecChart1, sampleRecChart2, sampleRecChart3]);
                                            $timeout($scope.renderRecCharts, 1000, true);
                                        }

                                        if(schedule){
                                            $scope.schedule = schedule;
                                            $scope.hasSchedule = $scope.schedule.length;
                                        }

                                        // resource suggestions (tools)
                                        $http({method: 'GET', url: '/api/resourceSuggestions', headers: {'Content-Type': 'application/json'}})
                                            .success(function(data) {
                                                $scope.resourceSuggestions = data;
                                                angular.forEach($scope.resourceSuggestions, function(rs) {
                                                    rs.imageUrl = '/api/resourceSuggestions/' + rs.suggestionId + '/image'
                                                });
                                            })
                                    }

                                }).then(function(error) {
                                    if(error) {}
                                });
                            getSuggestions();
                        };

                    });

