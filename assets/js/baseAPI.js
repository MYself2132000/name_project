//注意，这个函数是jquery帮我们封装好的
// 作用就是再每一次调用Ajax请求之前，对参数进行一些预处理
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    console.log(options.url);
})