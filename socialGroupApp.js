//production
//var domain = 'http://www.naftalibennett.org/';
var domain = 'http://localhost:3003/';
var siteOrigin = 'http://www.naftalibennett.org/';

//qa
//var domain = 'http://ec2-23-23-240-76.compute-1.amazonaws.com:3003/';
//var siteOrigin = 'http://www.cambium-team.com/bennetSite/';

var socialGroupApp = angular.module('socialGroupApp', ['ui.router', 'mobile-angular-ui', 'angularFileUpload','ui.bootstrap', 'ngQuickDate', 'ngImgCrop', 'once'])

/**** UI Router ****/
.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/main-menu");

    $stateProvider
		.state("main-menu", {
		    url: "/main-menu",
		    views: {
		        "main": {
		            templateUrl: "./components/mainMenu/mainMenu.html",
		            controller: "mainMenu"
		        }
		    }
		})

        .state('user-profile', {
            url: "/user-profile/:userId",
            views: {
                "main": {
                    templateUrl: "./components/user/userProfile.html",
                    controller: "userProfile"
                }
            }
        })

        .state('talkback', {
            url: "/talkback",
            //url: "/lesson",
            views: {
                "main": {
                    templateUrl: "./components/talkback/talkback.html",
                    controller: "talkback"
                }
            }
        })

        .state('comments', {
            url: "/comments/:postId",
            //url: "/lesson",
            views: {
                "main": {
                    templateUrl: "./components/comments/comments.html",
                    controller: "comments"
                }
            }
        })

        .state('channel', {
            url: "/channel",
            views: {
                "main": {
                    templateUrl: "./components/channel/channel.html",
                    controller: "channel"
                }
            }
        })

        .state('facebookBennet', {
            url: "/facebookBennet/:channelId",
            // url: "/facebookBennet",
            views: {
                "main": {
                    templateUrl: "./components/facebook/facebookBennet.html",
                    controller: "facebookBennet"
                }
            }
        })

		.state('poll-view', {
		    url: "/poll-view/:postId",
		    views: {
		        "main": {
		            templateUrl: "./components/poll/pollView.html",
		            controller: "pollView"
		        }
		    }
		})
		.state('poll', {
		    url: "/poll",
		    views: {
		        "main": {
		            templateUrl: "./components/poll/poll.html",
		            controller: "poll"
		        }
		    }
		})
        .state('write-post', {
            url: "/write-post/:postType/:postId",
            views: {
                "main": {
                    templateUrl: "./components/writePost/writePost.html",
                    controller: "writePost"
                }
            }
        })
        .state('contact', {
             url: "/contact",
             views: {
                 "main": {
                     templateUrl: "./components/contact/contact.html",
                     controller: "contact"
                 }
             }
         })

        .state('meme', {
             url: "/meme",
             views: {
                 "main": {
                     templateUrl: "./components/meme/meme.html",
                     controller: "meme"
                 }
             }
         })

         .state('write-meme', {
            url: "/write-meme",
            views: {
                "main": {
                    templateUrl: "./components/meme/writeMeme.html",
                    controller: "writeMeme"
                }
            }
        })
		
		.state('meme-preview', {
            url: "/meme-preview",
            views: {
                 "main": {
                     templateUrl: "./components/meme/memePreview.html",
                     controller: "previewPubMeme"
                 }
             }
         })
        .state('single-meme', {
            url: "/single-meme/:postId",
            views: {
                "main": {
                    templateUrl: "./components/meme/singleMeme.html",
                    controller: "singleMeme"
                }
            }
        })
		
		.state('event', {
             url: "/event",
             views: {
                 "main": {
                     templateUrl: "./components/event/event.html",
                     controller: "event"
                 }
             }
         })

         .state('points', {
             url: "/points",
             views: {
                 "main": {
                     templateUrl: "./components/points/points.html",
                     controller: "points"
                 }
             }
         })

          .state('breakingnews', {
             url: "/breakingnews",
             views: {
                 "main": {
                     templateUrl: "./components/breakingnews/breakingnews.html",
                     controller: "breakingnews"
                 }
             }
         })

         .state('single-breakingnews', {
            url: "/single-breakingnews/:postId",
            views: {
                "main": {
                    templateUrl: "./components/breakingnews/single-breakingnews.html",
                    controller: "single-breakingnews"
                }
            }
        })

        .state('single-event', {
            url: "/single-event/:postId",
            views: {
                "main": {
                    templateUrl: "./components/event/single-event.html",
                    controller: "single-event"
                }
            }
        })

        .state('chatPromo', {
            url: "/chatPromo",
            views: {
                "main": {
                    templateUrl: "./components/chat/chatPromo.html",
                    controller: "chatPromo"
                }
            }
        })

        .state('chat', {
            url: "/chat",
            views: {
                "main": {
                    templateUrl: "./components/chat/chat.html",
                    controller: "chat"
                }
            }
        })
        })

