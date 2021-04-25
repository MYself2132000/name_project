//定义入口函数
$(function() {
    getUserInfo();
})

//引入layui的layer模块
var layer = layui.layer;
// 退出登录
$("#btnLogout").on('click', function() {

    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        //点击退出登录的时候，要做两件事情
        // 1.要清空本地的token值
        localStorage.removeItem('token');
        // 2.跳转道登录页面
        location.href = '/login.html';

        //layui
        layer.close(index);
    });
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        //因为需要添加token命令的请求较多，我们可以写入ajaxPrefilter函数中
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            // 获取用户信息成功之后，我们调用一个渲染用户头像的函数,并将用户信息传递过去
            renderAvatar(res.data);
        },
        // 无论成功还是失败，都会调用这个函数
        //防止用户没有登录就进入后台
        // complete: function(res) {
        //     console.log(res);
        //     // console.log('ok');
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //清除token
        //         localStorage.removeItem('token');
        //         //跳转到登录页
        //         location.href = '/login.html';
        //     }
        // }
    })
}

//渲染用户头像
function renderAvatar(user) {
    //如果用户有昵称，优先使用昵称，如果没有昵称，就使用用户名
    var name = user.nickname || user.username;
    //将用户名渲染页面中
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name);
    //渲染头像
    if (user.user_pic) {
        //不为空，说明有头像，优先渲染头像
        $(".layui-nav-img").attr('src', user.user_pic).show();
        //将文字头像隐藏
        $(".text-avatar").hide();
    } else {
        //头像为空，则使用用户名第一个字符渲染
        //隐藏图片头像
        $(".layui-nav-img").hide();
        //将昵称字符串作为数组去除第一个值，转为大写
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}