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