/**** Ajax Service ****/
.factory('classAjax', ['$http', '$q', function ($http, $q) {
    return {
        getdata: function (method, queryString, request) {
            var deferred = $q.defer();

            $http({
               url: domain + queryString,
               //url: URL,
                method: method, // temp cancel for local json calls
                data: request
            }).
            success(function (data, status, header, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, header, config) {
                deferred.reject(data);
            })

            return deferred.promise;
        }
    }
} ])


.directive('post', ['$rootScope', 'PostService', function ($rootScope, PostService) {
    return {
        restrict: 'E',
        
        link: function (scope, el, attrs) {
            scope.getContentUrl = function() {
            var talkbackTemplate = 'postTemplate.html';
            var articleTemplate = 'articleTemplate.html';
            var authorsTemplate = 'authorsTemplate.html';
            var memesTemplate = 'components/meme/smallMemeTemplate.html';
			var eventTemplate = 'eventTemplate.html';
            var pollTemplate = 'pollTemplate.html';
            var voteToPollTemplate = 'voteToPollTemplate.html';
            var breakingnewsTemplate = 'breakingnewsTemplate.html';
            var chatTemplate = 'chatTemplate.html';

            if(scope.post){
            switch (scope.post.postType) {
                case 'talkback':
                    template = talkbackTemplate;
                    break;

                case 'article':
                    template = articleTemplate;
                    break;

                case 'author':
                    template = authorsTemplate;
                    break;
                case 'comment':
                    template = talkbackTemplate;
                    break;
                case 'meme':
                    template = memesTemplate;
                    break;
                case 'poll':
                    template = pollTemplate;
                    break;
                case 'voteToPoll':
                    template = voteToPollTemplate;
                    break;
				case 'event':
                    template = eventTemplate;
                    break;
                //case undefined:
                //    template = authorsTemplate;
                //    break;
                    
                case 'breakingnews':
                    template = breakingnewsTemplate;
                    break;
                case 'chatMessage':
                    template = chatTemplate;
                    break;
            }
            }

            return template;
                
           }

           el.on('click', function (e) {
                
                if(attrs.postType == 'author'){
                    $rootScope.$broadcast('postClicked', { authorId: scope.post._id, postType: 'author' });
                }
                else if (scope.post.postType == 'voteToPoll') {
                    $rootScope.$broadcast('postClicked', { postId: scope.post._parentID, postType: scope.post.postType, authorId: scope.post._author._id }); //add post type to emit
                }
                else{
                    $rootScope.$broadcast('postClicked', { postId: scope.post._id, postType: scope.post.postType, authorId: scope.post._author._id }); //add post type to emit
                }
            });
            
        },
        template: '<div class="post-wrap" ng-include="getContentUrl()"></div>'
    };
} ])



.directive('comment', ['$rootScope', 'generalParameters', '$state', function ($rootScope, generalParameters, $state) {
    return {
        restrict: 'E',
        template: '<div class="post-comment post-buttons" data-ng-click="$event.stopPropagation();">' +
                '<span class="respond-post">' +
                    '<span class="icon"></span><span>הגב</span></span>' +
                '<span class="respond-count" >{{post.commentsCount+0}}</span></div>',
        replace: 'true',
        link: function (scope, el, attrs) {
            el.on('click', function () {
                
                //PostService.updateCommentsCount();
                // $scope.$emit('handleEmit', {showInput: false}); 
                
				var user = generalParameters.getUser();
				if (user.firstName == 'הצטרף לאפליקציה') {
					
					$rootScope.$broadcast('showInfoPopup', { showInfo: true });
				}
				else {
					
					$state.transitionTo('write-post', { postId: scope.post._id, postType: scope.post.postType });
				}
               
            });
        }

    };
} ])

