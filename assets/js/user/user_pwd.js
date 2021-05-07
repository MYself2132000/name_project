$(function() {
    //导入layui中的form模块
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        //用来判断是否符合密码的格式要求
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        //用来判断新密码是否同旧密码一致
        //value值是为当前添加的表单的值
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能一样!';
            }
        },
        //用来校验两次密码是否一致
        rePwd: function(value) {
            if (value !== $('[name=rePwd]').val()) {
                return '两次密码不一致';
            }
        }
    });



    //修改密码
    $('.layui-form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('密码修改失败');
                }
                layer.msg('密码修改成功');
                //修改成功之后，清空密码
                // $('[type=password]').val('');
                //可以使用原生的js，将jquery对象转换为dom对象之后，使用原生的form表单中的reset方法，实现表单重置
                $('.layui-form')[0].reset();
            }
        })
    })
})