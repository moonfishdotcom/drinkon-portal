drinkon.controller('ordersController', function($scope, dbRepository)
{
//  var _vendor_id = "1";
  var _vendor_id = __cookie_vendor_id;

  dbRepository.getOrdersList(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });

//  dbRepository.getVendorUsers(_vendor_id, function(_error, _data)
//  {
//    $scope.users = _data.Data;
//    console.log($scope.users);
//  });


  $scope.moveAcceptOrder = function(_order_id)
  {
    console.log(_order_id);
    window.location.href="#orders/accept/" + _order_id + "";
  };


  $scope.moveCompleteOrder = function(_order_id)
  {
    console.log(_order_id);
    window.location.href="#orders/complete/" + _order_id + "";
  };

});
