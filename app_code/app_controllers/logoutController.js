drinkon.controller('logoutController', function($scope, dbRepository)
{
//  var _vendor_id = "1";
  var _vendor_id = __cookie_vendor_id;
  
  $scope.userListIsDisabled = true;

  dbRepository.getVendorUsers(_vendor_id, function(_error, _data)
  {
    $scope.users = _data.Data;
    console.log($scope.users);
  });


  $scope.actionOnChange = function()
  {
    $scope.userListIsDisabled = true;
    
    var _action_id = $("#action_id").val();
    console.log(_action_id);

    //no action
    if (_action_id == null || _action_id == "")
    {
      $scope.userListIsDisabled = true;
    }

    //Unassign
    if (_action_id == "1")
    {
      $scope.userListIsDisabled = true;
    }

    //Reassign
    if (_action_id == "2")
    {
      $scope.userListIsDisabled = false;
    }

  }


  $scope.doLogout = function()
  {
    console.log("In doLogout");

    var __pt = "sys_order_headers";

    var __action_id = $("#action_id").val();
    var __user_id = $("#user_id").val();
    
    window.location.href='home.htm#/';
  }

});
