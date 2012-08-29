/**
 * fancyGallery v0.2
 * @author Piotr Lewandowski
 * @demo http://piotrl.github.com/fancyGallery/
 */

var fancyGallery = {
	names: [], // [ file0.jpg, file1.jpg, file2.png, etc... ] | for the future |
	actualPosition: 0, // indexOf clicked thumbnail | for the future |
	timeout: 500, // time between transition from picture[i] to picture[i+1]
	thumbs: {}, // objects with <img /> from thumbnails
	getThumbs: function() {
		this.thumbs = document.querySelectorAll('.thumbs li a img');
		for(var i=0, length = this.thumbs.length; i < length; i++) { // for every thumb;

			var useless = this.thumbs[i].src.lastIndexOf('/')+1; // image/thumbs/file0_thumb.jpg = 11 + 1 = 12
			var thumbLength = this.thumbs[i].src.length; // image/thumbs/file0_thumb.jpg = 26

			var fileName = this.thumbs[i].src.substr(useless,thumbLength-useless); // image/thumbs/file0_thumb.jpg == src="file0_thumb.jpg"
			this.names[i] = fileName.replace('_thumb',''); // file_thumb.jpg becomes file.jpg in names[]

		};

	},
	doCacheImg: function(el) {
		/* Create additional copy of image (just before change preview.src to src of thumb)
		 * Created IMG at once disappears [opacity: 1 -> opacity: 0]
		 * el = <div class="preview" />
		 */
		var imgEl = el.querySelectorAll('img'); 
			//imgEl[0] allways real '.proper' img
			//imgEl[1] cached IMG whose disappears
			//imgEl[2] next cached IMG whose becomes imgEl[1]  in a moment (check if statement)

		var cache = document.createElement('img'); // <img />
			cache.src = imgEl[0].src; // <img src="{proper img src}" />
			cache.classList.add('out'); // <img src="{proper img src}" class="out" />
			el.appendChild(cache);	//<div class="preview"> {proper img} ... <img src="{proper img src}" />

		if(imgEl.length >= 2) el.removeChild(imgEl[1]);
		// 2 - main 'proper' img + one copy;
		// if more - then remove imgEl[1] - and then last cached img becomes imgEl[1]
	}

}

document.addEventListener('DOMContentLoaded', function() { //if DOM is ready to read / edit

	fancyGallery.getThumbs(); //fill fancyGallery.thumbs[] and fancyGallery.names[]

	[].forEach.call( fancyGallery.thumbs, function(el) {
		//el = clicked thumb = fancyGallery.thumbs[el];
		el.addEventListener('click', function() {
			var preview = document.querySelector('.preview'); //.preview displays big <img /> preview

			fancyGallery.doCacheImg(preview);
			preview.getElementsByTagName('img')[0].src = el.src.replace('_thumb',''); //when cache IMG is done, main <img /> change URL to new
		}, false);

	});
});