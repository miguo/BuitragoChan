$(document).ready(function () {


$.ajax({
	type: "GET",
	dataType: "jsonp",
	cache: false,
	url: "https://api.instagram.com/v1/tags/nofilter?access_token=15649813.5622604.0c5820e15a5643f1b4b94ab74ef45ccf",
	success: function(data) {
		for (var i = 0; i < 4; i++) {
			$("#photoFeed").append("<div class='instaframe'>
			<a target='_blank' href='" + data.data[i].link +"'>
			<img src='" + data.data[i].images.standard_resolution.url +"' /></a></div>"
		
		}
	}
});




});