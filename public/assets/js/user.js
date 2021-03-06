$('#userForm').on('submit', function () {
    var formData = $(this).serialize();

    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function () {
            location.reload();
        },
        error: function () {
            alert('用户添加失败')
        }
    });
    return false;
});

$('#modifyBox').on('change', '#avatar', function () {

    var formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response);

            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar)
        }
    });
});
// 想服务器端发送请求
$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        console.log(response);

        let html = template('userTpl', {
            data: response
        });

        $('#userBox').html(html)

    }
});
$('#userBox').on('click', '.edit', function () {

    let id = $(this).attr('data-id');
    $.ajax({
        type: "get",
        url: '/users/' + id,
        success: function (response) {
            // console.log(response);
            let html = template('modifyTpl', response);
            $('#modifyBox').html(html)
        }
    });
});
$('#modifyBox').on('submit', '#modifyForm', function () {

    var formData = $(this).serialize();

    var id = $(this).attr('data-id');

    $.ajax({
        type: "put",
        url: '/users/' + id,
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    return false;
});
// 删除功能
// 根据id获取元素加#!!!!!!!!!!!   根据class加.!!!!!!!!!!!
$('#userBox').on('click', '.delete', function () {
    if (confirm('是否删除')) {
        let id = $(this).attr('data-id')
        $.ajax({
            type: "delete",
            url: "/users/" + id,
            success: function (response) {
                location.reload()
            }
        });
    }
});
// 全选删除
let selectAll = $('#selectAll');

let deleteMany = $('#deleteMany');

selectAll.on('change', function () {
    var status = $(this).prop('checked');
    if (status) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    }
    $('#userBox').find('input').prop('checked', status)
});

$('#userBox').on('change', '#userStatus', function () {
    let inputs = $('#userBox').find('input');

    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true)
    } else {
        selectAll.prop('checked', false)

    };
    if (inputs.filter(':checked').length > 0) {
        deleteMany.show()
    } else {
        deleteMany.hide()

    }
});
// 批量删除功能
deleteMany.on('click', function () {
    let ids = [];
    // 获取选中用户
    let checkedUser = $('#userBox').find('input').filter(':checked');
    // 循环复选框  
    checkedUser.each(function (index, element) {
        ids.push($(element).attr('data-id'));
    });

    if (confirm('确定要批量删除吗')) {
        $.ajax({
            type: "delete",
            url: "/users/" + ids.join('-'),

            success: function () {
                location.reload();
            }
        });
    }
})