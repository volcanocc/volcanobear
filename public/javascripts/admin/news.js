/**
 * Created by CAN on 2016/10/7.
 */



$(function () {

    const NEWS_TYPE = {0:'全部', 1:'精选', 2:'百家', 3:'本地', 4:'娱乐', 5:'社会', 6:'军事'};

    //新闻内容
    var newsTable = $("#news_table tbody");
    refreshNews('');

    //新闻提交
    $("#btnSubmit").click(function (e) {

        e.preventDefault();

        var newsTitle = $("#news_title");
        var newsType = $("#news_type");
        var newsImg = $("#news_img");
        var newsTime = $("#news_time");
        var newsSource = $("#news_source");

        if (newsTitle.val() == '') {
            newsTitle.parent().addClass("has-error");
            return false;
        } else {
            newsTitle.parent().removeClass("has-error");
        }

        if (newsImg.val() == '') {
            newsImg.parent().addClass("has-error");
            return false;
        } else {
            newsImg.parent().removeClass("has-error");
        }

        if (newsTime.val() == '') {
            newsTime.parent().addClass("has-error");
            return false;
        } else {
            newsTime.parent().removeClass("has-error");
        }

        if (newsSource.val() == '') {
            newsSource.parent().addClass("has-error");
            return false;
        } else {
            newsSource.parent().removeClass("has-error");
        }

        //提交新闻
        var jsonNews = {
            newsTitle: newsTitle.val(),
            newsType: newsType.val(),
            newsImg: newsImg.val(),
            newsTime: newsTime.val(),
            newsSrc: newsSource.val()
        };

        $.ajax({
            url: '/news',
            type: 'POST',
            data: jsonNews,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                window.location.href = './index';
            }
        })
    });


    //删除新闻
    var deleteId = '';
    newsTable.on("click", ".btn-danger", function () {
        $("#deleteModal").modal("show");
        deleteId = $(this).parent().prevAll().eq(5).html();
    });
    $("#deleteModal #confirmDel").click(function () {
        if (deleteId) {
            $.ajax({
                url: '/deleteNews',
                type: 'POST',
                data: {newsId: deleteId},
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    $("#deleteModal").modal("hide");
                    refreshNews('');
                }
            })
        }
    });

    //修改新闻
    var updateId = '';
    newsTable.on("click", ".btn-primary", function () {
        $("#updateModal").modal("show");
        updateId = $(this).parent().prevAll().eq(5).html();
        $.ajax({
            url: '/curNews/' + updateId,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $("#unews_title").val(comTool.html_decode(data[0]['newstitle']));
                $("#unews_type").val(data[0]['newstype']);
                $("#unews_img").val(comTool.html_decode(data[0]['newsimg']));
                $("#unews_source").val(comTool.html_decode(data[0]['newssrc']));
                var temTime = moment(data[0]['newstime']);
                var ntime = temTime.tz('Asia/ShangHai').format('YYYY-MM-DD');
                $("#unews_time").val(ntime);
            }
        })
    });
    $("#updateModal #confirmUpdate").click(function () {

        if ($("#unews_title").val() == ''){
            alert("新闻标题不能为空！");
            return false;
        }

        if ($("#unews_img").val() == ''){
            alert("新闻图片不能为空！");
            return false;
        }

        if (updateId) {
            $.ajax({
                url: '/updateNews',
                type: 'POST',
                data: {
                    newsTitle: $("#unews_title").val(),
                    newsType: $("#unews_type").val(),
                    newsImg: $("#unews_img").val(),
                    newsTime: $("#unews_time").val(),
                    newsSrc: $("#unews_source").val(),
                    newsId: updateId
                },
                success: function (data) {
                    console.log(data);
                    $("#updateModal").modal("hide");
                    refreshNews('');
                }
            })
        }
    });


    //获取数据
    function refreshNews(type) {
        //清空数据
        newsTable.empty();
        $.ajax({
            url: '/news',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log("newstime== "  + JSON.stringify(data));
                $.each(data, function (index, item) {
                    var news_id = $("<td>").html(item['id']);
                    var type = NEWS_TYPE[item['newstype']];
                    var news_type = $("<td>").html(type);
                    var news_title = $("<td>").html(item['newstitle']);
                    var news_img = $("<td>").html(item['newsimg']);
                    var news_src = $("<td>").html(item['newssrc']);

                    var temTime = moment(item['newstime']);
                    var ntime = temTime.tz('Asia/ShangHai').format('YYYY-MM-DD');

                    var news_time = $("<td>").html(ntime);
                    var btn_box = $("<td>");
                    var btn_update = $("<button>").addClass("btn btn-primary btn-xs m-r-6").html("修改");
                    var btn_delete = $("<button>").addClass("btn btn-danger btn-xs").html("删除");
                    var row = $("<tr>");
                    btn_box.append(btn_update, btn_delete);
                    row.append(news_id, news_type, news_title, news_img, news_src, news_time, btn_box);
                    newsTable.append(row);
                });

            }
        })
    }


    //新闻列表手动刷新
    $("#btn_refresh").click(function () {
        refreshNews('');
    });


});
