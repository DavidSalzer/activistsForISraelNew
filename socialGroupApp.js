var domain = 'http://cambium.co.il:3003/';

var socialGroupApp = angular.module('socialGroupApp', ['ui.router', 'mobile-angular-ui', 'angularFileUpload'])

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
            url: "/user-profile",
            views: {
                "main": {
                    templateUrl: "./components/user/userProfile.html",
                    controller: "userProfile"
                }
            }
        })

        .state('talk-back', {
            url: "/talk-back",
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

        .state('single-article', {
            url: "/single-article/:postId",
            //url: "/lesson",
            views: {
                "main": {
                    templateUrl: "./components/article/single-article.html",
                    controller: "single-article"
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

        .state('author-page', {
            url: "/author-page/:authorId",
            views: {
                "main": {
                    templateUrl: "./components/authorPage/authorPage.html",
                    controller: "authorPage"
                }
            }
        })

        .state('article', {
            url: "/article",
            views: {
                "main": {
                    templateUrl: "./components/article/article.html",
                    controller: "article"
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

        .state('facebookPoalim', {
            url: "/facebookPoalim/:channelId",
            //url: "/facebookPoalim",
            views: {
                "main": {
                    templateUrl: "./components/facebook/facebookPoalim.html",
                    controller: "facebookPoalim"
                }
            }
        })

		.state('poll-view', {
		    url: "/pollView/:pollIndex",
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
})

/**** Ajax Service ****/
.factory('classAjax', ['$http', '$q', function ($http, $q) {
    return {
        getdata: function (method, queryString, request) {
            var deferred = $q.defer();

            switch (request.postType) {
                case 'talkback':
                    URL = 'posts.txt';
                    break;
                case 'article':
                    URL = 'articles.txt';
                    break;
                case 'author':
                    URL = 'author.txt';
                    break;
                case 'poll':
                    URL = 'polls.txt';
                    break;
            }

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

/**** directives ****/
.directive('post', ['$rootScope', 'PostService', function ($rootScope, PostService) {
    return {
        restrict: 'E',
        // scope:true,
        //{
        //    posts:'@',
        //    showCommentButton:'='
        //},
        //  transclude: true,
        templateUrl: function (tElement, tAttrs) {
            var talkbackTemplate = 'postTemplate.html';
            var articleTemplate = 'articleTemplate.html';
            var authorsTemplate = 'authorsTemplate.html';
            //var commentTemplate = 'commentTemplate.html';

            var templateURL = '';
            switch (tAttrs.postType) {
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
            }

            return template;
        },
        //replace: 'true',
        link: function (scope, el, attrs) {
            el.on('click', function (e) {
                $rootScope.$broadcast('postClicked', { postId: scope.post.postId, postType: scope.post.postType, authorId: scope.post.authorId }); //add post type to emit
            });
            //console.log(attrs.showCommentButton);
            //scope.showCommentButton = attrs.showCommentButton;
            //console.log(scope.showCommentButton);
        }
    };
} ])

.directive('comment', ['$rootScope', 'PostService', '$state', function ($rootScope, PostService, $state) {
    return {
        restrict: 'E',
        template: '<div class="post-comment post-buttons" data-ng-click="$event.stopPropagation();">' +
                '<span class="respond-post">' +
                    '<span class="icon"></span><span>הגב</span></span>' +
                '<span class="respond-count" >{{post.comments.length+0}}</span></div>',
        replace: 'true',
        link: function (scope, el, attrs) {
            el.on('click', function () {
                console.log(scope);
                //PostService.updateCommentsCount();
                // $scope.$emit('handleEmit', {showInput: false}); 
                console.log(scope.post._id);
                //$rootScope.$broadcast('addCommentClicked', { showInput: true, postid: scope.post.postId });
                $state.transitionTo('write-post', { postId: scope.post._id, postType: scope.post.postType });
            });
        }

    };
} ])

.directive('like', ['$rootScope', 'PostService', function ($rootScope, PostService) {
    return {
        restrict: 'E',
        template: '<div class="post-likes post-buttons" data-ng-click="$event.stopPropagation();"><span data-ng-class="{' + "'is-liked':post.likes.isLiked==true ,'like-post':true}" + '">' +
                    '<span class="icon"></span><span>אהבתי</span></span>' +
                '<span class="like-count">{{post.likes.length+post.likes.likesCount+0}}</span></div>',
        link: function (scope, el, attrs) {
            el.on('click', function () {


                //PostService.updateCommentsCount();
                // $scope.$emit('handleEmit', {showInput: false}); 
                scope.post.likes.isLiked = !scope.post.likes.isLiked;

                if (scope.post.likes.isLiked == true) {

                    scope.post.likes.likesCount++;
                    $rootScope.$broadcast('addLike', { postid: scope.post._id });

                }
                else {

                    scope.post.likes.likesCount--;
                    scope.$apply();
                    $rootScope.$broadcast('disLike', { postid: scope.post._id });

                }
            });
        },
        replace: true
    };
} ])

.directive('authorHeader', ['$rootScope', 'PostService', function ($rootScope, PostService) {
    return {
        restrict: 'E',
        //template: '<div id="user-header">' +
        //            '<figure class="author-image">'+ 
        //                '<img data-ng-src="{{post.authorImage}}" alt="user-pic">'+
        //            '</figure>'+
        //            '<span class="author-name" data-author="{{post.author}}" data-ng-click="PostService.userClicked();$event.stopPropagation();">{{post.author}}</span>'+
        //            '<span class="author-date">{{post.timeStamp  | date : "dd.MM.yyyy"}}</span>'+
        //           '</div>',
        templateUrl: './authorHeader.html'//,
        //replace: true
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
                        $scope.$apply(function () {
                            $scope.$eval($attrs.onLongPress)
                        });
                    }
                }, 600);
            });

            $elm.bind('touchend', function (evt) {
                // Prevent the onLongPress event from firing
                $timeout.cancel(promise);
                $scope.longPress = false;
                // If there is an on-touch-end function attached to this element, apply it
                if ($attrs.onTouchEnd) {
                    $scope.$apply(function () {
                        $scope.$eval($attrs.onTouchEnd)
                    });
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
                    
 
                    console.log(generalParameters);
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
								console.log(data);
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
                if ((rawElement.scrollTop + rawElement.offsetHeight + 5) >= rawElement.scrollHeight) {
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
                if (count) { console.log(count.length, maxLine) }
                console.log($element.val().length, maxchar)
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


.directive('upload', function () {
    return {
        
        link: function (scope, el, attrs) {
		
            el.bind('change', function (event) {
				
                var file = event.target.files[0];
                console.log(file);  
				console.log(attrs);alert()
				
				
                
				if((attrs.upload=='img') && (file.type.match('image/*'))) {
					
					scope.toLargImage = false;
					if(file.size >  1000000 * scope.imageMax){
				
						scope.toLargImage = true;
						scope.$apply(); 
						return;
					}
					var reader = new FileReader();
				
					reader.onload = (function () {

						return function (e) {

							console.log(e.target.result); //base64 img
							scope.imgFileText = file.name;
							scope.postImg = e.target.result;
							scope.imgObj = file;
							scope.$apply();
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
					
					console.log(file.type);
					scope.textFileText = file.name;
					scope.fileObj = file;
					scope.$apply();
					return;
				}			
            })
        }
    }
})

//repeat end load dom
 .directive('onFinishRender', function ($timeout) {
     return {
         restrict: 'A',
         link: function (scope, element, attr) {
             if (scope.$last === true) {
                 $timeout(function () {
                     scope.$emit(attr.onFinishRender);
                 });
             }
         }
     }
 });

