socialGroupApp.factory('filePicker', ['$rootScope', '$q', function ($rootScope, $q) {

    return {
        getPicture: function (options) {

            // init $q
            var deferred = $q.defer();

            if (isBrowser) {

                // create file input without appending to DOM
                var fileInput = document.createElement('input');
                fileInput.setAttribute('type', 'file');

                fileInput.onchange = function () {
                    var file = fileInput.files[0];
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    if (file.size > 4000000) {
                        alert('בחרת תמונה גדולה מידי. עליך לבחור תמונה עד 4MB');
                    }
                    else {
                        reader.onloadend = function () {
                            $rootScope.$apply(function () {
                                console.log(file.name);
                                // strip beginning from string
                                var encodedData = {};
                                encodedData.imgData = reader.result; //.replace(/data:image\/jpeg;base64,/, '');
                                encodedData.fileText = file.name;
                                encodedData.fileType = file.type;
                                deferred.resolve(encodedData);
                            });
                        };
                    }
                };

                fileInput.click();

            } else {//if phonegap app

                // set some default options
                var defaultOptions = {
                    quality: 100,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    destinationType: Camera.DestinationType.FILE_URI,
                    mediaType: Camera.MediaType.PICTURE,
                    correctOrientation: false,
                    encodingType: Camera.EncodingType.JPEG
                };

                // allow overriding the default options
                options = angular.extend(defaultOptions, options);
                var failFile = function (e) { alert("error failFile"); };
                var failSystem = function (e) { alert("error failSystem"); };
                var gotFileEntry = function (fileEntry) {
                    console.log("got image file entry: " + fileEntry.fullPath);
                    var encodedData = {};

                    encodedData.imgData = fileEntry.toURL();
                    encodedData.fileText = fileEntry.name;

                    //get file type from name string and return MIME type
                    var regExp = /(?:\.([^.]+))?$/;
                    var type = regExp.exec(fileEntry.name)[1];
                    switch (type) {
                        case 'png':
                            encodedData.fileType = "image/png";
                            break;
                        case 'jpg':
                            encodedData.fileType = "image/jpg";
                            break;
                        case 'jpeg':
                            encodedData.fileType = "image/jpeg";
                            break;
                        case 'bmp':
                            encodedData.fileType = "image/bmp";
                            break;
                        case 'gif':
                            encodedData.fileType = "image/gif";
                            break;
                        default:
                            encodedData.fileType = "image/png";
                    }


                    fileEntry.file(function (fileEntry) {
                        console.log("Size = " + fileEntry.size);
                        if (fileEntry.size > 4000000) {
                            alert('בחרת תמונה גדולה מידי. עליך לבחור תמונה עד 4MB');
                        }
                        else {
                            deferred.resolve(encodedData);
                        }
                    });

                };


                // success callback
                var success = function (imageURI) {
                    $rootScope.$apply(function () {
                        console.log(imageURI);
                        var photo_split = imageURI.split("%3A");
                        if (imageURI.substring(0, 21) == "content://com.android") {
                            var photo_split = imageURI.split("%3A");
                            imageURI = "content://media/external/images/media/" + photo_split[1];
                        }
                        else {
                            //uri = uri;
                        }
                        window.resolveLocalFileSystemURI(imageURI, gotFileEntry, failSystem);

                    });
                };

                // fail callback
                var fail = function (message) {
                    $rootScope.$apply(function () {
                        deferred.reject(message);
                    });
                };

                // open camera via cordova
                navigator.camera.getPicture(success, fail, options);

            }

            // return a promise
            return deferred.promise;

        }
    };

} ]);