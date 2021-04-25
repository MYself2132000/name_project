$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //从layui 中获取form对象
    var form = layui.form;
    //从layui 中获取layer对象
    var layer = layui.layer;
    //通过form.verify()函数自定义校验规则
    form.verify({
        //自定义了一个叫做pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //在定义一个校验规则，用于两次密码一直性的判断
        //使用这种方式进行校验判断，传进去的形参是使用者的值
        repwd: function(value) {
            //通过属性选择器，得到第一次输入的密码的值
            var pwd = $(".reg-box [name=password]").val();
            if (pwd !== value)
                return '两次输入的密码不一致';
        }
    });




    //注册功能的实现
    $("#form_reg").on('submit', function(e) {
        //阻止页面的默认跳转
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        };
        $.post('/api/reguser', data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //注册成功的话，提示用户
                layer.msg('注册成功，请登录');
                //使用程序，模仿人的点击去登陆行为
                $("#link_login").click();
            }
        )
    });

    // 登录
    $("#form_login").submit('click', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！');
                }
                layer.msg('登录成功');
                //将服务器拿到的token值暂存到localStorage中
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        });
    });


})