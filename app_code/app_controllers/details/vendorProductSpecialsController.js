drinkon.controller('vendorProductSpecialsController', function($scope, dbRepository)
{
//  var _vendor_id = "1";
  var _vendor_id = __cookie_vendor_id;

/*
  dbRepository.getVendorProductsList(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });
*/

  dbRepository.getVendorProductLinesList(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });

  dbRepository.getVendorProductTypesList(_vendor_id, function(_error, _data)
  {
    $scope.product_types = _data.Data;
    console.log($scope.product_types);
  });



});
