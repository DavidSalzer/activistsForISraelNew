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
                    if (((file.length - 814) / 1.37) > 3000000) {
                            alert('בחרת תמונה גדולה מידי. עליך לבחור תמונה עד 4MB');
                        }
                    reader.onloadend = function () {
                        $rootScope.$apply(function () {
                            console.log(file.name);
                            // strip beginning from string
                            var encodedData = {};
                            encodedData.imgData = reader.result; //.replace(/data:image\/jpeg;base64,/, '');
                            encodedData.fileText = file.name;
                            deferred.resolve(encodedData);
                        });
                    };
                };

                fileInput.click();

            } else {//if phonegap app

                // set some default options
                var defaultOptions = {
                    quality : 40,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    destinationType: Camera.DestinationType.DATA_URL,
                    mediaType: Camera.MediaType.PICTURE,
                    correctOrientation: false,
                    encodingType: Camera.EncodingType.JPEG
                };

                // allow overriding the default options
                options = angular.extend(defaultOptions, options);

                // success callback
                var success = function (imageData) {
                    $rootScope.$apply(function () {
                        console.log(imageData);
                        
                        var encodedData = {};
                        encodedData.imgData = "data:image/jpeg;base64," + imageData;
                        console.log(((encodedData.imgData.length - 814) / 1.37));
                        if (((encodedData.imgData.length - 814) / 1.37) > 4000000) {
                            alert('בחרת תמונה גדולה מידי. עליך לבחור תמונה עד 4MB');
                        }
                        encodedData.fileText = 'file successfully added';
                        deferred.resolve(encodedData);
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