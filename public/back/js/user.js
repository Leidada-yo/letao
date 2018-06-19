$(function () {
  //设置全局变量
  var page=1;
  var pageSize=8;
  //页面加载时发送ajax请求；
  render();
  //封装ajax请求
  function render(){
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function (info) { 
        //生成td
        $('table tbody').html(template('tpl',info));
        //生成分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
          size:'small',
          onPageClicked:function (a,b,c,p) { 
            page=p,
            render();
           }
        });
       }
    })
  };
  //注册禁用启用事件
  $('tbody').on('click','.btn',function () { 
    $('.usermodal').modal('show');
    var id=$(this).parent().data('id');
    var isDelete=$(this).hasClass('btn-success')?1:0;
    $('.btn_update').off().on('click',function () {
      $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function (info) {
          if(info.success){
            $('.usermodal').modal('hide');
            render();
          }
          
        }
      })
    })
   })
})