.directive('like', ['$rootScope', 'PostService', 'generalParameters', function ($rootScope, PostService, generalParameters) {
    return {
        restrict: 'E',
        template: '<div class="post-likes post-buttons" data-ng-click="$event.stopPropagation();"><span data-ng-class="{' + "'is-liked':post.isLiked==true ,'like-post':true}" + '">' +
                    '<span class="icon"></span><span>אהבתי</span></span>' +
                '<span class="like-count">{{post.likesCount || 0}}</span></div>',
        link: function (scope, el, attrs) {
            el.on('click', function () {
			
				if (generalParameters.getUser().firstName == 'הצטרף לאפליקציה') {
					
					$rootScope.$broadcast('showInfoPopup', { showInfo: true });
				}
                else {
                    scope.post.isLiked = !scope.post.isLiked;

                    if (scope.post.isLiked == true) {//LIKE!
						
                        scope.post.likesCount++;
					     PostService.sendLike(scope.post._id, scope.post); 

                    }
                    else {//UNLIKE!
                        scope.post.likesCount--;
                        //scope.$apply();
						PostService.unLike(scope.post._id, scope.post); 
					   

                    }
                } 
            });
        },
        replace: true
    };
} ])

.directive('authorHeader', ['$rootScope', 'PostService', '$state', function ($rootScope, PostService, $state) {
    return {
        restrict: 'E',
        
        templateUrl: './authorHeader.html',
        //replace: true
        link: function (scope, el, attrs) {
            el.on('click', function () {
                
                $state.transitionTo('user-profile', { userId: scope.post._author._id });
            });
        }
    };
} ])

.directive('onLongPress', function ($timeout) {
    return {
        restrict: 'A',
        link: function ($scope, $elm, $attrs) {
            var promise = null;
            $elm.bind('touchstart', function (evt) {
                // Locally scoped variable that will keep track of the long press
                $scope.longPress = true;

                // We'll set a timeout for 600 ms for a long press
                promise = $timeout(function () {
                    if ($scope.longPress) {
                        // If the touchend event hasn't fired,
                        // apply the function given in on the element's on-long-press attribute
                        //$scope.$apply(function () {
                            $scope.$eval($attrs.onLongPress)
                        //});
                    }
                }, 600);
            });

            $elm.bind('touchend', function (evt) {
                // Prevent the onLongPress event from firing
                $timeout.cancel(promise);
                $scope.longPress = false;
                // If there is an on-touch-end function attached to this element, apply it
                if ($attrs.onTouchEnd) {
                    //$scope.$apply(function () {
                        $scope.$eval($attrs.onTouchEnd)
                    //});
                }
            });
        }
    };
})

.directive('fbLike', function ($timeout) {
    return {
        restrict: 'A',
        //  scope: {},
        template: "<div class=\"fb-like-box\" data-href=\"{{page}}\" data-width=\"{{width}}\" data-show-faces=\"{{faces}}\" data-height=\"{{height}}\" data-stream=\"{{stream}}\" data-header=\"{{header}}\"></div>",
        link: function ($scope, $element, $attrs) {
            //          
            //          try{
            //     FB.XFBML.parse();
            //}
            //catch(e)
            //{
            //    
            //}

            $scope.page = 'https://www.facebook.com/NaftaliBennett?fref=ts'; //'https://www.facebook.com/' + $scope.currentChannel;
            $scope.height = '550';
            $scope.faces = 'false';
            $scope.stream = 'true';
            $scope.header = 'false';
            $scope.width = '320';

            // $scope.$apply();
            /* var working, _ref, _ref1;

            $scope.page = $attrs.fbLike;
            $scope.height = (_ref = $attrs.fbHeight) != null ? _ref : '550';
            $scope.faces = $attrs.fbFaces != null ? $attrs.fbFaces : 'false';
            $scope.stream = $attrs.fbStream != null ? $attrs.fbStream : 'true';
            $scope.header = $attrs.fbHeader != null ? $attrs.fbHeader : 'false';
            $scope.width = (_ref1 = $attrs.fbWidth) != null ? _ref1 : $element.parent().width();
            working = false;
        
            $(window).on('resize', function() {
            if (!working) {
            working = true;
            $timeout(function() {
            $scope.width = $element.parent().width();
            $timeout(function() {
            return FB.XFBML.parse($element[0]);
            }, 50, false);
            working = false;
            }, 10);
            }
            });*/
        }
    };
})

