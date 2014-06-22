socialGroupApp.factory('imgCrop', ['$rootScope', function ($rootScope) {

    var cropData = {};
    var crop_data = {};
    var obj = {};
    var $img;
    var jcrop;

    obj.crop = function (canvasId, btnId, conId) {//canvasid  ,btn-approve, container Id
        cropData = {};
        $img = {};
        var request_height = 316;
        var request_width = 500;
        var request_ratio = request_width / request_height;

        var $div = $('#' + conId + '');
        $img = $('#' + conId + ' img');
        var div_width = $div.width();
        var div_height = $div.height();
        var div_ratio = request_width / request_height;
        $img.css('width', 'auto').css('height', 'auto')
        $div.css('padding-left', '0').css('padding-top', '0');

        var pic_real_width = $img.width(), pic_real_height = $img.height();
        var ratio = pic_real_width / pic_real_height;
        var zoom = Math.min(div_height / pic_real_height, div_width / pic_real_width);
        //shrink the visibility of the img.
        $img.height(pic_real_height * zoom);
        $img.width(pic_real_width * zoom);

        // box is the selected area in the img, we will calculate the max size of the box by the request ratio.
        var boxHeight = Math.min(pic_real_height * zoom, pic_real_width * zoom / request_ratio);
        var boxWidth = boxHeight * request_ratio;
        var maxbox = [(pic_real_width * zoom - boxWidth) / 2, (pic_real_height * zoom - boxHeight) / 2, boxWidth, boxHeight];
        zoom = 1;
        crop_data = {};
        $img.Jcrop(
        {
            aspectRatio: 1,
            maxSize: [250, 250],
            minSize: [50, 50],
            setSelect: maxbox, //[ 0, 0, 5, 5 ],
            onSelect: function (c) {
                c.x /= zoom;
                c.y /= zoom;
                c.x2 /= zoom;
                c.y2 /= zoom;
                c.h /= zoom;
                c.w /= zoom;
                crop_data = JSON.stringify(c);
            }
        },
		function () {
		    jcrop = this;
		});

        $('#' + btnId + '').click(function () {
            console.log('request_height: ' + request_height);
            console.log('request_width: ' + request_width);
            console.log('crop_data: ' + crop_data);

            crop_data = JSON.parse(crop_data);
            data = {
                src: $img.attr('src'), //src
                clipX: crop_data.x, //pos x start cliping
                clipY: crop_data.y, //pos y start cliping
                rqH: request_height, //request h
                rqW: request_width, // request w
                posX: 0, //pos x on canvas 0 is defult
                posY: 0, //pos y on canvas 0 is defult
                cropW: crop_data.w, //crop w
                cropH: crop_data.h
            }
            cropData = data;
            obj.cropCanvas(canvasId, data);
        });
    },

	obj.cropCanvas = function (canvasId, data) {


	    // Grab the Canvas and Drawing Context
	    var canvas = document.getElementById(canvasId);


	    var ctx = canvas.getContext('2d');
	    //delet all
	    ctx.fillStyle = "#ffffff";
	    ctx.fillRect(0, 0, canvas.width, canvas.height);
	    // Create an image element

	    var img = document.createElement('IMG');
	    // Specify the src to load the image
	    img.src = data.src;

	    var orW = img.width;
	    var orH = img.height;
	    var nwW = $img.width();
	    var nwH = $img.height();

	    console.log(nwW + '  ' + orW);

	    var deltaX = orW / nwW;
	    var deltaY = orH / nwH;

	    console.log(data);
	    // When the image is loaded, draw it
	    img.onload = function () {

	        //$img.css({'width':'300px','height':'150px'});

	        canvas.style.width = data.cropW + 'px';
	        canvas.style.height = data.cropH + 'px';

	        // Save the state, so we can undo the clipping
	        ctx.save();

	        ctx.beginPath();
	        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width, 0, Math.PI * 2, false);

	        // Clip to the current path
	        ctx.clip();


	        ctx.drawImage(img, //src
								  (data.clipX * deltaX), //pos x start cliping
								  (data.clipY * deltaY), //pos y start cliping
								  data.cropW * deltaX, //request W
								  data.cropH * deltaY, // request h
								  data.posX, //pos x on canvas
								  data.posY, //pos y on canvas
								  canvas.width,
								  canvas.height);
	        ctx.restore();

	        var dataURL = canvas.toDataURL("image/png");

	        $rootScope.$broadcast('editDone', { data: dataURL })
	    } //img onload
	} //crop canvas				

    obj.destroy = function () {
        return jcrop.destroy();
    }

    return obj;
} ])