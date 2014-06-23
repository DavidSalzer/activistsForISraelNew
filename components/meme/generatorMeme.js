socialGroupApp.factory('memeGenerat', ['$scope',function ($scope) {
 var self = this; // need to add obj and return it.

	return {
		setMeme: function(upText,downText,imgUrl,fonts){
			
			$scope.upText = upText;
			$scope.downText = downText;
			$scope.fonts = fonts;
			
			//create the canvas elem
			var canv = document.createElement('canvas');
				canv.id = 'myCanvas';
				canv.style.width='400px';
				canv.style.height='600px';
				document.body.appendChild(canv); // adds the canva
			var img = document.createElement('img');
				img.src=imgUrl;
				img.id='canvasImg';
				img.style.visibility='hidden';
				img.setAttribute('crossorigin',"anonymous");
				document.body.appendChild(img); // adds the canva
				img.addEventListener('load',this.insertImg,false);
			var c = document.getElementById("myCanvas");
			var ctx = c.getContext("2d");
				

		},

		insertImg:function(){
			var c = document.getElementById("myCanvas");
			var ctx = c.getContext("2d");

			img = document.getElementById("canvasImg");
			ctx.drawImage(img,0,0,c.width,c.height);
			
			if(fonts){
				ctx.font = fonts;
				ctx.fillStyle= '#fff';
			}else{
				ctx.font = "30px Arial";
				ctx.fillStyle= '#fff';
			}
			
			ctx.fillText(upText,10,20);
			ctx.fillText(downText,10,140);
			
			var dataURL = c.toDataURL("image/png");
   			//or insert to IMG paceholder...
   			document.write('<img src="'+dataURL+'"/>');
			 
		}



	};
}])