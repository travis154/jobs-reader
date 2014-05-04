$(function(){
	//tweet
	$.getJSON("http://api.iulogy.com/sources/news", function(res){
		res.forEach(function(news){
			for(var i=0;i<news.headlines.length;i++){
				var title = news.headlines[i];
				var url = news.links[i];
				var description = news.description ? news.description[i] : "";
				description = $("<div />").append(description).text();
				var image = news.image ? "<img src='"+news.image[i]+"' class='img img-responsive'/>" : "";
				var source = "<div style='font-family:sans serif;color:#c0c0c0;'><small>"+url+"</small></div>";
				var html = '<div class="col-md-6 news-el news-el-3"><a href="'+url+'"><h3>'+title+'</h3></a>'+source+image+'<p>'+description+'</p></div>';

				$("#put").append(html);
			}				
		});
	});
})