$(document).ready(function(){
		$('#myForm').submit(function(event){
		  event.preventDefault();
		  target.scrollIntoView();
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
}
	
/*lines 23-27 and corresponding code in html are from from pagination plugin from paginationjs.com, MIT License (MIT) Copyright (c) 2014-2048*/
	
		
function displayTable(searchResults)
	{
	var tableText="";
	for (var vidFieldNum in searchResults)
	{
		var item = searchResults[vidFieldNum];
		if (item.id.videoId == null)
		{
			item.id.videoId = "N/A";
		}
	};
	for(var vidFieldNum in searchResults) 
	{
		var item = searchResults[vidFieldNum];

		tableText += "<table border=1><tr><th>" + item.snippet.title + "</th><th style='text-align:center'>"+ item.id.videoId+"</th><th style='text-align:center'><a href = 'https://www.youtube.com/watch?v="+item.id.videoId+"' target='_blank' >Go to video</a></th><th style='align:center'><button id='player' onclick=playAVideo('"+item.id.videoId+"')>Play Here</button></th></tr>";
	}
		return tableText;
	}


function reloadPage() 
{
    location.reload();
}

function playVideo(myVideoId)
{
  // Load the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  var player;
  function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
      height: '390',
      width: '640',
      videoId: myVideoId,
    });
  }
}

function playAVideo(videoId)
{
	var videoPlayerText = '<iframe id="ytplayer" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/'+videoId+'?autoplay=1" frameborder="1"></iframe>';
	document.getElementById("vplayer").innerHTML = videoPlayerText;
}

function getDataFromHtml()
{
	$("#btn2").click(function(){
	alert("videoId: " + $("#data").html());
	
	
})
}


