
if(location.href.indexOf('login.html')==-1){
  $.ajax({
    type:'get',
    url:'/employee/checkRootLogin',
    success:function (info) {
      if(info.error){
        location.href='login.html';
      }
    }
  })
}











$(function () {
  $(document).on('ajaxStart',function () {
    NProgress.start();
  });
  $(document).on('ajaxStop',function () { 
    setTimeout(function () {
      NProgress.done();
    },500)
   })
})