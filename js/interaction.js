(function(jQuery) {

	jQuery(".light .button img").on("click",function(){
		jQuery(".light").toggleClass("active");
        jQuery("#slider").toggleClass("active");
        jQuery("body").on("sliderChange", function(){
            var slider_val = jQuery("#slider input").val() / 10;
            console.log(slider_val);
            jQuery(".ampoule .on").css("opacity", slider_val);
        });
	});
	batteryChange(15);

}(jQuery));

function batteryChange(batteryLevel) {
	var inverseLevel = 100-batteryLevel;
	document.getElementById('batteryLevel').style.top = inverseLevel+"%";
	if(batteryLevel >= 20) {
		document.getElementById('batteryLevel').style.backgroundColor = "#D5D24D";
	}
	else {
		document.getElementById('batteryLevel').style.backgroundColor = "#E95B57";
	}
	document.getElementById('batteryValue').innerHTML=batteryLevel+"<span>%</span>";
}
