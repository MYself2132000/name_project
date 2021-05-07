$(function() {
    //获取layui中的内置模块
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间';
            }
        }
    })


    initUserInfo();
    //获取用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                // console.log(res);
                //使用layui为表单快速赋值取值
                form.val('formUserInfo', res.data);
            }
        })
    }

    //重置表单
    $('#btnReset').on('click', function(e) {
        //阻止了默认行为之后
        e.preventDefault();
        //调用初始化用户信息函数
        initUserInfo();
    })

    //提交
    $(".layui-form").submit(function(e) {
        e.preventDefault();
        //拿到表单的数据
        var data = form.val('formUserInfo');
        console.log(data);
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息更新失败');
                }
                layer.msg('用户信息更新成功');
                //重新渲染用户信息
                initUserInfo();
                //调用父级页面index.html中的方法
                window.parent.getUserInfo();
            }

        })
    })


})