$(function() {

    //导入layui 的layer模块
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //实现对图片文件的选择，文件上传框是隐藏文本
    $('#btnChooseImage').on('click', function() {
        $('#file').click();
    })

    //获取图片
    $('#file').on('change', function(e) {
        var filelist = e.target.files;
        // console.log(filelist);
        if (filelist.length === 0) {
            return layer.msg('请选择照片');
        }

        //1.拿到用户上传的文件
        var file = e.target.files[0];
        //2.将文件转化为路径
        var imgURL = URL.createObjectURL(file);
        // console.log(imgURL);
        //3.重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //将裁剪好的图片上传到服务器
    $('#btnUpload').on('click', function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        //通过ajax将图片上传到服务器
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('头像上传失败');
                }
                layer.msg('头像上传成功');
                // 调用父级页面中的方法，重新渲染用户的头像
                window.parent.getUserInfo();
            }
        })
    })
})