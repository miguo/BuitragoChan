$(document).ready(function () {


//Function to load Instagram photos
function loadInstaGallery() {
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: "https://api.instagram.com/v1/tags/buitragochan/media/recent?access_token=15649813.5622604.0c5820e15a5643f1b4b94ab74ef45ccf",
		success: function(data) {
			for (var i = 0; i < 20; i++) {
				$("#photoFeed").append("<a target='_blank' href='" + data.data[i].link +"'><img class='instagram-image' src='" + data.data[i].images.low_resolution.url +"' /></a></div>");
			}
		} 
	});
}

loadInstaGallery();



});