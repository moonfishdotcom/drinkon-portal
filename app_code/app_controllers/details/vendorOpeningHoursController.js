drinkon.controller('vendorOpeningHoursController', function($scope, dbRepository)
{





  $scope.editItem = function()
  {
//    $scope._vendor_product_id_ErrorMessage = "";
//    $scope._product_name_ErrorMessage = "";
//    $scope._product_type_id_ErrorMessage = "";

    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";
  }

});
