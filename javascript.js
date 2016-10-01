$(document).ready(function(){
		$('#myForm').submit(function(event){
		  event.preventDefault();
		  target.scrollIntoView();
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
        var tableText = displayTable(data);
        $('#data-container').html(tableText);

    }
})},})
}
/*lines 19-23 from pagination plugin from paginationjs.com, MIT License (MIT) Copyright (c) 2014-2048*/


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








