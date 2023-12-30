/*
# NĂºt bĂªn dÆ°á»›i trang
*/
//Hiá»‡n danh sĂ¡ch menu con
$("#contact-button-bottom").on("click", ".pulsing-button", function(){
	var parent = $(this).parents("#contact-button-bottom");
	if( $(".contact-button-wrap").is(":hidden") ){
		parent.find(".pulsing-button>span>.pulsing-button-active").hide();
		parent.find(".pulsing-button>i").show();
		parent.children("a").css({"background-color": "#d6d6d6"});
	}else{
		parent.find(".pulsing-button>span>.pulsing-button-active").show();
		parent.find(".pulsing-button>i").hide();
		parent.children("a").css({"background-color": ""});
		$("#facebook-messenger-wrap .fb-customerchat iframe").css({"max-height": "0"}).removeClass("fb_customer_chat_bounce_in_v2").addClass(" fb_customer_chat_bounce_out_v2");
	}
	parent.children("nav").slideToggle();
	$(".contact-button-wrap").toggle();
});

$("#contact-button-bottom nav>a").each(function(i){
	var el = $('<div>'+$(this).find("i,img")[0].outerHTML+'</div>');
	if(i == 0){
		$("#contact-button-bottom .pulsing-button>span").html("");
		el.children().addClass("pulsing-button-active");
	}else{
		el.children().hide();
	}
	$("#contact-button-bottom .pulsing-button>span").append( el.html() );
});
/*
 * Hiá»‡n chat messenger
 */
setInterval(function(){
	if( $(".contact-button-wrap").is(":hidden") && document.hasFocus() ){
		var activeEl = $("#contact-button-bottom .pulsing-button-active");
		if( activeEl.next().length > 0 ){
			activeEl.next().addClass("pulsing-button-active").fadeIn();
		}else{
			$("#contact-button-bottom .pulsing-button>span>:first-child").addClass("pulsing-button-active").fadeIn();
		}
		activeEl.removeClass("pulsing-button-active").fadeOut();
	}
}, 2e3);

/*
 * áº¤n hiá»‡n nĂºt nháº¯n tin messenger
 */
 function showMessengerChat(){
 	var el = $("#facebook-messenger-wrap .fb-customerchat iframe");
 	if( el.height() == 0 ){
	 	el.css({"max-height": "99%"}).addClass("fb_customer_chat_bounce_in_v2").removeClass(" fb_customer_chat_bounce_out_v2");
 	}else{
 		el.css({"max-height": "0"}).removeClass("fb_customer_chat_bounce_in_v2").addClass(" fb_customer_chat_bounce_out_v2");
 	}
 }

 /*
 * áº¤n nĂºt Ä‘á»ƒ láº¡i lá»i nháº¯n
 */
function showContactForm(){
	$(".modal-contact-form").css({"z-index": "140219973"}).fadeIn();
}

 /*
 * Hiá»‡n form Ä‘Äƒng kĂ½
 */
function showRegisterForm(){
	var registerBox = $(".modal-register-box");
	if(registerBox.length > 0){
		registerBox.fadeIn();
	}else{
		location.href = "/admin/WebsiteTemplate";
	}
}

/*
 * áº¤n nĂºt Ä‘á»ƒ láº¡i lá»i nháº¯n
 */
$(document).ready(function(){
	 $("#contact-form").on("click", "button", function(){
	 	var form = $(this).parents("form");
	 	$('#loading').show();
	 	$.ajax({ 
	 		type: "POST", 
	 		url: "/api/contact", 
	 		data: form.serialize(), 
	 		dataType: "json",
	 		success: function(data) { 
	 			if(data.error.length == 0){
	 				form.find(".contact-notify").removeClass("alert-danger").addClass("alert-success").html("Gá»­i liĂªn há»‡ thĂ nh cĂ´ng, chĂºng tĂ´i sáº½ sá»›m pháº£n há»“i láº¡i cho quĂ½ khĂ¡ch, xin cáº£m Æ¡n!").show();
	 				form.find(".contact-input").hide();
	 				$.get('/user/sendNotifyToManager'); // Gá»­i thĂ´ng bĂ¡o tĂ i khoáº£n má»›i tá»›i quáº£n lĂ½
	 			}else{
	 				form.find(".contact-notify").html(data.error).show();
	 			}
	 			console.log(data);
	 		},
	 		complete: function(){
	 			$('#loading').hide();
	 		},
	 		error: function(err){
	 			alert("Lá»—i káº¿t ná»‘i, xin vui lĂ²ng thá»­ láº¡i");
	 		}
	 	});
	 	if( !$(".contact-button-wrap").is(":hidden") ){
	 		$("#contact-button-bottom .pulsing-button")[0].click();
	 	}
	 });
});