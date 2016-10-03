$(document).ready(function(){
		$('#myForm').submit(function(event){
		  event.preventDefault();
		  target.scrollIntoView();
		  performNapsterSearch();
    });
});

function performNapsterSearch()
{
	var q = jQuery('#term').val();
	alert(q);
	if (q=="")
	{
		alert("Please enter a valid search item.");
	};

	$.ajax({
		"url": "https://api.napster.com/search?client_id=MTJhNWNlZDQtMTYzMi00MjU5LWE2NDgtYTVjZDIyMTAxZTI3",
		"type": "GET",
		"dataType": "JSONP",
		"data": {"q": q},
		
		"success": function(data) 
		{
			alert(data);
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
	
		
function reloadPage() 
{
    location.reload();
}

function displayTable(searchResults) 
{
    var tableText = "";
	$.each(searchResults, function(index, item)
	{
		if (item.trackPrice <0)
		{
			item.trackPrice = "N/A";
		}
	});
    $.each(searchResults, function(index, item){
        tableText += "<table border=1><tr><th>" + "<img src='"+item.artworkUrl60+"'>" +"</th><th>" + item.artistName + "</th><th>"+ item.collectionName+"</th><th>"+ "<a href = '"+item.previewUrl+"' target='_blank'>"+item.trackName+"</a>"+"</th><th style='text-align:center'>" + item.trackPrice+ "</th></tr>";
    });
    tableText += "</table>";
    return tableText;
}