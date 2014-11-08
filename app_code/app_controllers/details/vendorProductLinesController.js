drinkon.controller('vendorProductLinesController', function($scope, dbRepository)
{
//  var _vendor_id = "1";
  var _vendor_id = __cookie_vendor_id;

  dbRepository.getVendorProductLinesList(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });

  dbRepository.getVendorProductsList(_vendor_id, function(_error, _data)
  {
    $scope.products = _data.Data;
    console.log($scope.products);
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
        $scope.product_measures.push({id:itemData[i].measure_id, product_measure_name:itemData[i].product_measure_name});
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
      return item.id == itemData[0].product_id;
    })[0];

    $scope.product_measure = $scope.product_measures.filter(function (item)
    {
      return item.id == itemData[0].product_measure_id;
    })[0];

    $scope.product_unit_price = itemData[0].product_unit_price;

    $scope.product_stock_id = itemData[0].product_stock_id;

    $('#is_active').prop('checked', itemData[0].is_active == 1 ? true : false);
  }


  $scope.productOnChange = function()
  {
    $("#product_measure_id").prop('disabled', false);
    $("#product_unit_price").prop('disabled', false);
    $("#product_stock_id").prop('disabled', false);

    var _product_id = "0";
    if ($scope.product != null)
    {
      _product_id = $scope.product.id;
	}

    $scope.fillMeasureList(_product_id);
  }
  

  $scope.newItem = function()
  {
    $('#__id').val("0");

    $scope.product = null;
    $scope.product_measure = null;
    $scope.product_unit_price = "";
    $scope.product_stock_id = "";

    $("#product_measure_id").prop('disabled', true);
    $("#product_unit_price").prop('disabled', true);
    $("#product_stock_id").prop('disabled', true);

    $scope._product_id_ErrorMessage = "";
    $scope._product_measure_id_ErrorMessage = "";
    $scope._product_unit_price_ErrorMessage = "";
    $scope._product_stock_id_ErrorMessage = "";
    
    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";
  }


  $scope.editItem = function(_item_id)
  {
    $scope._product_id_ErrorMessage = "";
    $scope._product_measure_id_ErrorMessage = "";
    $scope._product_unit_price_ErrorMessage = "";
    $scope._product_stock_id_ErrorMessage = "";

    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";

    dbRepository.getVendorProductLinePrices(_item_id, function(_error, _data)
    {
      $scope.line_prices = _data.Data;
      console.log($scope.line_prices);
    });

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

    var __vendor_id = _vendor_id;

    var __product_id = "0";    
    if ($scope.product != null)
    {
      __product_id = $scope.product.id;
	}

    var __product_measure_id = "0";
    if ($scope.product_measure != null)
    {
      __product_measure_id = $scope.product_measure.id;
	}

    var __product_unit_price = $scope.product_unit_price;

    var __product_stock_id = $scope.product_stock_id;

    var __is_active = document.getElementById("is_active").checked ? "1" : "0";

    //Check if we have any mandatory fields missing
    $scope._product_id_ErrorMessage = "";
    $scope._product_measure_id_ErrorMessage = "";
    $scope._product_unit_price_ErrorMessage = "";
    $scope._product_stock_id_ErrorMessage = "";
    
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

    if (__product_stock_id == "")
    {
      __canSaveData = __canSaveData + 1;
      $scope._product_stock_id_ErrorMessage = "this field is mandatory";
    }


    //Check if the key value has already been used
    var _itemCount = 0;
    angular.forEach($scope.items,function(value,index)
    {
      if (__product_id == value.product_id && __product_measure_id == value.product_measure_id && __id != value.id)
      {
        _itemCount = _itemCount + 1;
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
      form_json += '"vendor_id": "' + __vendor_id + '",';
      form_json += '"product_id": "' + __product_id + '",';
      form_json += '"product_measure_id": "' + __product_measure_id + '",';
      form_json += '"product_unit_price": "' + __product_unit_price + '",';
      form_json += '"product_stock_id": "' + "'" + __product_stock_id + "'" + '",';
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


  $scope.cancelPriceLine = function()
  {
    $scope.new_price_start = "";
    $scope.new_price_end = "";
    $scope.new_price = "";
    $scope.new_price_desc = "";
  }


  $scope.savePriceLine = function()
  {
    var __id = $('#__id').val();
    var __pt = "sys_product_line_prices";

    var __product_price_start = $scope.new_price_start;
    var __product_price_end = $scope.new_price_end;
    var __product_unit_price = $scope.new_price;
    var __product_price_desc = $scope.new_price_desc;

    //Check if we have any mandatory fields missing
    
    var __canSaveData = 0;

    //Save the data if we have no validation issues
    if (__canSaveData == 0)
    {
      //Build the json
      var form_json = '';
      form_json += '{"data": [{';
      form_json += '"id": "0",';
      form_json += '"pt": "' + __pt + '",';
      form_json += '"product_line_id": "' + __id + '",';
      form_json += '"product_price_start": "' + __product_price_start + '",';
      form_json += '"product_price_end": "' + __product_price_end + '",';
      form_json += '"product_unit_price": "' + __product_unit_price + '",';
      form_json += '"product_price_desc": "' + __product_price_desc + '" ';
      form_json += '}]}';

      var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=SET&t=".concat(form_json);

      $.ajax({
        type: "POST", url: url,
        success: function (data, text) {

          dbRepository.getVendorProductLinePrices(__id, function(_error, _data)
          {
            $scope.line_prices = _data.Data;
          });

          $scope.new_price_start = "";
          $scope.new_price_end = "";
          $scope.new_price = "";
          $scope.new_price_desc = "";

          //window.location.href="#details/vendor-product-lines";

        },
        error: function (request, status, error) {
          console.log(error);
          window.location.href="#error";
        }
      });

    }

  }


  $scope.deletePriceLine = function(_item_id)
  {
    console.log("Will delete id : ", _item_id);

    var __id = _item_id;
    var __pt = "sys_product_line_prices";

    var form_json = '';
    form_json += '{"data": [{';
    form_json += '"id": "' + __id + '",';
    form_json += '"pt": "' + __pt + '" ';
    form_json += '}]}';

    var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=DEL&t=".concat(form_json);

    $.ajax({
      type: "POST", url: url,
      success: function (data, text) {

        dbRepository.getVendorProductLinePrices(__id, function(_error, _data)
        {
          $scope.line_prices = _data.Data;
        });

      },
      error: function (request, status, error) {
        console.log(error);
        window.location.href="#error";
      }
    });

  }


});	
