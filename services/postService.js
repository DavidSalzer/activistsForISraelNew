socialGroupApp.factory('PostService', ['$rootScope', 'classAjax', '$http', '$upload', '$q', function ($rootScope, classAjax, $http, $upload, $q) {

    var showInput = true;

    var posts = [];
    var singlePost = null;
    var comments = [];
    var memeImages = [];
    var selectedAuthor = null;
    var typePrevPage = null;
    var user = null;
    var showSpiner = false;
    var previeMemeBase64 = "";
    var mainFeatures = [];


    return {
        //methodes

        //get posts by parameters from server and set in posts array.
        getPostsBatch: function (request) {
            self = this;
            console.log(request);
            if(request.orderBy != '-timestamp'){
                request.endTimestamp = '';
            }

            queryString = 'post?startTimestamp=' + request.startTimestamp + '&endTimestamp=' + request.endTimestamp + '&offset=' + request.offset + '&limit=' + request.limit + '&orderBy=' + request.orderBy + '&postType=' + request.postType + '&_parentID=' + request._parentID;
            if (request.pollStatus != undefined) {
                queryString = queryString + '&pollStatus=' + request.pollStatus;
            }
            if (request.DestinationTime != undefined) {
                queryString = queryString + '&startDestinationTime=' + request.DestinationTime;
            }
            console.log(queryString);
            showSpiner = true;
            if (request.offset == 0) {
                posts = [];
            }
            classAjax.getdata('get', queryString, request).then(function (data) {
                console.log(data);
                if (request.offset == 0) {
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

                 if (request.postType == 'event') {
                    for (var j = 0; j < posts.length; j++) {
                        posts[j].hebrewDate = self.hebrewDate(posts[j].DestinationTime);
                    }
                }


                for (var k = 0; k < posts.length; k++) {

                    self.getIsLike(posts[k]._id, k);
                }

               
                console.log(posts);
                //}
            })
        },



        //updateCommentsCount: function () {
        //    posts[0].comments.commentsCount = 6;
        //},

        /*  updatePost: function (data) {
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
        }, */

        updatePost: function (postData, textfile, imgFile, isBase64) {

            var self = this;
            var deferred = $q.defer();
            //alert(postData.post.DestinationTime)
            var post = { 'post': postData.post };
            console.log(post);
            var json = JSON.stringify(post);
            console.log(json);

            $http.put(domain + 'post/' + postData.post._id, json)
			.success(function (data) {

			    console.log(data);
			    if (textfile || imgFile) {
			        if (textfile)
			            self.attach(textfile, data.data._id);
			        if (imgFile)
			            self.attach(imgFile, data.data._id).then(function (data) { deferred.resolve(data) });
			    }
			    else {
			        deferred.resolve(data);
			    }
			})
			.error(function (data) {

			    deferred.resolve(data);
			});


            return deferred.promise;
        },

        //send post to server.
        sendPost: function (postData, textfile, imgFile, isBase64, callbackFunc) {

            var self = this;
            var deferred = $q.defer();

            console.log(domain);
            console.log(postData);
            var json = JSON.stringify(postData);
            console.log(json);
            if (postData.post.postType == 'suggestPoll' || postData.post.postType == 'contact') {
                queryString = 'sendmail';
            }
            else {
                queryString = 'post';
            }
            $http.post(domain + queryString, json)
			.success(function (data) {
			    $rootScope.$broadcast('showLoader', { showLoader: false });
			    console.log(data);
			    console.log(data.data._id);
			    if (data.data._id == undefined) { deferred.resolve(data); return deferred.promise; } //fail to create post!
			    if (isBase64) {
			        //imgFile is base64 string
			        self.attachBase64(imgFile, data.data._id, callbackFunc).then(function (data) { deferred.resolve(data) });
			    }
			    else if (textfile || imgFile) {
			        if (textfile)
			            self.attach(textfile, data.data._id);
			        if (imgFile)
			            self.attach(imgFile, data.data._id).then(function (data) { deferred.resolve(data) });
			    }
			    else {
			        deferred.resolve(data);
			    }
			})
			.error(function (data) {
			    $rootScope.$broadcast('showLoader', { showLoader: false });
			    deferred.resolve(data);
			});


            return deferred.promise;
        },

        //sendContact: function () {

        //},

        attach: function (file, postId) {

            $rootScope.$broadcast('showLoader', { showLoader: true });
            var deferred = $q.defer();
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
                $rootScope.$broadcast('showLoader', { showLoader: false });
                deferred.resolve(data);

            }).error(function (data, status, headers, config) {
                // file failed to upload
                $rootScope.$broadcast('showLoader', { showLoader: false });
                console.log(data);
                deferred.resolve(data);

            });
            //if(file){self.attach(file);}
            return deferred.promise;
        },
        attachBase64: function (base64, userId, callbackFunc) {

            var deferred = $q.defer();

            postData = {

                base64: base64
            }
            var json = JSON.stringify(postData);
            console.log(json);
            $rootScope.$broadcast('showLoader', { showLoader: true });

            $http.post(domain + 'Base64FileUpload?ref=post&_id=' + userId, json)
			.success(function (data) {

			    console.log(data);
			    //hide the loader
			    $rootScope.$broadcast('showLoader', { showLoader: false });
			    //show the thank page only after the post created
			    callbackFunc();
			    deferred.resolve(data);
			})
			.error(function (data) {

			    console.log(data);
			    $rootScope.$broadcast('showLoader', { showLoader: false });
			    deferred.resolve(data);
			});

            return deferred.promise;
        },

        //check if post, posts or user isLiked by the connected user and add field isLiked to object.
        getIsLike: function (pid, index) {

            var parmas = { "activity": { "post": pid, "user": user._id, "type": "like"} };

            var json = JSON.stringify(parmas);
            //console.log(json);

            $http.post(domain + 'isActivityFound', json)
			.success(function (data) {

			    if (index == undefined) {
			        if (data.data == null) {

			            singlePost.isLiked = false; return;
			        }
			        else if (data.data.type == 'like') {

			            singlePost.isLiked = true; return;
			        }
			    }

			    if (data.data == null) {

			        posts[index].isLiked = false; return;
			    }
			    else if (data.data.type == 'like') {

			        posts[index].isLiked = true; return;
			    }

			})
			.error(function (data) {

			    console.log(data);

			});


        },

        hebrewDate: function (DestinationTime) {
            Detime = new Date(DestinationTime);
            var hedt = new HeDate(Detime).toString();
            return hedt;
        },

        unLike: function (pid, post) {

            console.log(user)

            var parmas = { "activity": { "post": pid, "type": "like"} };

            var json = JSON.stringify(parmas);
            console.log(json);

            $http({ url: domain + 'deletePostActivity', method: "delete", headers: { 'Content-Type': 'application/json' }, data: json })

			.success(function (data) {
			    if (data.status.statusCode == 0) {
			        post.likesCount--;
			        post.isLiked = false;
			        console.log('success unLike');
			    }
			    console.log(data);
			})
			.error(function (data) {

			    console.log(data);
			});


        },

        sendLike: function (pid, post) {

            var parmas = { "activity": { "post": pid, "type": "like"} };

            var json = JSON.stringify(parmas);
            console.log(json);

            $http.post(domain + 'addPostActivity', json)
			.success(function (data) {
			    if (data.status.statusCode == 0) {
			        post.isLiked = true;
			        post.likesCount++;
			        console.log('success like');
			    }
			    console.log(data);
			})
			.error(function (data) {

			    console.log(data);
			});


        },

        getMemesImages: function (request) {
            queryString = "meme/template";


            console.log("meme/template");

            //meme/template

            classAjax.getdata('get', queryString, request).then(function (data) {
                console.log(data.data);
                if (request.endTimestamp == '') {
                    memeImages = data.data; console.log(memeImages);
                }
                else {
                    console.log(data.data);
                    for (var i = 0; i < data.data.length; i++) {
                        memeImages.push(data[i]);
                    }
                }
            })
        },


        //getters & setters
        setShowInput: function (state) {
            console.log(showInput);
            showInput = state;
            console.log(showInput);
        },

        setUser: function (userDetails) {
            if (userDetails.address == undefined || userDetails.address == '') {
                userDetails.address = 'כתובת';
            }
            if (userDetails.phone == undefined || userDetails.phone == '') {
                userDetails.phone = 'מספר טלפון';
            }
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

        getPolls: function () {
            return polls;
        },

        getMemes: function () {
            return memeImages;
        },

        //get post from server by id of the post.
        getPostById: function (postid) {
            self = this;
            singlePost = null;
            queryString = 'post/' + postid;
            console.log(queryString);
            classAjax.getdata('get', queryString, {})
            .then(function (data) {
                console.log(data);
                //if (data.status.statusCode == 8) { window.history.back(); }//go back if the post not exist.
                self.getIsLike(postid);
                singlePost = data.data;
                posts = [];
                self.getPostsBatch({ startTimestamp: '', endTimestamp: '', offset: 0, limit: 20, _parentID: postid, postType: 'talkback', orderBy: '-timestamp' });
            })

        },

        getSinglePost: function () {
            return singlePost;
        },

        setFilterByAuthor: function (author, type) {
            typePrevPage = type;
            selectedAuthor = author;
        },

        //get authors that create posts in the posttype requested.
        getAuthorsByPostType: function (request) {
            queryString = 'authors?startTimestamp=' + request.startTimestamp + '&endTimestamp=' + request.endTimestamp + '&offset=' + request.offset + '&limit=' + request.limit + '&orderBy=' + request.orderBy + '&postType=' + request.postType;
            console.log(queryString);

            classAjax.getdata('get', queryString, request).then(function (data) {
                console.log(data);

                if (request.offset == 0) {
                    posts = [];
                }

                showSpiner = false;
                for (var i = 0; i < data.data.length; i++) {
                    //posts.push(data.data[i]);
                    flag = true;
                    for (var j = 0; j < posts.length & flag; j++) {
                        if (data.data[i][0]._id == posts[j]._id) {
                            flag = false;
                        }
                    }
                    if (flag) {
                        posts.push(data.data[i][0]);
                    }

                }
                console.log(posts);
            })
        },

        //get posts of author from server by author id and postType.
        getPostsByAuthor: function (request) {
            var self = this;
            queryString = 'post/author/' + request.authorId + '?startTimestamp=' + request.startTimestamp + '&endTimestamp=' + request.endTimestamp + '&offset=' + request.offset + '&limit=' + request.limit + '&orderBy=' + request.orderBy + '&postType=' + request.postType;
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
                    if (flag) {
                        posts.push(data.data[i]);
                    }
                }

                for (var k = 0; k < posts.length; k++) {

                    self.getIsLike(posts[k]._id, k);
                }
                //}
            })
        },

        loadMainFeatures: function () {
            queryString = 'mainfeatures';
            console.log(queryString);

            classAjax.getdata('get', queryString).then(function (data) {
                console.log(data);
                if (data.status.statusCode == 0) {
                    mainFeatures = data.data;
                    for (var i in mainFeatures) {
                        mainFeatures[i].featureName = featureDictionary[mainFeatures[i].featureType].featureName;
                        mainFeatures[i].featureLogo = featureDictionary[mainFeatures[i].featureType].featureLogo;
                    }
                    console.log(mainFeatures);
                }
            })
        },

        getSpiner: function () {
            return showSpiner;
        },

        getPreviewMeme: function () {
            return previeMemeBase64;
        },
        setPreviewMeme: function (base64) {
            previeMemeBase64 = base64;
        },

        cleanPosts: function () {
            posts = [];
        },

        getMainFeatures: function () {
            return mainFeatures;
        }

    }
} ]);