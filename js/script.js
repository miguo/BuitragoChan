$(document).ready(function(){

    loadInstaGallery();

    $("#paginate").click(function() {
		pollInstagram(next_url);
		console.log(next_url);
    });

//end of $(document) function
});

/*****************************************************
 * Change grid color & hover when selecting 2x2 grid *
 *****************************************************/
/* Function for whether View More button loads photos as 2x2 or 3x3 based on grid button clicked
function photoSize() {
	if ($("#photoFeed").hasClass("#gridThree")) {
        	$("img").animate({
				"height": "306",
				"width": "306",
			});        
        } else {
        	$("img").animate({
				"height": "420",
				"width": "420",
			}); 
      	}
} */

$("#twoByTwo").on("click", function() {

	$("#twoByTwo").css({
		"color": "white",
    	"background-color": "#2C3539",
    	"border-color": "#2C3539",
	});

	$("#threeByThree").css({
		"color": "#2C3539",
    	"background-color": "white",
    	"border-color": "white",
	});


	$("img").animate({
		"height": "420",
		"width": "420",
	}); 
}); 

/*****************************************************
 * Change grid color & hover when selecting 3x3 grid *
 *****************************************************/


$("#threeByThree").on("click", function() {

	$("#threeByThree").css({
		"color": "white",
    	"background-color": "#2C3539",
    	"border-color": "#2C3539",
	});

	$("#twoByTwo").css({
		"color": "#2C3539",
    	"background-color": "white",
    	"border-color": "white",
	});

	$("img").animate({
		"height": "306",
		"width": "306",
	}); 
}); 

/*********
 * Setup *
 *********/

//Variables for the tag to pull and min tag id
var tag = 'buitragochan';
    min = '';
var url = 'https://api.instagram.com/v1/tags/buitragochan/media/recent?access_token=15649813.5622604.0c5820e15a5643f1b4b94ab74ef45ccf';
var next_url = 'https://api.instagram.com/v1/tags/buitragochan/media/recent?access_token=15649813.1fb234f.5896f3fd17854bb5bca6e8bb88ec731e&max_tag_id=1382958789091';

/**************************************
 * Function to load Instagram photos *
 **************************************/

function loadInstaGallery() {
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		//data: {'client_id': instagram.clientID, 'max_tag_id': min},
		cache: false,
		url: url,
		success: processData
	});
}

function processData(data, count) {
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

function pollInstagram(next_url, count) {
    $.ajax({
        method: "GET",
        url: next_url,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonpcallback",
        success: function(data) {
            for (var i = 0; i < data.data.length; i++) {
                $("#photoFeed").append("<a target='_blank' href='" + data.data[i].link +"'><img class='instagram-image' src='" + data.data[i].images.low_resolution.url +"' /></a></div>");
                
                $("img").hide().on("load",function(){
                $(this).fadeIn(1000);
                }).each(function(){
                if(this.complete) $(this).trigger("load");
                });

            }
            // If the next url is not null or blank:
            if( data.pagination.next_url && count <=20 ) {
                pollInstagram(data.pagination.next_url, ++count);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //alert("Check your internet Connection");
            $("#photoFeed").val($("#photoFeed").val() + 'Error\n');
        }
    });
}










