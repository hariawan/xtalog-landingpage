// GLOBAL VARIABLES
var selected_ids = "";
var offset_value = 0;
var total_post_displayed = 0;
$(document).ready(function() {
	$.scrollTop() + 100;
});

function getId(e) {
	var id = $(e).attr("id");
	if (selected_ids.search(id) == -1) {
		$(e).addClass('content-selected');
		// $("#"+id+ " .check-mark").show();
		$("#"+id+ " h2").css("color","#fff");
		selected_ids+=", "+id;
	} else {
		$(e).removeClass('content-selected');
		// $("#"+id+ " .check-mark").hide();
		$("#"+id+ " h2").css("color","#B43838");
		var removed_id = ", "+id;
		selected_ids = selected_ids.replace(removed_id, "");
	}
}

function showDetails(e) {
	var id = $(e).attr("id");
	if (id === "footer-about") {
		$("#footer-info-details p").text("We have more than 30 years experience in offline-selling apparel, and now we're ready for online!");
		$("#footer-info-details").show();
		$("html, body").animate({ scrollTop: $(document).height() }, "slow");

	} else if (id === "footer-location") {
		$("#footer-info-details p").text("BERINGHARJO CENTER LT.3 YOGYAKARTA");
		$("#footer-info-details").show();
		$("html, body").animate({ scrollTop: $(document).height() }, "slow");
	} else if (id === "footer-contact") {
		$("#footer-info-details p").text("BB: 2927B1A1 | Twitter: @grandmode | Email: mail.grandmode@gmail.com | Phone: +62274-517593");
		$("#footer-info-details p").append("<br/><br/><a href=\"http://bit.ly/gmcontact\"><img src=\"http://api.qrserver.com/v1/create-qr-code/?data=BEGIN%3AVCARD%0AVERSION%3A2.1%0AFN%3AGrand%20Mode%0AN%3AMode%3BGrand%0ATEL%3BHOME%3BVOICE%3A%2B62274517593%0AEMAIL%3BHOME%3BINTERNET%3Amail.grandmode%40gmail.com%0AURL%3Ahttp%3A%2F%2Fxtalog.com%2Fgrandmode%0AADR%3A%3B%3BBeringharjo%20Center%20Lt.3%20Yogyakarta%3BYogyakarta%3B%3B%3BIndonesia%0AORG%3AGrand%20Mode%0AEND%3AVCARD%0A&#38;size=150x150&#38;prov=goqrme\" alt=\"QR Code generator\" title=\"\" /></a>");
		$("#footer-info-details").show();
		$("html, body").animate({ scrollTop: $(document).height() }, "slow");
	}
}
var getMoreData = function getMoreData(e) {
	$.getJSON("http://api.tumblr.com/v2/blog/grandmode.tumblr.com/posts?api_key=jIwED91MC51V6U6bBi9bOtZhl202NoiMuMQlfUkboERpoT29fZ&offset="+offset_value+"&callback=?",
	function(data) {
		var response = data.response;
		var total_post = response.total_posts;
		var posts = response.posts;
		var limit_display = 10;
		if(total_post<10) {
			limit_display = total_post;
		} else if((total_post-total_post_displayed)<10) {
			limit_display = total_post-total_post_displayed;
		}
		for(var i=0; i<limit_display; i++) {
			var post_array = posts[i];
			var tag_length = post_array.tags.length;
			var photo_title = post_array.caption;
			var photo_url = post_array.photos[0].original_size.url;

			var code_tag = "";
			var price_tag = "";
			var size_tag = "";
			var cheap_tag = false;
			for(var j=0; j<tag_length; j++) {
				var tags = post_array.tags[j];
				if(tags.indexOf("code") !== -1) {
					code_tag = tags.substring(tags.indexOf("code")+4,tags.length);
				}
				if(tags.indexOf("price") !== -1) {
					price_tag = tags.substring(tags.indexOf("price")+5,tags.length);
					// http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
					price_tag = price_tag.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				if(tags.indexOf("size") !== -1) {
					size_tag = tags.substring(tags.indexOf("size")+4,tags.length);
				}
				if(tags.indexOf("cheap") !== -1) {
					cheap_tag = true;
				}
			}

			var cheap_html = "";
			if (cheap_tag == true) {
				 cheap_html = "<img class=\"low-price\" src=\"images/low_price.png\">";
			}
			$("#content ul").append("<li id=\""+code_tag+"\" onclick=\"getId(this);\" style=\"opacity:1;\"><p class=\"check-mark\">&#10003</p>"+cheap_html+"<img src=\""+photo_url+"\"/><table class=\"tb-details\"><tr><td class=\"td-left\">"+photo_title+"</td><td class=\"td-right\"><p>"+code_tag+"</p></td></tr><tr><td class=\"td-left\"><p>"+size_tag+"</p></td><td class=\"td-right\"><h2>IDR "+price_tag+"</h2></td></tr></table></li>");
			total_post_displayed++;
		}
		offset_value = offset_value+limit_display;
		if(total_post === total_post_displayed) {
			$("#show-more").hide();
		}
	});
}

getMoreData();
