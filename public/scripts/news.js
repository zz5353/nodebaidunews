$(document).ready(function() {
    refreshNews('精选');//默认加载的新闻类型
    $('nav a').click(function(e){//选中标签出现下划线
        e.preventDefault();
        var type = $(this).text();
        $('nav ul li a').attr("class","");
        $(this).attr("class","selectedtype");
       //console.log(type);
        refreshNews(type);
    });
    
});

function refreshNews(type) {//页面加载时，获取新闻
    var $lists = $('article ul');
    $lists.html("");
    $.ajax({
        url:'/news',
        type:'get',
        datatype:'json',
        data:{newstype:type},
        success:function (data) {
            data.forEach(function (item,index,array) {
                var $list = $('<li></li>').addClass('news-list').prependTo($lists);
                var $newsImg = $('<div></div>').addClass('news-img').appendTo($list);
                var $img = $('<img>').attr('src', item.newsimg).appendTo($newsImg);
                var $newsContent = $('<div></div>').addClass('news-content').appendTo($list);
                var $h1 = $('<h1></h1>').html(item.newstitle).appendTo($newsContent);
                var $p = $('<p></p>').appendTo($newsContent);
                var ntime = item.newstime.split('T')[0];
                var $newsTime = $('<span></span>').html(ntime).appendTo($p);
            });            
        }
    });
   
}


