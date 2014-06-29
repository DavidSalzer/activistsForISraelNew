
var x;
socialGroupApp.factory('memeGenerat', ['$rootScope', function ($rootScope) {
    var self = this; // need to add obj and return it.

    return {
        setMeme: function (upText, downText, imgUrl, fonts) {

            //create the canvas elem
            var canv = document.createElement('canvas');
            canv.id = 'myCanvas';
           // canv.style.width = "300px";
           // canv.style.height = "300px";
            document.body.appendChild(canv); // adds the canva
            var img = document.createElement('img');
            img.src = imgUrl;
            img.id = 'canvasImg';
            img.style.visibility = 'hidden';
          //   img.style.width = "300px"
            // img.style.height = "300px"
            img.setAttribute('crossorigin', "anonymous");
            document.body.appendChild(img); // adds the canva
            img.addEventListener('load', this.insertImg, false);
            // var c = document.getElementById("myCanvas");
            // var ctx = c.getContext("2d");


        },

        insertImg: function () {
            upText = 'shalom';
            downText = "lehitraot"
            //fonts = "30px Arial"
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");

            img = document.getElementById("canvasImg");
            ctx.drawImage(img, 0, 0,320,320)
            //if (fonts) {
            //    ctx.font = fonts;
            //    ctx.fillStyle = 'red';
            //} else {
           //     ctx.font = "30px Arial";
           //     ctx.fillStyle = 'red';
            //}
           // ctx.fillText(upText, 20, 20);
           // ctx.fillText(downText, 80, 80);

            var dataURL = c.toDataURL("image/png");
            x = dataURL;
            //return dataURL;
            // document.getElementById('testUrl').src = dataURL;
            //   document.getElementById('testUrl').innerHTML = dataURL;
            //or insert to IMG paceholder...
            // document.write('<img src="'+dataURL+'"/>');

        }



    };
} ])