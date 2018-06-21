$(function () {
  //发送ajax请求生成一级分类
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    success: function (info) {
      // console.log(info);
      $('.content-left').html(template('tpl', info));
      render(info.rows[0].id);
    }
  });

  $('.content-left').on('click', 'li', function () {
    $(this).addClass('now').siblings().removeClass('now');
    var id = $(this).data('id');
    render(id);
  })
})

//封装函数
function render(id) {
  $.ajax({
    type: 'get',
    url: '/category/querySecondCategory',
    data: {
      id: id
    },
    success: function (info) {
      // console.log(info);
      $('.content-right ul').html(template('tplsecond', info));

    }
  })
}