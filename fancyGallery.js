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

}

document.addEventListener('DOMContentLoaded', function() {
	fancyGallery.getThumbs();

	[].forEach.call( fancyGallery.thumbs, function(el) {

	   el.addEventListener('click', function() {
		var preview = document.querySelectorAll('.preview img')[0];
	    preview.src = el.src;
	  }, false);
	 
	});
});