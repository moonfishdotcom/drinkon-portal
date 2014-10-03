drinkon.controller('socialReviewsController', function($scope, dbRepository)
{
  var _vendor_id = "1";

  dbRepository.getVendorReviewsList(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });

});
