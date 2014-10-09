drinkon.controller('vendorProductsController', function($scope, dbRepository)
{
  var _vendor_id = "1";

  dbRepository.getVendorProductsList(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });

  dbRepository.getVendorProductTypesList(_vendor_id, function(_error, _data)
  {
    $scope.product_types = _data.Data;
    console.log($scope.product_types);
  });


  $scope.newItem = function()
  {
    $('#__id').val("0");

    $scope.vendor_product_id = "";
    $scope.product_name = "";
    $scope.product_desc = "";
    $scope.product_type_id = null;

    $scope._vendor_product_id_ErrorMessage = "";
    $scope._product_name_ErrorMessage = "";
    $scope._product_type_id_ErrorMessage = "";

    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";
  }


  $scope.editItem = function(_item_id)
  {
    $scope._vendor_product_id_ErrorMessage = "";
    $scope._product_name_ErrorMessage = "";
    $scope._product_type_id_ErrorMessage = "";

    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";

    dbRepository.getVendorProductDetails(_item_id, function(_error, _data)
    {
      var itemData = _data.Data;

      $('#__id').val(itemData[0].id);
      
      $scope.vendor_product_id = itemData[0].vendor_product_id;
      $scope.product_name = itemData[0].product_name;
      $scope.product_desc = itemData[0].product_desc;

      $scope.product_type_id = $scope.product_types.filter(function (item)
      {
        return item.id == itemData[0].product_type_id;
      })[0];

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
    var __pt = "sys_products";

    var __vendor_product_id = $scope.vendor_product_id;
    var __product_name = $scope.product_name;
    var __product_desc = $scope.product_desc;

    var __product_type_id = "0";
    if ($scope.product_type_id != null)
    {
      __product_type_id = $scope.product_type_id.id;
    }
    
    var __is_active = document.getElementById("is_active").checked ? "1" : "0";
    var __is_fixed = "0";


    //Check if we have any mandatory fields missing
    $scope._vendor_product_id_ErrorMessage = "";
    $scope._product_name_ErrorMessage = "";
    $scope._product_type_id_ErrorMessage = "";
    
    var __canSaveData = 0;
    
    if (__vendor_product_id == "")
    {
      __canSaveData = __canSaveData + 1;
      $scope._vendor_product_id_ErrorMessage = "this field is mandatory";
    }

    //Check if the key value has already been used
    var _itemCount = 0;
    angular.forEach($scope.items,function(value,index)
    {
      if (__vendor_product_id == value.vendor_product_id && __id != value.id)
      {
        _itemCount = _itemCount + 1;
      }
    })

    if (_itemCount > 0)
    {
      __canSaveData = __canSaveData + 1;
      $scope._vendor_product_id_ErrorMessage = "this product id has already been used";
	}


    if (__product_name == "")
    {
      __canSaveData = __canSaveData + 1;
      $scope._product_name_ErrorMessage = "this field is mandatory";
    }

    //Check if the key value has already been used
    var _itemCount2 = 0;
    angular.forEach($scope.items,function(value,index)
    {
      if (__product_name == value.product_name && __id != value.id)
      {
        _itemCount2 = _itemCount2 + 1;
      }
    })

    if (_itemCount2 > 0)
    {
      __canSaveData = __canSaveData + 1;
      $scope._product_name_ErrorMessage = "this product name has already been used";
	}


    if (__product_type_id == "0")
    {
      __canSaveData = __canSaveData + 1;
      $scope._product_type_id_ErrorMessage = "you must choose a type";
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
      form_json += '"vendor_product_id": "' + __vendor_product_id + '",';
      form_json += '"product_name": "' + __product_name + '",';
      form_json += '"product_desc": "' + __product_desc + '",';
      form_json += '"product_type_id": "' + __product_type_id + '",';
      form_json += '"product_status_id": "1",';
      form_json += '"is_active": "' + __is_active + '", ';
      form_json += '"is_fixed": "' + __is_fixed + '" ';
      form_json += '}]}';

      var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=SET&t=".concat(form_json);

      $.ajax({
        type: "POST", url: url,
        success: function (data, text) {
          window.location.href="#details/vendor-products";
        },
        error: function (request, status, error) {
          console.log(error);
          window.location.href="#error";
        }
      });

    }

  };

});
