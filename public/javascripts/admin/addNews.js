/**
 * Created by CAN on 2016/10/7.
 */


$(function () {

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
            newsTitle: comTool.html_encode(newsTitle.val()),
            newsType: comTool.html_encode(newsType.val()),
            newsImg: comTool.html_encode(newsImg.val()),
            newsTime: comTool.html_encode(newsTime.val()),
            newsSrc: comTool.html_encode(newsSource.val())
        };

        $.ajax({
            url: '/addNews',
            type: 'POST',
            data: jsonNews,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                window.location.href = '/admin';
            }
        })
    });

});
