socialGroupApp.factory( 'youtube' ,[ '$rootScope','$timeout',function ($rootScope,$timeout) {

var OAUTH2_CLIENT_ID = '634600880816-mc68qbu77b9i4h65l0h7qtdjon9oqrud.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube'
];

var nextPageToken='';  
var obj={};

obj.loadApi = function(){
//load the api client and player api
  
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

     
}

// Upon loading, the Google APIs JS client automatically invokes this callback.
obj.googleApiClientReady = function() {
  obj.loadApi();
  $timeout(function(){
     gapi.auth.init(function() {
       window.setTimeout(obj.checkAuth, 1);
      });
  },5000);
}

// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
obj.checkAuth = function () {
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, obj.handleAuthResult);
}

// Handle the result of a gapi.auth.authorize() call.
obj.handleAuthResult = function(authResult) {
  if (authResult) {
    // Authorization was successful. Hide authorization prompts and show
    // content that should be visible after authorization succeeds.
    console.log('Authorization was successful');
		    obj.loadAPIClientInterfaces();
  } else {
    // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
    // client flow. The current function is called when that flow completes
    console.log('Authorization was UNsuccessful');
    gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: false
        }, obj.handleAuthResult);
	$rootScope.$broadcast('needEntery', {status:'null'})
  }
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client

obj.loadAPIClientInterfaces = function() {
  gapi.client.load('youtube', 'v3', function() {
    obj.handleAPILoaded();
  });
}

// After the API loads, call a function to enable the search box.
obj.handleAPILoaded = function() {
  //
  $rootScope.$broadcast('youtubeReady', {status:'ok'});
}


  return obj;//end return


}])