.directive('googleChart', ['$timeout', 'generalParameters', function($timeout, generalParameters) {
	return {
            restrict: 'A',
            link: function ($scope, $elm, $attr) {
                $scope.$watch($attr.data, function (value) {
                    
 
                    
                    var options;
				 
                    //render the desired chart based on the type attribute provided
                    var chart;
                    switch ($attr.type) {
                        case('PieChart'):
							options = generalParameters.getOptionsPieChart();
							var data = new google.visualization.DataTable();
								data.addColumn('string', 'name');
								data.addColumn('number', 'votes');
			 
								angular.forEach(value, function (row) {
									data.addRow([row.name, row.votes]);
								});
                            chart = new google.visualization.PieChart($elm[0]);
							chart.draw(data, options);
                            break;
                        case('ColumnChart'):
						
							options = generalParameters.getOptionsColumnChart();
								  
							var data = new google.visualization.DataTable();
								data.addColumn('string', 'name');
								data.addColumn('number', 'votes');
								data.addColumn({type: 'string', role: 'style'});
								//data.addColumn('string', 'percent');
								data.addColumn({type: 'string', role: 'annotation'});
			 
								angular.forEach(value, function (row) {
									data.addRow(["", row.votes, row.color, row.percent]);
								});
								
							var view = new google.visualization.DataView(data);
							view.setColumns([0, 1,
											   2,
											   { //calc: "stringify",
											   calc: function (dt, row) {
      if (dt.getValue(row, 1) >= 0) {
        return dt.getValue(row, 1) //+3
      }
      else {
        return dt.getValue(row, 1) //-3
      }
    },
												 //sourceColumn: 3,
												 //type: "string",
												 type: 'number',
												 //role: "annotation"
												 },3]);
                            chart = new google.visualization.ComboChart($elm[0]);
							chart.draw(view, options);
                            break;
                        case('BarChart'):
                            chart = new google.visualization.BarChart($elm[0]);
                            break;
                        case('Table'):
                            chart = new google.visualization.Table($elm[0]);
                            break;
                    }
                    
					
				});
			}
    };
}])


//in the Html DOM add the word 'scroller' in parent element of the list of the elements.
//in the Html DOM add 'loadingMethod =' and set it to the function in the controller which will react to the scroll down.
.directive('scroller', function () {
    return {
        restrict: 'A',
        scope: {
            loadingMethod: "&"
        },
        link: function (scope, elem, attrs) {
            rawElement = elem[0];
            
            elem.bind('scroll', function () {
                
                if ((rawElement.scrollTop + rawElement.offsetHeight + 100) >= rawElement.scrollHeight) {
                    
                    scope.$apply(scope.loadingMethod);
                }
            });
        }
    };
})

.directive('charLimit', function () {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attributes) {

            var maxLine = $attributes.lineLimit;
            var maxchar = $attributes.charLimit;

            $element.bind('keypress', function (event) {

                var count = ($element.val()).match(/\n/g); //count the "/n", to know number of lines
                // Once the limit has been met or exceeded, prevent all keypresses from working
                if (count) {
                     //console.log(count.length, maxLine)
                      }
                //console.log($element.val().length, maxchar)
                if (($element.val().length >= maxchar) || (maxLine && count && (count.length > maxLine))) {
                    // Except backspace

                    if (event.keyCode != 8) {
                        event.preventDefault();
                    }
                }
            });
        }
    };
})


