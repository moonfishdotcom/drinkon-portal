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

    $('#vendor_product_id').val("");
    $('#product_name').val("");
    $('#product_desc').val("");
    $('#product_type_id').val("0");

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

      $('#__id').val(itemData[0].ruid);
      $('#vendor_product_id').val(itemData[0].vendor_product_id);
      $('#product_name').val(itemData[0].product_name);
      $('#product_desc').val(itemData[0].product_desc);
      $('#product_type_id').val(itemData[0].product_type_id);
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

    var __vendor_product_id = $("#vendor_product_id").val();
    var __product_name = $("#product_name").val();
    var __product_desc = $("#product_desc").val();
    var __product_type_id = $("#product_type_id").val();
    var __is_active = document.getElementById("is_active").checked ? "1" : "0";

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
    //TODO: We need to check if the id has already been used

    if (__product_name == "")
    {
      __canSaveData = __canSaveData + 1;
      $scope._product_name_ErrorMessage = "this field is mandatory";
    }
    //TODO: Do we need to check if the name has already been used

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
      form_json += '"is_active": "' + __is_active + '" ';
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
