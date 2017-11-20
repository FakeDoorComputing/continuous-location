var counter=0, watchID;
var locationOptions = {
	maximumAge: 10000,
	timeout: 6000,
	enableHighAccuracy: true
};

//when the jQuery Mobile page is initialised
$(document).on('pageinit', function() {

	//set up listener for button click
	$("#toggle").on('click', getPosition);

});


//Call this function when you want to get the current position
function getPosition() {
	counter++;

	//change time box to show updated message
	$('#time').val("Getting data...");

	if(counter%2!=1){
		/*
		$("#toggle").each(function(){
			$(this).children(".box").
		});
		*/
		$("#time").val("");
		$("#lattext").val("");
		$("#longtext").val("");
		$("#alttext").val("");
		$("#time").val("");
		navigator.geolocation.clearWatch(watchID);
	}

	if(counter%2!=0){
		watchID=navigator.geolocation.watchPosition(function(position){
			locateMe(position.coords.latitude, position.coords.longitude, position.timestamp, position.coords.altitude);
		}, failPosition, locationOptions);
	};
}

function locateMe(lat,long,time,alti){
	var time=new Date(time);
	$('#lattext').val(lat);
	$("#longtext").val(long);
	$("#alttext").val(alti);
	$("#time").val(time);
}

//called if the position is not obtained correctly
function failPosition(error) {
	//change time box to show updated message
	$('#time').val("Error getting data: " + error);

}
