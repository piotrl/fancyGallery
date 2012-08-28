/* fancyGallery v0.1 */

var fancyGallery = {
	names: [],
	actualPosition: 0,
	timeout: 500,
	thumbs: {},
	getThumbs: function() {
		this.thumbs = document.querySelectorAll('.thumbs li a img');
		for(var i=0, length = this.thumbs.length; i < length; i++) {
			var useless = this.thumbs[i].src.lastIndexOf('/')+1;
			var thumbLength = this.thumbs[i].src.length;

			var fileName = this.thumbs[i].src.substr(useless,thumbLength-useless);
			this.names[i] = fileName.replace('_thumb','');

		};

	},
	doCacheImg: function(el) {
		var imgEl = el.querySelectorAll('img');
		var cache = document.createElement('img');

		cache.src = imgEl[0].src;
		cache.classList.add('out');
		el.appendChild(cache);

		if(imgEl.length >= 2) el.removeChild(imgEl[1]);
	}

}

document.addEventListener('DOMContentLoaded', function() {
	fancyGallery.getThumbs();

	[].forEach.call( fancyGallery.thumbs, function(el) {

		el.addEventListener('click', function() {
			var preview = document.querySelector('.preview');

			fancyGallery.doCacheImg(preview);	
		preview.getElementsByTagName('img')[0].src = el.src.replace('_thumb','');
		}, false);
	});
});