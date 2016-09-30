$(document).ready(function(){
    $("button").click(function(){
		performVideoSearch();
    });
});

function performVideoSearch()
{
	var q = jQuery('#term').val();
	if (q=="")
	{
		alert("Please enter a valid search item.");
	};
	$.ajax(
	{
		"url": "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=AIzaSyDn2MOz8IoFgXpoA2APTLePIIO3MOf70y0", 
		"type": "GET",
		"dataType": "JSONP",
		"data": {"q": q},
		
		"success": function(data) 
		{
			$('#pagination-container').pagination({
			dataSource: data.items,
			callback: function(data, pagination) {
			var tableText = displayTable(data);
			$('#data-container').html(tableText);
			}
		})
	},
})
	
/*lines 23-27 and corresponding code in html are from from pagination plugin from paginationjs.com, MIT License (MIT) Copyright (c) 2014-2048*/
	
		
function displayTable(response)
	{
	var tableText="";
	for (var vidFieldNum in response)
	{
		var item = response[vidFieldNum];
		if (item.id.videoId == null)
		{
			item.id.videoId = "N/A";
		}
	};
	for(var vidFieldNum in response) 
	{
		var item = response[vidFieldNum];
		tableText += "<table border=1><tr><th>" + item.snippet.title + "</th><th style='text-align:center'>"+ item.id.videoId+"</th><th style='text-align:center'><a href = 'https://www.youtube.com/watch?v="+item.id.videoId+"'  target='_blank' >Go to video</a>"+"</th></tr>";
		
	}
	return tableText;
	}
}


function reloadPage() 
{
    location.reload();
}
