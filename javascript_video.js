$(document).ready(function(){
    $("button").click(function(){
		performVideoSearch();
    });
});

function performVideoSearch()
{
	var terms = jQuery('#term').val();
	if (terms==""){
		alert("Please enter a valid search item.");
	};
	$.ajax({
	"url": "https://www.googleapis.com/youtube/v3/search?key=AIzaSyA5_5cy7lwaLAt9wwiWZAYdVE1bJizhDPE&part=snippet", 
	"type": "GET",
	"dataType": "JSONP",
	"data": {"term": terms},
	"success": function(data) {
		console.log(data);
		$('#pagination-container').pagination({
		dataSource: data.results,
		callback: function(data, pagination) {
        var html = displayTable(data);
        $('#data-container').html(html);
    }
})},})
}
/*lines 36-40 from pagination plugin from http://paginationjs.com/*/

function performNapsterSearch()
{
	var terms = jQuery('#term').val();
	$.ajax({
	"url": "https://api.napster.com/v2.0/search?", 
	"type": "GET",
	"dataType": "JSONP",
	"data": {"q": terms},
	"success": function(data) {displayTable(data.results)},})
}

function reloadPage() 
{
    location.reload();
}

function displayTable(data) 
{
    var divText = "";
	$.each(data, function(index, item){
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







