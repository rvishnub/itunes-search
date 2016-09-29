function displayTracks(data)
{
	resultList = data.results;
	songList = "";

	for (key in resultList) 
	{
		musicInfo = resultList[key];
		for (keyitem in musicInfo)
		{
			songList = songList + keyitem + ":  "+ musicInfo[keyitem] + "<br>";
		}
		songList = songList+"<br><br>";
	}
	document.getElementById("songlist").innerHTML = songList;
}

function displayAllInfo(data)
{
	console.log(data.results);
	displayTracks(data);
}

function performSearch()
{
	var terms = jQuery('#term').val();
	alert(terms);
	$.ajax({
	"url": "https://itunes.apple.com/search?", 
	"type": "GET",
	"dataType": "JSONP",
	"data": {"term": terms},
	"success": function(data) {displayTable(data.results)},})
}

function performNapsterSearch()
{
	var terms = jQuery('#term').val();
	alert(terms);
	$.ajax({
	"url": "https://api.napster.com/v2.0/search?", 
	"type": "GET",
	"dataType": "JSONP",
	"data": {"q": terms},
	"success": function(data) {displayTable(data.results)},})
}



function displayTable(array)
{
	divText="";
    for (key in array)
    {
		artistName=array[key].artistName;
		collectionName = array[key].collectionName;
		trackName=array[key].trackName;
		trackPrice=array[key].trackPrice;
		previewUrl=array[key].previewUrl;
		divText = divText+"<table border=1><tr><th>" + artistName + "</th><th>"+ collectionName+"</th><th>"+ "<a href = '"+previewUrl+"'>"+trackName+"</a>"+"</th><th>" + trackPrice+ "</th></tr>"
		
	}
    document.getElementById("resultsTable").innerHTML= divText;
}


$(document).ready(function(){
    $("colorblock").click(function(){
        var div = $("div");
        div.animate({height: '300px', opacity: '0.4'}, "slow");
        div.animate({width: '300px', opacity: '0.8'}, "slow");
        div.animate({height: '100px', opacity: '0.4'}, "slow");
        div.animate({width: '100px', opacity: '0.8'}, "slow");
    });
});






