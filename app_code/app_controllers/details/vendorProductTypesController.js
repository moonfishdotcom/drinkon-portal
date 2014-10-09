drinkon.controller('vendorProductTypesController', function($scope, dbRepository)
{
  var _vendor_id = "1";

  dbRepository.getVendorProductTypesList(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });


  $scope.newItem = function()
  {
    $('#__id').val("0");

    $scope.product_type_name = "";

    $scope._product_type_name_ErrorMessage = "";

    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";
  }


  $scope.editItem = function(_item_id)
  {
    $scope._product_type_name_ErrorMessage = "";

    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";

    dbRepository.getVendorProductTypeDetails(_item_id, function(_error, _data)
    {
      var itemData = _data.Data;

      $('#__id').val(itemData[0].id);

      $scope.product_type_name = itemData[0].product_type_name;

      $('#is_active').prop('checked', itemData[0].is_active == 1 ? true : false);      
    });
  }


  $scope.cancelItem = function()
  {
    document.getElementById("pagePanel").style = "display:block;";
    document.getElementById("pageEditPanel").style = "display:none;";
  }


  $scope.saveItem = function()
  {
    var __id = $('#__id').val();
    var __pt = "sys_product_types";

    var __product_type_name = $scope.product_type_name;
    var __is_active = document.getElementById("is_active").checked ? "1" : "0";
    var __is_fixed = "0";

    //Check if we have any mandatory fields missing
    $scope._product_type_name_ErrorMessage = "";
    
    var __canSaveData = 0;

    if (__product_type_name == "")
    {
      __canSaveData = __canSaveData + 1;
      $scope._product_type_name_ErrorMessage = "this field is mandatory";
    }

    //Check if the key value has already been used
    var _itemCount = 0;
    angular.forEach($scope.items,function(value,index)
    {
      if (__product_type_name == value.product_type_name && __id != value.id)
      {
        _itemCount = _itemCount + 1;
      }
    })

    if (_itemCount > 0)
    {
      __canSaveData = __canSaveData + 1;
      $scope._product_type_name_ErrorMessage = "this type name has already been used";
	}


    //Save the data if we have no validation issues
    if (__canSaveData == 0)
    {
      //Build the json
      var form_json = '';
      form_json += '{"data": [{';
      form_json += '"id": "' + __id + '",';
      form_json += '"pt": "' + __pt + '",';
      form_json += '"vendor_id": "' + _vendor_id + '",';
      form_json += '"product_type_name": "' + __product_type_name + '",';
      form_json += '"is_active": "' + __is_active + '", ';
      form_json += '"is_fixed": "' + __is_fixed + '" ';
      form_json += '}]}';

      var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=SET&t=".concat(form_json);

      $.ajax({
        type: "POST", url: url,
        success: function (data, text) {
          window.location.href="#details/vendor-product-types";
        },
        error: function (request, status, error) {
          console.log(error);
          window.location.href="#error";
        }
      });
      
    }
    
  };

});