.directive('upload', function () {//not in use according to 19/11/2014
    return {
        
        link: function (scope, el, attrs) {
		
            el.bind('change', function (event) {
				
                var file = event.target.files[0];
                
				
				if((attrs.upload=='img') && (file.type.match('image/*'))) {
					
					scope.toLargImage = false;
					if(file.size >  1000000 * scope.imageMax){
				
						scope.toLargImage = true;
						scope.$apply(); 
						return;
					}
					var reader = new FileReader();
				    $rootScope.$broadcast('showLoader', { showLoader: true });
					reader.onload = (function () {

						return function (e) {

							
							scope.imgFileText = file.name;
							scope.postImg = e.target.result;
							scope.imgObj = file;
							scope.$apply();
                            $rootScope.$broadcast('showLoader', { showLoader: false });
						};
					})(file);

					reader.readAsDataURL(file);
					return;
				}
					  
				else if( (attrs.upload=='txt')&&(file.type.match('text/plain') || (file.name.split('.').pop()=='docx')))  {
					
					scope.toLargTextFile = false;
					if(file.size >  1000000 * scope.textFileMax){
					
						scope.toLargTextFile = true;
						scope.$apply(); 
						return;
					}
					
					
					scope.textFileText = file.name;
					scope.fileObj = file;
					scope.$apply();
					return;
				}			
            })
        }
    }
})

 .directive('sbLoad', ['$parse', function ($parse) {
    return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			var fn = $parse(attrs.sbLoad);
			
			elem.on('load', function (event) {
				scope.$apply(function() {
					fn(scope, { $event: event });
				});
			});
		}
    }
}])

 .directive('ticker', function ($timeout) {
    return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
            var containerwidth = elem[0].offsetWidth;
			var width = elem.children()[0].offsetWidth;
            right = containerwidth;
	        var timer;
            function tick() {
                 if(--right < -(elem.children()[0].offsetWidth)){
                        right = containerwidth;
                 }
                 elem.children().css("margin-right", right + "px");
                 timer=$timeout(tick, 30);
            }
            tick();
            
            elem.on('$destroy', function() {
                $timeout.cancel(timer);
            });     
		}
    }
})
 
 .filter('trustHtml', ['$sce', function ($sce) {
    return function (val) {
        if (val != null) {
            return $sce.trustAsHtml(val.toString());
        }
    };
} ]);
 
 
 //angular language hebrew (for calendar) ->heb-il
 angular.module("ngLocale", [], ["$provide", function($provide) {
	
	var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
	
	$provide.value("$locale", {
		
		"NUMBER_FORMATS":{
			"DECIMAL_SEP":".",
			"GROUP_SEP":",",
			"PATTERNS":[
				{"minInt":1,"minFrac":0,"macFrac":0,"posPre":"","posSuf":"","negPre":"-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":3},
				{"minInt":1,"minFrac":2,"macFrac":0,"posPre":"","posSuf":"Â \u00A4","negPre":"-","negSuf":"Â \u00A4","gSize":3,"lgSize":3,"maxFrac":2
			}],
			"CURRENCY_SYM":"â‚ª"
		},
		
		"pluralCat":function (n) {
			
			if (n == 1) {    return PLURAL_CATEGORY.ONE;  }  
			return PLURAL_CATEGORY.OTHER;
		},
		
		"DATETIME_FORMATS":{
			"MONTH":["ינואר","פבואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],
			"SHORTMONTH":["ינואר","פבואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],
			"DAY":["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"],
			"SHORTDAY":["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"],
			"AMPMS":["בבוקר","בצהרים"],
			"medium":"d ×‘MMM yyyy HH:mm:ss","short":"dd/MM/yy HH:mm",
			"fullDate":"EEEE, d בMMMM y",
			"longDate":"d בMMMM y",
			"mediumDate":"d בMMM yyyy",
			"shortDate":"dd/MM/yy",
			"mediumTime":"HH:mm:ss",
			"shortTime":"HH:mm"},
			"id":"heb-il"
	});
	
}]);



