//分类管理
$(function () {
  $('.navs li:nth-child(2) a').on('click',function () {
    $('.navs .children').stop().slideToggle();
  });

  $('.icon_menu').on('click',function () {
    $('.lt_aside').toggleClass('now');
    $('.lt_main').toggleClass('now');
  })

  //注册模态框事件
  $('.icon_logout').on('click',function () {
    $('.modal').modal('show');
  })
});

$('.btn_logout').on('click',function () {
  $.ajax({
    type:'get',
    url:'/employee/employeeLogout',
    success:function (info) {
      if(info.success){
        location.href='login.html';
      }
    }
  })
})