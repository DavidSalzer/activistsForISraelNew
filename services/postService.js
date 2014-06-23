socialGroupApp.factory('PostService', ['$rootScope', 'classAjax', '$http','$upload', function ($rootScope, classAjax, $http,$upload) {

    var showInput = true;

    var posts = [];
    var polls = [];
    var memes = [];
    var selectedAuthor = null;
    var typePrevPage = null;

    return {
        //methodes

        getPostsBatch: function (request) {
            //dataTransform = { type: type, filter: filter, num: num, token: token };
            console.log(request);
            //$http.get(domain + 'post?offset=0&limit='+num+'&timestamp=1403911934561')
            //.success(function (data) {
            //    console.log(data);
            //    if (dataTransform.token == 0) {
            //        posts = data.data;
            //    }
            //    else {
            //        console.log(data);
            //        for (var i = 0; i < data.data.length; i++) {
            //            posts.push(data.data[i]);
            //        }
            //    }
            //});
            queryString = 'post?startTimestamp=' + request.startTimestamp + '&endTimestamp=' + request.endTimestamp + '&offset=' + request.offset + '&limit=' + request.limit + '&orderBy=' + request.orderBy;
            console.log(queryString);
            classAjax.getdata('get', queryString, request).then(function (data) {
                console.log(data);
                if (request.endTimestamp == '') {
                    posts = data.data;
                }
                else {
                    console.log(data);
                    for (var i = 0; i < data.data.length; i++) {
                        posts.push(data.data[i]);
                    }
                }
            })
        },

        getPollsBatch: function (type, filter, num, token) {
            dataTransform = { type: type, filter: filter, num: num, token: token };
            console.log(dataTransform);
            classAjax.getdata(dataTransform).then(function (data) {
                console.log(data);
                if (dataTransform.token == 0) {
                    polls = [];
                }
                for (var i = 0; i < data.polls.length; i++) {
                    if (data.polls[i].status == filter) {
                        polls.push(data.polls[i]);
                    }
                }
                console.log(polls);
            })
        },


         getMemesBatch: function (request) {
            //dataTransform = { type: type, filter: filter, num: num, token: token };
            console.log(request);
            //$http.get(domain + 'post?offset=0&limit='+num+'&timestamp=1403911934561')
            //.success(function (data) {
            //    console.log(data);
            //    if (dataTransform.token == 0) {
            //        posts = data.data;
            //    }
            //    else {
            //        console.log(data);
            //        for (var i = 0; i < data.data.length; i++) {
            //            posts.push(data.data[i]);
            //        }
            //    }
            //});
            queryString = 'meme?startTimestamp=' + request.startTimestamp + '&endTimestamp=' + request.endTimestamp + '&offset=' + request.offset + '&limit=' + request.limit + '&orderBy=' + request.orderBy;
            console.log(queryString);
            classAjax.getdata('get', queryString, request).then(function (data) {
                console.log(data);
                if (request.endTimestamp == '') {
                    posts = data.data;
                }
                else {
                    console.log(data);
                    for (var i = 0; i < data.data.length; i++) {
                        posts.push(data.data[i]);
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
        sendPost: function (postData, file) {

            var self = this;

            console.log(domain);
            console.log(postData);
            var json = JSON.stringify(postData);
            console.log(json);

            $http.post(domain + 'post', json)
			.success(function (data) {

			    console.log(data);
				self.attach(file,data.data._id); 
			})
			.error(function (data) {

			    console.log(data);
			});



        },

        attach: function (file,postId) {

             var $file = file;
				  console.log($file);
			    var upload = $upload.upload({
			        
					url: domain+'FileUpload?ref=post&_id='+postId,
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

        sendLike: function (pid, uid) {

            console.log(domain);
            console.log(pid);
            console.log(uid);
            var like = { like: { post: pid, user: uid} };
            var json = JSON.stringify(like);
            console.log(json);

            $http.post(domain + 'like', json)
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

        getPolls: function () {
            return polls;
        },

        getMemes: function () {
            return memes;
        },

        getPostById: function (postid) {
            console.log(posts.length)
            for (var i = 0; i < posts.length; i++) {
                if (posts[i].postId == postid) {
                    return posts[i];
                    stop();
                }
            };
        },

        setFilterByAuthor: function (author, type) {
            typePrevPage = type;
            selectedAuthor = author;
        },

        getFilterByAuthor: function () {
            return { type: typePrevPage, author: selectedAuthor };
        }


    }
} ]);