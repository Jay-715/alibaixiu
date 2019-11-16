$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        console.log(response);
        let html = template('postsTpl', response);
        $('#postsBox').html(html);
        var page = template('pageTpl', response);
        $('#page').html(page);
    }
});


// 处理时间格式
function formateDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
};

function changePage(page) {
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page: page
        },
        success: function (response) {
            let html = template('postsTpl', response);
            $('#postsBox').html(html);
            let page = template('pageTpl', response);

        }
    });
};
console.log(page);

$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        console.log(response);
        let html = template('categoryTpl', {
            data: response
        });
        $('#categoryBox').html(html);
    }
});
$('#filterForm').on('submit', function () {
    let formData = $(this).serialize();

    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function (response) {
            let html = template('postsTpl', response);
            $('#postsBox').html(html);
            let page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
    return false;
})