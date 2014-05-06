$(function(){
	//tweet
	$("body").on('click', '.load-object', function(){
		var self = $(this);
		var object = self.attr("data-object");
		if(!object){
			return;
		}
		$.getJSON("http://api.iulogy.com/sources/" + object, function(res){
			$("#put").html('');
			var res = {
				content:build(res)
			}
			console.log(res);
			var html = jade.render(object, res);
			$("#put").append(html);
			return;
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

});

function build(arr){
	arr = arr.map(function(el){
		delete el._rawHash;
		delete el._resHash;
		delete el.url;
		delete el.label;
		delete el.fetchDate;

		var ret = [];
		//find keys
		var keys = Object.keys(el);
		for(var i=0; i<el[keys[0]].length; i++){
			var r = {};
			keys.forEach(function(k){
				r[k] = el[k][i];
			});
			ret.push(r);
		}
		return ret;
	});
	return arr;
}
