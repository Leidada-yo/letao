$(function () {
  var page=1;
  var pageSize=2;


  render();

  function render() { 
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function (info) { 
        // console.log(info);
        $('tbody').html(template('tpl',info));
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
          size:'small',
          onPageClicked:function (a,b,c,p) { 
            page=p;
            render();
           }
        })
       }
    })
   };

   $('.btn_add').on('click',function () { 
     $('.addmodal').modal('show');
    });

    //表单校验
    $('form').bootstrapValidator({
      feedbackIcons:{
        valid: 'glyphicon glyphicon-thumbs-up',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields:{
        categoryName:{
          validators:{
            notEmpty:{
              message:'一级分类名称不能为空'
            }
          }
        }
      }
    });

    $('form').on('success.form.bv',function (e) {
      e.preventDefault();
      //发送ajax请求
      $.ajax({
        type:'post',
        url:'/category/addTopCategory',
        data:$('form').serialize(),
        success:function (info) { 
          if(info.success){
            $('.addmodal').modal('hide');
            page=1;
            render();
            $('form').data('bootstrapValidator').resetForm(true);
          }
          
        }
      })
    })
})