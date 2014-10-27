drinkon.controller('vendorOpeningHoursController', function($scope, dbRepository)
{
//  var _vendor_id = "1";
  var _vendor_id = __cookie_vendor_id;

  dbRepository.getOpeningHours(function(_error, _data)
  {
    $scope.openinghours = _data.Data;
    console.log($scope.openinghours);
  });


  $scope.editItem = function()
  {
//    $scope._vendor_product_id_ErrorMessage = "";
//    $scope._product_name_ErrorMessage = "";
//    $scope._product_type_id_ErrorMessage = "";

    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";
  }


  $scope.cancelItem = function()
  {
    document.getElementById("pagePanel").style = "display:block;";
    document.getElementById("pageEditPanel").style = "display:none;";
  }


  $scope.saveItem = function()
  {

  }

});
