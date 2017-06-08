$(document).ready(function() {
    // 重置页面
    var $newsTable = $('#newstable tbody');
    refreshNews();
    // 添加新闻内容
    $('#btnsubmit').click(function(e) {
        e.preventDefault();
        // 判断输入
        if ($('#newstitle').val() === "" || $('#newstime').val() === "" || $('#newsimg').val() === "" || $('#newssrc').val() === "" || $('#newsstyle').val() === "") {
            if ($('#newstitle').val() === "") {
                $('#newstitle').parent().addClass('has-error');
            } else {
                $('#newstitle').parent().removeClass('has-error');
            };
            if ($('#newstime').val() === "") {
                $('#newstime').parent().addClass('has-error');
            } else {
                $('#newstime').parent().removeClass('has-error');
            };
            if ($('#newsimg').val() === "") {
                $('#newsimg').parent().addClass('has-error');
            } else {
                $('#newsimg').parent().removeClass('has-error');
            };
            if ($('#newssrc').val() === "") {
                $('#newssrc').parent().addClass('has-error');
            } else {
                $('#newssrc').parent().removeClass('has-error');
            };
            if ($('#newstype').val() === "") {
                $('#newstype').parent().addClass('has-error');
            } else {
                $('#newstype').parent().removeClass('has-error');
            }
        } else {
            var jsonNews = {
                newstitle: $('#newstitle').val(),
                newstime: $('#newstime').val(),
                newsimg: $('#newsimg').val(),
                newssrc: $('#newssrc').val(),
                newstype: $('#newstype').val()
            };
            $.ajax({
                url: '/admin/insert',
                type: 'post',
                data: jsonNews,
                datatype: 'json',
                success: function(data) {
                    console.log(data);
                    refreshNews();
                }
            })
        }
    });
    // 删除新闻功能
    var deleteId = null;
    $newsTable.on('click', '.btn-danger', function(e) {
        $('#deleteModal').modal('show');
        deleteId = $(this).parent().prevAll().eq(5).html();
    });
    $('#deleteModal #confireDelete').click(function(e) {
        if (deleteId) {
            $.ajax({
                url: '/admin/delete',
                type: 'post',
                data: { newsid: deleteId },
                success: function(data) {
                    console.log("删除成功");
                    $('#deleteModal').modal('hide');
                    refreshNews();
                }
            })
        }
    });
    // 修改新闻功能
    var updateId = null;
    $newsTable.on('click', '.btn-primary', function(e) {
        $('#updateModal').modal('show');
        updateId = $(this).parent().prevAll().eq(5).html();
        $.ajax({
            url: '/admin/update',
            type: 'get',
            datatype: 'json',
            data: { newsid: updateId },
            success: function(data) {
                console.log(data);
                $('#unewstitle').val(data[0].newstitle);
                $('#unewstype').val(data[0].newstype);
                $('#unewsimg').val(data[0].newsimg);
                $('#unewssrc').val(data[0].newssrc);
                var untime = data[0].newstime.split('T')[0];
                $('#unewstime').val(untime)
            }
        })
    });
    $('#updateModal #confireUpdate').click(function(e) {
       $.ajax({
       	url: '/admin/curnews',
        type:'post',
        data: {
            newstitle: $('#unewstitle').val(),
            newstime: $('#unewstime').val(),
            newsimg: $('#unewsimg').val(),
            newssrc: $('#unewssrc').val(),
            newstype: $('#unewstype').val(),
            id:updateId
        },
        success:function(data){
        	$('#updateModal').modal('hide');
        	refreshNews();
        }
       })   
    });
})



function refreshNews() {
    //清空所有表格
    var $newsTable = $('#newstable tbody');
    $newsTable.empty();
    $.ajax({
        type: 'get',
        url: '/admin/getnews',
        datatype: 'json',
        success: function(data) {
            console.log(data);
            data.forEach(function(item, index, array) {
                var $tdid = $('<td>').html(item.id);
                var $tdtype = $('<td>').html(item.newstype);
                var $tdtitle = $('<td>').html(item.newstitle);
                var $tdimg = $('<td>').html(item.newsimg);
                var $tdsrc = $('<td>').html(item.newssrc);
                var $tdtime = $('<td>').html(item.newstime);
                var $tdctrl = $('<td>');
                var $btnupdate = $('<button>').addClass('btn btn-primary btn-xs').html("修改");
                var $btndelete = $('<button>').addClass('btn btn-xs btn-danger').html("删除");
                // var $btntrue = $('<span>').addClass('glyphicon glyphicon-ok');
                // $btnupdate.append($btntrue);
                // var $btnfalse = $('<span>').addClass('glyphicon glyphicon-remove');
                // $btndelete.append($btnfalse);
                $tdctrl.append($btnupdate, $btndelete);
                var $tRow = $('<tr>');
                $tRow.append($tdid, $tdtype, $tdimg, $tdtime, $tdsrc, $tdtitle, $tdctrl);
                $newsTable.append($tRow);

            });
        }
    });
}
