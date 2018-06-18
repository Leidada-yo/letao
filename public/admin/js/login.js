$(function () {
  $('form').bootstrapValidator({
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:'用户名不能为空'
          },
          stringLength:{
            message:'密码为3-9位',
            min:3,
            max:9
          },
          callback:{
            message:'用户密码错误'
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:'用户密码不能为空',
          },
          stringLength:{
            min:6,
            max:12,
            message:'用户密码为6-12位'
          },
          callback:{
            message:'用户密码错误'
          }
        }
      }
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }
  });
  
  $('form').on('success.form.bv',function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data:$('form').serialize(),
      success: function (info) {
        if(info.success){
          location.href='index.html';
        };
        if(info.error===1000){
          $('form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }
        if(info.error===1001){
          $('form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
      }
    });
  });

  $('.btn_reset').on('click',function () {
    $('form').data('bootstrapValidator').resetForm();
  })
})