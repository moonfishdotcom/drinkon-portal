drinkon.controller('logoutController', function($scope, dbRepository)
{
  var _vendor_id = "1";
  
  dbRepository.getVendorUsers(_vendor_id, function(_error, _data)
  {
    $scope.users = _data.Data;
    console.log($scope.users);
  });


  $scope.actionOnChange = function()
  {
    $("#user_id").prop('disabled', true);
    
    var _action_id = $("#action_id").val();
    console.log(_action_id);

    //Unassign
    if (_action_id == "1")
    {
      $("#user_id").prop('disabled', true);
    }

    //Reassign
    if (_action_id == "2")
    {
      $("#user_id").prop('disabled', false);
    }

  }


  $scope.doLogout = function()
  {
    console.log("In doLogout");

    var __pt = "sys_order_headers";

    var __action_id = $("#action_id").val();
    var __user_id = $("#user_id").val();
    
    window.location.href='logon.htm';
  }

});
