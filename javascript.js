$(document).ready(function(){
    $("button").click(function(){
		performSearch();
    });
});

function performSearch()
{
	var terms = jQuery('#term').val();
	if (terms==""){
		alert("Please enter a valid search item.");
	};
	$.ajax({
	"url": "https://itunes.apple.com/search?", 
	"type": "GET",
	"dataType": "JSONP",
	"data": {"term": terms},
	"success": function(data) {
		$('#pagination-container').pagination({
		dataSource: data.results,
		callback: function(data, pagination) {
        var html = displayTable(data);
        $('#data-container').html(html);
    }
})},})
}
/*lines 19-23 from pagination plugin from paginationjs.com, MIT License (MIT) Copyright (c) 2014-2048*/

/* to see list, not table */
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





function reloadPage() 
{
    location.reload();
}

function displayTable(data) 
{
    var divText = "";
	$.each(data, function(index, item)
	{
		if (item.trackPrice <0)
		{
			item.trackPrice = "N/A";
		}
	});
    $.each(data, function(index, item){
        divText += "<table border=1><tr><th>" + "<img src='"+item.artworkUrl60+"'>" +"</th><th>" + item.artistName + "</th><th>"+ item.collectionName+"</th><th>"+ "<a href = '"+item.previewUrl+"' target='_blank'>"+item.trackName+"</a>"+"</th><th style='text-align:center'>" + item.trackPrice+ "</th></tr>";
    });
    divText += "</table>";
    return divText;
}








