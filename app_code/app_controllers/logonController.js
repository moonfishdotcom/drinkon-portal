drinkon.controller('logonController', function($scope, dbRepository)
{
  document.cookie = "drinkon=; expires=Thu, 01 Jan 1970 00:00:00 GMT";


  $scope.actionItem = function()
  {
    console.log("In actionItem");

    var _cookie_data = "";
    var _user_id = "";
    var _vendor_id = "";
    
    if ($scope.loginUser == "vendor1")
    {
      console.log("Login as Vendor1");

      _user_id = "1";
      _vendor_id = "1";
    }

    if ($scope.loginUser == "vendor2")
    {
      console.log("Login as Vendor2");

      _user_id = "1";
      _vendor_id = "2";
    }

    _cookie_data = "" + _vendor_id + "";
    console.log(_cookie_data);

    document.cookie = "drinkon=" + _cookie_data + "; expires=Thu, 31 Dec 2020 00:00:00 GMT";  

    window.location.href='#dashboard';
  }


  $scope.cancelItem = function()
  {
    console.log("In cancelItem");

    $scope.loginUser = "";
    $scope.loginPass = "";
  }


});
