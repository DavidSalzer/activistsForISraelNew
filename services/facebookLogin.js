
		/* 
			יש להזין URL נכון עבור אפליקציית פייסבוק ולשנות את ה APPID
		
		*/
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '667743159971585',
          xfbml      : true,
          version    : 'v2.0'
        });


         //login facebook status
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                console.log('Logged in.');
                console.log(response.authResponse.userID);
                getUserInfo(response.authResponse.userID);

                 FB.api('/me', function (response) {
                    console.log(response);        
                    console.log('Good to see you, ' + response.name + '.');

                    user={
                      name:response.first_name,
                      lastName:response.last_name,
                      img:'https://graph.facebook.com/'+response.id+'/picture'
                    }
                    //brodcast and save to local storeg
                    
                    localStorage.setItem('user',JSON.stringify(user));
                });


             }
            else {
               console.log('Not Logged in.');
               // FB.login();
            }
        });

      };
	  
	  
	//load facebook api
    /*  (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);

       }(document, 'script', 'facebook-jssdk'));
        
*/
        function getUserInfo(uid){
            FB.api(uid,function(info){
                console.log(info);
            });
        }