$(function () {
    var baseUrl = 'http://localhost:3000';
    var queryUrl = baseUrl+'/users/getUsers';
    var addUserUrl = baseUrl+'/users/addUser';
    $.ajax({
        type:'get',
        url:queryUrl,
        async:true,
        dataType:'json',
        success:function (data) {
            console.log(data)
        },
        error:function (err) {
            console.log(err)
        }
    })


    $("#addUser").on('click',function () {
        var user = {
            usname:'路飞',
            age:28
        };
        $.ajax({
            type:'post',
            url:addUserUrl,
            async:true,
            data:user,
            dataType:'json',
            success:function (data) {
                console.log(data)
            },
            error:function (err) {
                console.log(err)
            }
        })
    });
});