$(document).ready(function () {

loadInstaGallery();


/********************************************************
 * Change grid color upon hover if grid is not selected *
 ********************************************************/

$("#twoByTwo").hover(function() {
	$(".threeByThree").css({
		"color":"white",
		"background-color":"#2C3539",
		"border-color":"#2C3539",
	});
}, function(){
	$(".threeByThree").css({
		"color":"#2C3539",
		"background-color":"white",
		"border-color":"white",
	});
});



/*********
 * Setup *
 *********/

/* Variables */
var tag = 'buitragochan';

var nextLink = false;
var loadingImages = false;

/**************************************
 * Function to load Instagram photos *
 **************************************/

function loadInstaGallery() {
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		//data: {'client_id': instagram.clientID, 'max_tag_id': min},
		cache: false,
		url: 'https://api.instagram.com/v1/tags/buitragochan/media/recent?access_token=15649813.5622604.0c5820e15a5643f1b4b94ab74ef45ccf&count=12',
		success: processData
	});
}

function processData(data) {
	for (var i = 0; i < data.data.length; i++) {
		$("#photoFeed").append("<a target='_blank' href='" + data.data[i].link +"'><img class='instagram-image' src='" + data.data[i].images.low_resolution.url +"' /></a></div>");
		
		$("img").hide().on("load",function(){
    		$(this).fadeIn(1000);
		}).each(function(){
    	if(this.complete) $(this).trigger("load");
		});
	}
}

/*************
 * View More *
 *************/

/* This function is currently loading duplicate photos, needs to be fixed */
function loadNext() {
  	// Prevent (redundantly) loading images if we're already loading them,
  	// and prevent us from entering an infinite loop
var url = 'https://api.instagram.com/v1/tags/buitragochan/media/recent?access_token=15649813.5622604.0c5820e15a5643f1b4b94ab74ef45ccf&count=12';
var next_url = 'https://api.instagram.com/v1/tags/buitragochan/media/recent?access_token=15649813.1fb234f.5896f3fd17854bb5bca6e8bb88ec731e&max_tag_id=1382958789091';


  	if (loadingImages || nextLink == url) {
  	  return false;
  	}
  	else{
	// We are now loading images!
	loadingImages = true;

	loadInstaGallery();

    // Aaaaaand we're done loading.
    loadingImages = false;

	}
	}

/* The loadNext(); function is currently loading duplicate photos, needs to be fixed */
/* When the user scrolls to the bottom of the page, load the next set of images */
$("#paginate").click(function() {
	loadNext();
});



/* Closing brackets for $(document) */
});




