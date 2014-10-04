drinkon.controller('vendorProductLinesController', function($scope, dbRepository)
{
  var _vendor_id = "1";
  
  dbRepository.getVendorProductsList(_vendor_id, function(_error, _data)
  {
    $scope.products = _data.Data;
    console.log($scope.products);
  });

  dbRepository.getVendorProductLinesList(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });

  dbRepository.getVendorProductMeasuresList(_vendor_id, function(_error, _data)
  {
    $scope.product_measures = _data.Data;
    console.log($scope.product_measures);
  });


  $scope.fillMeasureList = function(_product_id, cb)
  {
    dbRepository.getVendorProductMeasuresListByProductId(_product_id, function(_error, _data)
    {
      var itemData = _data.Data;
      console.log(itemData);
      
      //Push the items into the list
      $scope.product_measures.splice(0,999);

      for (i = 0; i < itemData.length; i++)
      {
        $scope.product_measures.push({ruid:itemData[i].measure_id, product_measure_name:itemData[i].product_measure_name});
        console.log(itemData[i].measure_id);
        console.log(itemData[i].product_measure_name);
      }
      
      if (cb)
      {
        cb(_error);
      }
      
    });
  }
  

  $scope.setDataFieldsOnEdit = function(itemData)
  {
    $('#__id').val(itemData[0].id);

    $scope.product = $scope.products.filter(function (item)
    {
      return item.ruid == itemData[0].product_id;
    })[0];

    $scope.product_measure = $scope.product_measures.filter(function (item)
    {
      return item.ruid == itemData[0].product_measure_id;
    })[0];

    $scope.product_unit_price = itemData[0].product_unit_price;

    $('#is_active').prop('checked', itemData[0].is_active == 1 ? true : false);
  }


  $scope.productOnChange = function()
  {
    $("#product_measure_id").prop('disabled', false);
    $("#product_unit_price").prop('disabled', false);

    var _product_id = "0";
    if ($scope.product != null)
    {
      _product_id = $scope.product.ruid;
	}

    $scope.fillMeasureList(_product_id);
  }
  

  $scope.newItem = function()
  {
    $('#__id').val("0");

    $scope.product = null;
    $scope.product_measure = null;
    $scope.product_unit_price = "";

    $("#product_measure_id").prop('disabled', true);
    $("#product_unit_price").prop('disabled', true);

    $scope._product_id_ErrorMessage = "";
    $scope._product_measure_id_ErrorMessage = "";
    $scope._product_unit_price_ErrorMessage = "";
    
    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";
  }


  $scope.editItem = function(_item_id)
  {
    $scope._product_id_ErrorMessage = "";
    $scope._product_measure_id_ErrorMessage = "";
    $scope._product_unit_price_ErrorMessage = "";

    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";

    dbRepository.getVendorProductLineDetails(_item_id, function(_error, _data)
    {
      var itemData = _data.Data;

      $scope.fillMeasureList(itemData[0].product_id, function(_err)
      {
        $scope.setDataFieldsOnEdit(itemData);
      });
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
    var __pt = "sys_product_lines";

    var __product_id = "0";    
    if ($scope.product != null)
    {
      __product_id = $scope.product.ruid;
	}

    var __product_measure_id = "0";
    if ($scope.product_measure != null)
    {
      __product_measure_id = $scope.product_measure.ruid;
	}

    var __product_unit_price = $scope.product_unit_price;

    var __is_active = document.getElementById("is_active").checked ? "1" : "0";

    //Check if we have any mandatory fields missing
    $scope._product_id_ErrorMessage = "";
    $scope._product_measure_id_ErrorMessage = "";
    $scope._product_unit_price_ErrorMessage = "";
    
    var __canSaveData = 0;
    
    if (__product_id == "0")
    {
      __canSaveData = __canSaveData + 1;
      $scope._product_id_ErrorMessage = "you must choose a product";
    }

    if (__product_measure_id == "0")
    {
      __canSaveData = __canSaveData + 1;
      $scope._product_measure_id_ErrorMessage = "you must choose a measure";
    }

    if (__product_unit_price == "")
    {
      __canSaveData = __canSaveData + 1;
      $scope._product_unit_price_ErrorMessage = "this field is mandatory";
    }

    if (isNaN(__product_unit_price) == true)
    {
      __canSaveData = __canSaveData + 1;
      $scope._product_unit_price_ErrorMessage = "this field is not a number";
    }

    if (parseFloat(__product_unit_price) <= 0)
    {
      __canSaveData = __canSaveData + 1;
      $scope._product_unit_price_ErrorMessage = "this field must be greater than zero";
    }

    //Check if the key value has already been used
    var _itemCount = 0;
    angular.forEach($scope.items,function(value,index)
    {
      if (__product_id == value.product_id && __product_measure_id == value.product_measure_id && __id != value.id)
      {
        _itemCount = _itemCount + 1;
      console.log("In field:",__product_id);
      console.log("In array:",value.product_id);
      console.log("In field:",__product_measure_id);
      console.log("In array:",value.product_measure_id);
      }
    })

    if (_itemCount > 0)
    {
      __canSaveData = __canSaveData + 1;
      $scope._product_measure_id_ErrorMessage = "this measure name has already been used with this product";
	}


    //Save the data if we have no validation issues
    if (__canSaveData == 0)
    {
      //Build the json
      var form_json = '';
      form_json += '{"data": [{';
      form_json += '"id": "' + __id + '",';
      form_json += '"pt": "' + __pt + '",';
      form_json += '"product_id": "' + __product_id + '",';
      form_json += '"product_measure_id": "' + __product_measure_id + '",';
      form_json += '"product_unit_price": "' + __product_unit_price + '",';
      form_json += '"is_active": "' + __is_active + '" ';
      form_json += '}]}';

      var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=SET&t=".concat(form_json);

      $.ajax({
        type: "POST", url: url,
        success: function (data, text) {
          window.location.href="#details/vendor-product-lines";
        },
        error: function (request, status, error) {
          console.log(error);
          window.location.href="#error";
        }
      });

    }
    
  };

});	
