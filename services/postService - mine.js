
socialGroupApp.factory('PostService', ['$rootScope', 'classAjax', '$http','$upload','$q', function ($rootScope, classAjax, $http,$upload,$q) {

    var showInput = true;

    var posts = [];

    var polls = [];
    var memeImages = [];

    var singlePost = null;
    var comments = [];
    var memes = [];
    var selectedAuthor = null;
    var typePrevPage = null;
    var user = null;
    var showSpiner = false;



    return {
        //methodes

        getPostsBatch: function (request) {
			self = this;
            console.log(request);

            queryString = 'post?startTimestamp=' + request.startTimestamp + '&endTimestamp=' + request.endTimestamp + '&offset=' + request.offset + '&limit=' + request.limit + '&orderBy=' + request.orderBy + '&postType=' + request.postType + '&_parentID=' + request._parentID;
            console.log(queryString);
            showSpiner = true;
            classAjax.getdata('get', queryString, request).then(function (data) {
                console.log(data);
                if (request.endTimestamp == '') {
                    posts = [];
                }
                //else {
                console.log(data);
                showSpiner = false;
                for (var i = 0; i < data.data.length; i++) {
                    //posts.push(data.data[i]);
					
                    flag = true;
                    for (var j = 0; j < posts.length & flag; j++) {
						
                        if (data.data[i]._id == posts[j]._id) {					
							
							flag = false;
                        }
                    }
                    if (flag){
						
						posts.push(data.data[i]); 
					
                    } 
                }
				
				for (var k = 0; k < posts.length; k++) {
					
					self.getIsLike(posts[k]._id,k);
				}
				
				console.log(posts);
                //}
            })
        },

        getMemesImages: function (request) {
            queryString = "";


             console.log(queryString);
            classAjax.getdata('get', queryString, request).then(function (data) {
                console.log(data.data);
                if (request.endTimestamp == '') {
                    memeImages = data.data;
                }
                else {
                    console.log(data.data);
                    for (var i = 0; i < data.data.length; i++) {
                        memeImages.push(data[i]);
                    }
                }
            })
        },

        commentClicked: function () {
            console.log('comment');
            //event.stopPropagation();
            $rootScope.$broadcast('addCommentClicked', { showInput: true });
        },

        updateCommentsCount: function () {
            posts[0].comments.commentsCount = 6;
        },

        updatePost: function (data) {
            var postId = data.postId

            console.log(postId);
            for (var post in posts) {
                console.log('from for: ' + postId);
                if (posts[post].postId == postId) {
                    console.log('from for: ' + postId);
                    posts[post] = data;
                    console.log('posts[post]: ' + posts[post]);
                    return;
                }
            }
            posts.unshift(data);
        },

        //Send post to server. if it isn't comment on post , postId = 0.
        sendPost: function (postData, textfile, imgFile) {

            var self = this;

            console.log(domain);
            console.log(postData);
            var json = JSON.stringify(postData);
            console.log(json);

            $http.post(domain + 'post', json)
			.success(function (data) {

			    console.log(data);
			    console.log(data.data._id);

			    if (textfile)
			        self.attach(textfile, data.data._id);
			    if (imgFile)
			        self.attach(imgFile, data.data._id);
			})
			.error(function (data) {

			    console.log(data);
			});



        },

        attach: function (file, postId) {


            var $file = file;
            console.log($file);
            var upload = $upload.upload({



            var $file = file;
            console.log($file);
            var upload = $upload.upload({
                url: domain + 'FileUpload?ref=post&_id=' + postId,
                method: "POST",
                file: $file
            }).progress(function (evt) {
                // get upload percentage
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {
                // file is uploaded successfully
                console.log(data);
            }).error(function (data, status, headers, config) {
                // file failed to upload
                console.log(data);
            });
            //if(file){self.attach(file);}

        },
		
		getIsLike: function (pid,index) {
			
			
			console.log(user)
			var parmas = {"activity":{
							"post":pid,
							"user":user._id,
							"type":"like"
							}
						};
            
			var json = JSON.stringify(parmas);
            //console.log(json);

            $http.post(domain + 'isActivityFound', json)
			.success(function (data) {
				
				 if(data.data == null){
					
					posts[index].isLiked = false;return;
				}
				else if(data.data.type=='like'){
				
					posts[index].isLiked = true;return; 
				}	
				
			})
			.error(function (data) {

			    console.log(data);
				
			});
			
			
        },

        sendLike: function (pid) {

            console.log(user)

            var parmas = { "activity": {
                "post": pid,
                "user": user._id,
                "type": "like"
            }
            };

            var json = JSON.stringify(parmas);
            console.log(json);

            $http.post(domain + 'addPostActivity', json)
			.success(function (data) {

			    console.log(data);
			})
			.error(function (data) {

			    console.log(data);
			});


        },

        //getters & setters
        setShowInput: function (state) {
            console.log(showInput);
            showInput = state;
            console.log(showInput);
        },

        setUser: function (userDetails) {

            user = userDetails;
        },

        getShowInput: function () {
            console.log('get: ' + showInput);
            return showInput;
        },

        setPosts: function (state) {
            console.log('set: ' + posts);
            //showInput = state;
        },

        getPosts: function () {
            return posts;
        },

         getMemes: function () {
            return memeImages;
        },

        getPolls: function () {
            return polls;
        },


        getPostById: function (postid) {
            self = this;
            queryString = 'post/' + postid;
            console.log(queryString);
            classAjax.getdata('get', queryString, request)
            .then(function (data) {
                console.log(data);
                singlePost = data.data;
                self.getPostsBatch({ offset: 0, limit: 20, _parentID: postid });
            })
            //console.log(posts.length)
            //for (var i = 0; i < posts.length; i++) {
            //    if (posts[i].postId == postid) {
            //        return posts[i];
            //        stop();
            //    }
            //};
        },

        getSinglePost: function () {
            return singlePost;
        },

        setFilterByAuthor: function (author, type) {
            typePrevPage = type;
            selectedAuthor = author;
        },

        getPostsByAuthor: function (request) {
            queryString = 'post/author/' + request.authorId + '?startTimestamp=' + request.startTimestamp + '&endTimestamp=' + request.endTimestamp + '&offset=' + request.offset + '&limit=' + request.limit + '&orderBy=' + request.orderBy + '&postType=' + request.postType;
            console.log(queryString);

            classAjax.getdata('get', queryString, request).then(function (data) {
                console.log(data);
                if (request.endTimestamp == '') {
                    posts = [];
                }
                //else {
                console.log(data);
                showSpiner = false;
                for (var i = 0; i < data.data.length; i++) {
                    //posts.push(data.data[i]);
                    flag = true;
                    for (var j = 0; j < posts.length & flag; j++) {
                        if (data.data[i]._id == posts[j]._id) {
                            flag = false;
                        }
                    }
                    if (flag) {
                        posts.push(data.data[i]);
                    }
                }
                //}
            })
        },

        getSpiner: function () {
            return showSpiner;
        }


    }
} ]);