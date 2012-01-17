/*
Made by: Piotr Lewandowski
Demo page: http://dev.grovman.pl/sandbox/gallery/

TODO:
	- Poprawny autoslider!
	- preLoading obrazkow
		- pokazywanie miniaturek dopoki nie zaladuja sie pelne obrazki
		- przesuwanie sie miniaturek IF jest ich wiecej niz moze pokazac
		- moze $.fn.wtyczka() i domyslne zmienne?
	- przegladaniem miniaturek tabem (naprawic w chrome, lepiej pokazac w fx/opera)
	- aktywna miniaturka sie chowa pod galeria
*/

function randomPhoto() {
	var max = $('.thumbs li').length;
	var randSrc = Math.floor(Math.random()*max);
	$(".preview img", "#gallery").attr("src","img/photos/"+randSrc+".jpg");
	$(".thumbs li").eq(randSrc).addClass("active"); //eq() is numering from zero
}

function generate() {
	$('.thumbs li a').each(function() {
		var link = $(this).find('img').attr('src').replace('_thumb','');
		$(this).attr("href",link);
		$.preloadImages(link);
	});
}

$.preloadImages = function()
{
       for(var i = 0; i<arguments.length; i++)
       {
               $("<img />").attr("src", arguments[i]);
       }
}

function autoPlay() {
		var nextlink = $(".thumbs li.active").next().find("a");
		if ($(".active").is(":last-child")) nextlink = $(".thumbs li:first-child a");
		slideImage(nextlink);
}

function slideImage(current) {
	$(".thumbs li").removeClass("active");
	$(current).parent().addClass("active");
		
	var thumblink = $(current).find("img").attr("src").replace('_thumb','');
	var prevlink =  $("img.new").attr("src");

	$(".preview img.showed").attr("src", thumblink);
	$(".preview img.hidden").fadeOut(function(){
		$(this).attr("src", thumblink).show();
	});
	return false;
}
	
$(function() {
	randomPhoto();
	generate();
	//setInterval(autoPlay, 2000);
	$(".thumbs a", "#gallery").click (function(event) {
		slideImage(this);
		return false;
	});
});

$('.dupa > p').click(function(){
    $('.kupe').toggle(function() {
        $(this).animate({'bottom':'40px'},400);
    },
    function() {
        $(this).animate({'bottom':'-40px'},400);
    });
});
