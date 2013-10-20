(function(jQuery) {

	jQuery(".light .button img").on("click",function(){
		jQuery(".light").toggleClass("active");

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
