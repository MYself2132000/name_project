//注意，这个函数是jquery帮我们封装好的
// 作用就是再每一次调用Ajax请求之前，对参数进行一些预处理
$.ajaxPrefilter(function(options) {
    //http://api-breakingnews-web.itheima.net
    //http://ajax.frontend.itheima.net
    //http://www.liulongbin.top:3007
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    //只有包含/my/的url才需要加token命令
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        };
    }

    // 全局挂载complete函数
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //清除token
            localStorage.removeItem('token');
            //跳转到登录页
            location.href = '/login.html';
        }
    }
})