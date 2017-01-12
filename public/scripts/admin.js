$(document).ready(function() {
    var $newsTable = $('#newstable tbody');
    refreshNews();
    //添加新闻的功能
    $('#btnsubmit').click(function(e) {
        e.preventDefault();
        //对输入内容是否为空做判断并提示
        if ($('#newstitle').val() === "" || $('#newsimg').val() === "" || $('#newstime').val() === "") {
            if ($('#newstitle').val() === "") {
                $('#newstitle').parent().addClass('has-error');
            } else {
                $('#newstitle').parent().removeClass('has-error');
            }
            if ($('#newsimg').val() === "") {
                $('#newsimg').parent().addClass('has-error');
            } else {
                $('#newsimg').parent().removeClass('has-error');
            }
            if ($('#newstime').val() === "") {
                $('#newstime').parent().addClass('has-error');
            } else {
                $('#newstime').parent().removeClass('has-error');
            }
        } else {
            var jsonNews = {//定义数据
                newstitle: $('#newstitle').val(),
                newsimg: $('#newsimg').val(),
                newstime: $('#newstime').val(),
                newstype: $('#newstype').val()
            };
            $.ajax({
                url: '/admin/insert',
                type: 'post',
                data: jsonNews,
                datatype: 'json',
                success: function(data) {
                    refreshNews();//添加成功后刷新新闻列表
                    //console.log(data);
                },
                error:function (error) {
                    console.log(error);
                }
            });
        }
    });
    //删除新闻的功能
    var deleteId;
    $newsTable.on('click', '.btn-danger', function(e) {//弹出提示框
        $('#deleteModal').modal('show');
        deleteId = $(this).parent().prevAll().eq(4).html();
    });
    $('#deleteModal #confirmDelete').click(function(e) {//确认删除

        $.ajax({
            url: '/admin/delete',
            type: 'post',
            data: { newsid: deleteId },
            success: function(data) {
                $('#deleteModal').modal('hide');
                refreshNews();//删除后刷新新闻列表
                //console.log(data);
            },
            error:function (error) {
                console.log(error);
            }
        });


    });

    //编辑新闻的功能
    var updateId;
    $newsTable.on('click', '.btn-primary', function(e) {//弹出提示框
        $('#updateModal').modal('show');
        updateId = $(this).parent().prevAll().eq(4).html();
          $.ajax({
            url: '/admin/curnews',
            type: 'get',
            datatype:'json',
            data: { newsid: updateId },
            success: function(data) {
                $('#unewstitle').val(data[0].newstitle);
                $('#unewsimg').val(data[0].newsimg);
                $('#unewstype').val(data[0].newstype);
                var utime = data[0].newstime.split('T')[0];           
                $('#unewstime').val(utime);
                //console.log(data);
            },
            error:function (error) {
                console.log(error);
            }
        });

    });
    $('#updateModal #confirmUpdate').click(function(e) {//保存后的内容
         $.ajax({
            url: '/admin/update',
            type: 'POST',
            data:{ 
               newstitle : $('#unewstitle').val(),
               newsimg : $('#unewsimg').val(),
               newstype : $('#unewstype').val(),            
               newstime : $('#unewstime').val(),
               newsid : updateId
            },                
            success: function(data) {                
                $('#updateModal').modal('hide');
                refreshNews(); //编辑保存后刷新新闻列表
                //console.log(data);              
            },
            error:function (error) {
                console.log(error);
            }
      

            });
     });


    //刷新新闻列表的功能
    function refreshNews() {
        $newsTable.empty();
        $.ajax({
            url: '/admin/getnews',
            type: 'get',
            datatype: 'json',
            success: function(data) {
                $.each(data, function(index, item, array) {
                    var $tdid = $('<td>').html(item.id);
                    var $tdtitle = $('<td>').html(item.newstitle);
                    var $tdimg = $('<td>').html(item.newsimg);
                    var ttime = item.newstime.split('T')[0];
                    var $tdtime = $('<td>').html(ttime);
                    var $tdtype = $('<td>').html(item.newstype);
                    var $tdctrl = $('<td>');
                    var $btnchange = $('<button>').addClass('btn btn-primary btn-xs').html('编辑');
                    var $btndelete = $('<button>').addClass('btn btn-danger btn-xs').html('删除');
                    $tdctrl.append($btnchange, $btndelete);
                    var $tRow = $('<tr>');
                    $tRow.append($tdid, $tdtitle, $tdimg, $tdtime, $tdtype, $tdctrl);
                    $newsTable.prepend($tRow);
                });
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
});
