var drinkon = angular.module('drinkon', ['ngRoute']);


/*
drinkon.service('dataService', function($http)
{
  this.getData = function(_item_id) {

    return $http({
      method: "GET",
      url: "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=dv_sys_users&i=2"
    });
  },

  this.getVendorDetails = function(_item_id)
  {
    return $http({
      method: "GET",
      url: "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=dv_sys_vendors&i=" + _item_id + ""
    });
  },

  this.getUserDetails = function(_item_id) {

    return $http({
      method: "GET",
      url: "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=dv_sys_users&i=" + _item_id + ""
    });
  }

});
*/

/*
 * In the controller
    $scope.data = null;
    dataService.getUserDetails(_item_id).then(function(dataResponse)
    {
      $scope.data = dataResponse;
      console.log($scope.data);
      console.log(dataResponse.data[0].user_known_as);
	});
*/


//Controllers
drinkon.controller('homeController', function($scope, dbRepository)
{

});


drinkon.controller('errorController', function($scope, dbRepository)
{

});


drinkon.controller('ordersController', function($scope, dbRepository)
{
  var _vendor_id = "1";
  
  dbRepository.getOrdersList(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });

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

drinkon.controller('orderAcceptController', function($scope, $location, dbRepository)
{
  var _user_id = "2";
	
  var _url = $location.absUrl();

  var _id = _url.substring(_url.lastIndexOf("/") + 1);

  dbRepository.getOrderDetails(_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });

  $scope.acceptOrder = function(_order_id)
  {
    var __id = _order_id;
    var __pt = "sys_order_header";
    var __status = "2";
    var __owner = _user_id;
  
    //Build the json
    var form_json = '';
    form_json += '{"data": [{';
    form_json += '"id": "' + __id + '",';
    form_json += '"pt": "' + __pt + '",';
    form_json += '"order_status_id": "' + __status + '",';
    form_json += '"order_owner_id": "' + __owner + '" ';
    form_json += '}]}';

    var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=SET&t=".concat(form_json);

    $.ajax({
      type: "POST", url: url,
      success: function (data, text) {
        window.location.href="#orders";
      },
      error: function (request, status, error) {
        window.location.href="#error";
     }
    });

  };

  
});

drinkon.controller('orderCompleteController', function($scope, $location, dbRepository)
{
  var _user_id = "2";

  var _url = $location.absUrl();

  var _id = _url.substring(_url.lastIndexOf("/") + 1);

  dbRepository.getOrderDetails(_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });

  $scope.completeOrder = function(_order_id)
  {
    var __id = _order_id;
    var __pt = "sys_order_header";
    var __status = "3";
    var __owner = _user_id;
  
    //Build the json
    var form_json = '';
    form_json += '{"data": [{';
    form_json += '"id": "' + __id + '",';
    form_json += '"pt": "' + __pt + '",';
    form_json += '"order_status_id": "' + __status + '",';
    form_json += '"order_owner_id": "' + __owner + '" ';
    form_json += '}]}';

    var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=SET&t=".concat(form_json);

    $.ajax({
      type: "POST", url: url,
      success: function (data, text) {
        window.location.href="#orders";
      },
      error: function (request, status, error) {
        window.location.href="#error";
      }
    });

  };

});


drinkon.controller('stockController', function($scope, dbRepository)
{
  var _vendor_id = "1";
  
  dbRepository.getStockList(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });

  $scope.stockTakeOff = function(_product_id)
  {
    var __id = _product_id;
    var __pt = "sys_products";
    var __status = "0";
  
    //Build the json
    var form_json = '';
    form_json += '{"data": [{';
    form_json += '"id": "' + __id + '",';
    form_json += '"pt": "' + __pt + '",';
    form_json += '"product_status_id": "' + __status + '" ';
    form_json += '}]}';

    var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=SET&t=".concat(form_json);

    $.ajax({
      type: "POST", url: url,
      success: function (data, text) {
        window.location.href="#stock";
      },
      error: function (request, status, error) {
        window.location.href="#error";
      }
    });
  };

  $scope.stockPutOn = function(_product_id)
  {
    var __id = _product_id;
    var __pt = "sys_products";
    var __status = "1";
  
    //Build the json
    var form_json = '';
    form_json += '{"data": [{';
    form_json += '"id": "' + __id + '",';
    form_json += '"pt": "' + __pt + '",';
    form_json += '"product_status_id": "' + __status + '" ';
    form_json += '}]}';

    var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=SET&t=".concat(form_json);

    $.ajax({
      type: "POST", url: url,
      success: function (data, text) {
        window.location.href="#stock";
      },
      error: function (request, status, error) {
        window.location.href="#error";
      }
    });
  };


});


drinkon.controller('socialController', function($scope, dbRepository)
{

});


drinkon.controller('detailsController', function($scope, dbRepository)
{

});

drinkon.controller('vendorDetailsController', function($scope, dbRepository)
{
  var _vendor_id = "1";

  dbRepository.getVendorDetails(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });

  $scope.editItem = function(_vendor_id)
  {
    $scope._vendor_name_ErrorMessage = "";
    $scope._location_id_ErrorMessage = "";

    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";

    dbRepository.getVendorDetails(_vendor_id, function(_error, _data)
    {
      var itemData = _data.Data;
      console.log(itemData);

      $('#__id').val(itemData[0].id);
      $('#vendor_name').val(itemData[0].vendor_name);
      $('#vendor_addr1').val(itemData[0].vendor_addr1);
      $('#vendor_addr2').val(itemData[0].vendor_addr2);
      $('#vendor_addr3').val(itemData[0].vendor_addr3);
      $('#vendor_addr4').val(itemData[0].vendor_addr4);
      $('#vendor_postcode').val(itemData[0].vendor_postcode);
      $('#vendor_phone').val(itemData[0].vendor_phone);
      $('#vendor_fax').val(itemData[0].vendor_fax);
      $('#vendor_email').val(itemData[0].vendor_email);
      $('#location_id').val(itemData[0].location_id);
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
    var __pt = "sys_vendors";

    var __vendor_name = $("#vendor_name").val();
    var __vendor_addr1 = $("#vendor_addr1").val();
    var __vendor_addr2 = $("#vendor_addr2").val();
    var __vendor_addr3 = $("#vendor_addr3").val();
    var __vendor_addr4 = $("#vendor_addr4").val();
    var __vendor_postcode = $("#vendor_postcode").val();
    var __vendor_phone = $("#vendor_phone").val();
    var __vendor_fax = $("#vendor_fax").val();
    var __vendor_email = $("#vendor_email").val();
    var __location_id = $("#location_id").val();

    //Check if we have any mandatory fields missing
    $scope._vendor_name_ErrorMessage = "";
    $scope._location_id_ErrorMessage = "";
    
    var __canSaveData = 0;
    
    if (__vendor_name == "")
    {
      __canSaveData = __canSaveData + 1;
      $scope._vendor_name_ErrorMessage = "this field is mandatory";
    }

    if (__location_id == "0")
    {
      __canSaveData = __canSaveData + 1;
      $scope._location_id_ErrorMessage = "you must choose a location";
    }


    //Save the data if we have no validation issues
    if (__canSaveData == 0)
    {
      //Build the json
      var form_json = '';
      form_json += '{"data": [{';
      form_json += '"id": "' + __id + '",';
      form_json += '"pt": "' + __pt + '",';
      form_json += '"vendor_name": "' + __vendor_name + '",';
      form_json += '"vendor_addr1": "' + __vendor_addr1 + '",';
      form_json += '"vendor_addr2": "' + __vendor_addr2 + '",';
      form_json += '"vendor_addr3": "' + __vendor_addr3 + '",';
      form_json += '"vendor_addr4": "' + __vendor_addr4 + '",';
      form_json += '"vendor_postcode": "' + __vendor_postcode + '",';
      form_json += '"vendor_phone": "' + __vendor_phone + '",';
      form_json += '"vendor_fax": "' + __vendor_fax + '",';
      form_json += '"vendor_email": "' + __vendor_email + '",';
      form_json += '"location_id": "' + __location_id + '"';
      form_json += '}]}';

      var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=SET&t=".concat(form_json);

      $.ajax({
        type: "POST", url: url,
        success: function (data, text) {
          window.location.href="#details/vendor-details";
        },
        error: function (request, status, error) {
          console.log(error);
          window.location.href="#error";
        }
      });
    
    }

  };

});

drinkon.controller('vendorDescriptionController', function($scope, dbRepository)
{
  var _vendor_id = "1";

  dbRepository.getVendorDescription(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });


  $scope.editItem = function(_vendor_id)
  {
    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";

    dbRepository.getVendorDescription(_vendor_id, function(_error, _data)
    {
      var itemData = _data.Data;
      console.log(itemData);

      $('#__id').val(itemData[0].id);
      $('#vendor_line1').val(itemData[0].vendor_line1);
      $('#vendor_line2').val(itemData[0].vendor_line2);
      $('#vendor_line3').val(itemData[0].vendor_line3);

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
    var __pt = "sys_vendors_description";

    var __vendor_line1 = $("#vendor_line1").val();
    var __vendor_line2 = $("#vendor_line2").val();
    var __vendor_line3 = $("#vendor_line3").val();

    //Build the json
    var form_json = '';
    form_json += '{"data": [{';
    form_json += '"id": "' + __id + '",';
    form_json += '"pt": "' + __pt + '",';
    form_json += '"vendor_line1": "' + __vendor_line1 + '",';
    form_json += '"vendor_line2": "' + __vendor_line2 + '",';
    form_json += '"vendor_line3": "' + __vendor_line3 + '"';
    form_json += '}]}';

    var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=SET&t=".concat(form_json);

    $.ajax({
      type: "POST", url: url,
      success: function (data, text) {
        window.location.href="#details/vendor-description";
      },
      error: function (request, status, error) {
        console.log(error);
        window.location.href="#error";
      }
    });
  };

});

drinkon.controller('vendorUsersController', function($scope, dbRepository)
{
  var _vendor_id = "1";
  
  dbRepository.getVendorUsers(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });

  $scope.newItem = function()
  {
    $('#__id').val("0");

    $('#vendor_user_id').val("");
    $('#user_name').val("");
    $('#user_known_as').val("");
    $('#user_pattern').val("0");

    $scope._vendor_user_id_ErrorMessage = "";
    $scope._user_name_ErrorMessage = "";
    $scope._user_pattern_ErrorMessage = "";
    
    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";
  }

  $scope.editItem = function(_item_id)
  {
    $scope._vendor_user_id_ErrorMessage = "";
    $scope._user_name_ErrorMessage = "";
    $scope._user_pattern_ErrorMessage = "";

    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";

    dbRepository.getVendorUserDetails(_item_id, function(_error, _data)
    {
      var itemData = _data.Data;

      $('#__id').val(itemData[0].id);
      $('#vendor_user_id').val(itemData[0].vendor_user_id);
      $('#user_name').val(itemData[0].user_name);
      $('#user_known_as').val(itemData[0].user_known_as);
      $('#user_pattern').val(itemData[0].user_pattern_id);
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
    var __pt = "sys_users";

    var __vendor_user_id = $("#vendor_user_id").val();
    var __user_name = $("#user_name").val();
    var __user_known_as = $("#user_known_as").val();
    var __user_pattern_id = $("#user_pattern").val();
    var __is_active = document.getElementById("is_active").checked ? "1" : "0";

    //Check if we have any mandatory fields missing
    $scope._vendor_user_id_ErrorMessage = "";
    $scope._user_name_ErrorMessage = "";
    $scope._user_pattern_ErrorMessage = "";
    
    var __canSaveData = 0;
    
    if (__vendor_user_id == "")
    {
      __canSaveData = __canSaveData + 1;
      $scope._vendor_user_id_ErrorMessage = "this field is mandatory";
    }
    
    if (__id == "0")
    {
      dbRepository.getVendorUserDetailsByVendorUserId(_vendor_id, __vendor_user_id, function(_error, _data)
      {
        var itemData = _data.Data;

        if (itemData.length > 0)
        {
          //If the length is greater than one then the id is already used.
          __canSaveData = __canSaveData + 1;
          $scope._vendor_user_id_ErrorMessage = "this user id has already been used";
        }
      });
    }

    if (__user_name == "")
    {
      __canSaveData = __canSaveData + 1;
      $scope._user_name_ErrorMessage = "this field is mandatory";
    }

    if (__user_known_as == "")
    {
      __user_known_as = __user_name;
    }

    if (__user_pattern_id == "0")
    {
      __canSaveData = __canSaveData + 1;
      $scope._user_pattern_ErrorMessage = "you must choose a pattern";
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
      form_json += '"vendor_user_id": "' + __vendor_user_id + '",';
      form_json += '"user_name": "' + __user_name + '",';
      form_json += '"user_known_as": "' + __user_known_as + '",';
      form_json += '"user_pattern_id": "' + __user_pattern_id + '",';
      form_json += '"is_active": "' + __is_active + '" ';
      form_json += '}]}';

      var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=SET&t=".concat(form_json);

      $.ajax({
        type: "POST", url: url,
        success: function (data, text) {
          window.location.href="#details/vendor-users";
        },
        error: function (request, status, error) {
          console.log(error);
          window.location.href="#error";
        }
      });

    }

  };
  
});

drinkon.controller('vendorPatternsController', function($scope, dbRepository)
{
  var _vendor_id = "1";

  dbRepository.getVendorPatterns(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });

  $scope.newItem = function()
  {
    $('#__id').val("0");

    $('#pattern_name').val("");

    $scope._pattern_name_ErrorMessage = "";

    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";
  }

  $scope.editItem = function(_item_id)
  {
    $scope._pattern_name_ErrorMessage = "";

    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";

    dbRepository.getVendorPatternDetails(_item_id, function(_error, _data)
    {
      var itemData = _data.Data;

      $('#__id').val(itemData[0].ruid);
      $('#pattern_name').val(itemData[0].pattern_name);
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
    var __pt = "sys_user_patterns";

    var __pattern_name = $("#pattern_name").val();
    var __is_active = document.getElementById("is_active").checked ? "1" : "0";

    //Check if we have any mandatory fields missing
    $scope._pattern_name_ErrorMessage = "";
    
    var __canSaveData = 0;
    
    if (__pattern_name == "")
    {
      __canSaveData = __canSaveData + 1;
      $scope._pattern_name_ErrorMessage = "this field is mandatory";
    }

    if (__id == "0")
    {
      dbRepository.getVendorPatternDetailsByName(_vendor_id, __pattern_name, function(_error, _data)
      {
        var itemData = _data.Data;

        if (itemData.length > 0)
        {
          //If the length is greater than one then the id is already used.
          __canSaveData = __canSaveData + 1;
          $scope._pattern_name_ErrorMessage = "this pattern name has already been used";
        }
      });
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
      form_json += '"pattern_name": "' + __pattern_name + '",';
      form_json += '"is_active": "' + __is_active + '" ';
      form_json += '}]}';

      var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=SET&t=".concat(form_json);

      $.ajax({
        type: "POST", url: url,
        success: function (data, text) {
          window.location.href="#details/vendor-patterns";
        },
          error: function (request, status, error) {
          console.log(error);
          window.location.href="#error";
        }
      });
    
    }

  };

});

drinkon.controller('vendorRolesController', function($scope, dbRepository)
{

});

drinkon.controller('vendorLocationController', function($scope, dbRepository)
{

});

drinkon.controller('vendorAccountsController', function($scope, dbRepository)
{

});

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

drinkon.controller('vendorProductLinesController', function($scope, dbRepository)
{
  var _vendor_id = "1";
  
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

//TODO: Change this to use the angular ng-disable/enable    
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

drinkon.controller('vendorProductMeasuresController', function($scope, dbRepository)
{
  var _vendor_id = "1";

  dbRepository.getVendorProductMeasuresList(_vendor_id, function(_error, _data)
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

    $('#product_type_id').val("0");
    $('#product_measure_name').val("");

    $scope._product_type_id_ErrorMessage = "";
    $scope._product_measure_name_ErrorMessage = "";

    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";
  }

  $scope.editItem = function(_item_id)
  {
    $scope._product_type_id_ErrorMessage = "";
    $scope._product_measure_name_ErrorMessage = "";

    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";

    dbRepository.getVendorProductMeasureDetails(_item_id, function(_error, _data)
    {
      var itemData = _data.Data;

      $('#__id').val(itemData[0].ruid);
      $('#product_type_id').val(itemData[0].product_type_id);
      $('#product_measure_name').val(itemData[0].product_measure_name);
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
    var __pt = "sys_product_measures";

    var __product_type_id = $("#product_type_id").val();
    var __product_measure_name = $("#product_measure_name").val();
    var __is_active = document.getElementById("is_active").checked ? "1" : "0";

    //Check if we have any mandatory fields missing
    $scope._product_type_id_ErrorMessage = "";
    $scope._product_measure_name_ErrorMessage = "";
    
    var __canSaveData = 0;
    
    if (__product_type_id == "0")
    {
      __canSaveData = __canSaveData + 1;
      $scope._product_type_id_ErrorMessage = "you must choose a type";
    }

    if (__product_measure_name == "")
    {
      __canSaveData = __canSaveData + 1;
      $scope._product_measure_name_ErrorMessage = "this field is mandatory";
    }
    //TODO: We need to check if the name has already been used

    //Save the data if we have no validation issues
    if (__canSaveData == 0)
    {
      //Build the json
      var form_json = '';
      form_json += '{"data": [{';
      form_json += '"id": "' + __id + '",';
      form_json += '"pt": "' + __pt + '",';
      form_json += '"vendor_id": "' + _vendor_id + '",';
      form_json += '"product_type_id": "' + __product_type_id + '",';
      form_json += '"product_measure_name": "' + __product_measure_name + '",';
      form_json += '"is_active": "' + __is_active + '" ';
      form_json += '}]}';

      var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=SET&t=".concat(form_json);

      $.ajax({
        type: "POST", url: url,
        success: function (data, text) {
          window.location.href="#details/vendor-product-measures";
        },
        error: function (request, status, error) {
          console.log(error);
          window.location.href="#error";
        }
      });
      
    }
  };

});

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

    $('#product_type_name').val("");

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

      $('#__id').val(itemData[0].ruid);
      $('#product_type_name').val(itemData[0].product_type_name);
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

    var __vendor_user_id = $("#vendor_user_id").val();
    var __product_type_name = $("#product_type_name").val();
    var __is_active = document.getElementById("is_active").checked ? "1" : "0";

    //Check if we have any mandatory fields missing
    $scope._product_type_name_ErrorMessage = "";
    
    var __canSaveData = 0;

    if (__product_type_name == "")
    {
      __canSaveData = __canSaveData + 1;
      $scope._product_type_name_ErrorMessage = "this field is mandatory";
    }
    //TODO: We need to check if the name has already been used

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
      form_json += '"is_active": "' + __is_active + '" ';
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

drinkon.controller('vendorReportsController', function($scope, dbRepository)
{

});

drinkon.controller('vendorSocialController', function($scope, dbRepository)
{

});


drinkon.controller('socialNotificationsController', function($scope, dbRepository)
{

});

drinkon.controller('socialReviewsController', function($scope, dbRepository)
{
  var _vendor_id = "1";

  dbRepository.getVendorReviewsList(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });

});


drinkon.controller('logoutController', function($scope, dbRepository)
{
  var _vendor_id = "1";
  
  dbRepository.getVendorUsers(_vendor_id, function(_error, _data)
  {
    $scope.users = _data.Data;
    console.log($scope.users);
  });

  $scope.actionOnChange = function()
  {
    $("#user_id").prop('disabled', true);
    
    var _action_id = $("#action_id").val();
    console.log(_action_id);

    //Unassign
    if (_action_id == "1")
    {
      $("#user_id").prop('disabled', true);
    }

    //Reassign
    if (_action_id == "2")
    {
      $("#user_id").prop('disabled', false);
    }

  }

  $scope.doLogout = function()
  {
    console.log("In doLogout");

    var __pt = "sys_order_headers";

    var __action_id = $("#action_id").val();
    var __user_id = $("#user_id").val();
  }

});



//Db function factory
drinkon.factory('dbRepository', function($http)
{
  return {

    getOrderDetails: function(_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_orders.php?v=GET&s=ORDER&q=" + _id + "";

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getOrdersList: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_orders.php?v=GET&s=ALL&q=" + _vendor_id + ""
	  
      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },


    getStockList: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_products_with_types&i=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },


    getVendorDetails: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_vendors_with_location&i=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorDescription: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_vendors_description&i=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorPatterns: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_vendor_patterns&i=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorPatternDetails: function(_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_vendor_patterns&s1=ruid&s2=" + _id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorPatternDetailsByName: function(_vendor_id, _pattern_name, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_vendor_patterns&s1=id&s2=" + _vendor_id + "&s3=pattern_name&s4='" + _pattern_name + "' "

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductsList: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_products_with_types&i=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductDetails: function(_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_products_with_types&s1=ruid&s2=" + _id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductLinesList: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_product_lines_with_descs&s1=vendor_id&s2=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductLineDetails: function(_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_product_lines_with_descs&s1=id&s2=" + _id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductMeasuresList: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_product_measures_with_types&i=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductMeasuresListByTypeId: function(_type_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_product_measures_with_types&s1=product_type_id&s2=" + _type_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductMeasuresListByProductId: function(_product_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_products_with_measures&s1=product_id&s2=" + _product_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductMeasureDetails: function(_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_product_measures_with_types&s1=ruid&s2=" + _id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductTypesList: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=dv_sys_product_types&i=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductTypeDetails: function(_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=dv_sys_product_types&s1=ruid&s2=" + _id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorReviewsList: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_customer_reviews&s1=vendor_id&s2=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorUsers: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_users_with_patterns&i=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorUserDetails: function(_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=dv_sys_users&i=" + _id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorUserDetailsByVendorUserId: function(_vendor_id, _vendor_user_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=dv_sys_users&s1=vendor_id&s2=" + _vendor_id + "&s3=vendor_user_id&s4=" + _vendor_user_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    }
    

  };
});


//Routing
drinkon.config(function($routeProvider) {
$routeProvider

  .when('/', {
	templateUrl: 'app_pages/dashboard.htm',
	controller: 'homeController'
  })

  .when('/error', {
	templateUrl: 'app_pages/error.htm',
	controller: 'errorController'
  })


  .when('/orders', {
	templateUrl: 'app_pages/orders.htm',
	controller: 'ordersController'
  })

  .when('/orders/accept/:id', {
	templateUrl: 'app_pages/orders/order-accept.htm',
	controller: 'orderAcceptController'
  })

  .when('/orders/complete/:id', {
	templateUrl: 'app_pages/orders/order-complete.htm',
	controller: 'orderCompleteController'
  })


  .when('/stock', {
	templateUrl: 'app_pages/stock.htm',
	controller: 'stockController'
  })


  .when('/products', {
	templateUrl: 'app_pages/products.htm',
	controller: 'productsController'
  })


  .when('/social', {
	templateUrl: 'app_pages/social.htm',
	controller: 'socialController'
  })

  .when('/social/social-notifications', {
	templateUrl: 'app_pages/social/social-notifications.htm',
	controller: 'socialNotificationsController'
  })

  .when('/social/social-reviews', {
	templateUrl: 'app_pages/social/social-reviews.htm',
	controller: 'socialReviewsController'
  })


  .when('/details', {
	templateUrl: 'app_pages/details.htm',
	controller: 'detailsController'
  })

  .when('/details/vendor-accounts', {
	templateUrl: 'app_pages/details/vendor-accounts.htm',
	controller: 'vendorAccountsController'
  })

  .when('/details/vendor-details', {
	templateUrl: 'app_pages/details/vendor-details.htm',
	controller: 'vendorDetailsController'
  })

  .when('/details/vendor-description', {
	templateUrl: 'app_pages/details/vendor-description.htm',
	controller: 'vendorDescriptionController'
  })

  .when('/details/vendor-location', {
	templateUrl: 'app_pages/details/vendor-location.htm',
	controller: 'vendorLocationController'
  })

  .when('/details/vendor-patterns', {
	templateUrl: 'app_pages/details/vendor-patterns.htm',
	controller: 'vendorPatternsController'
  })

  .when('/details/vendor-products', {
	templateUrl: 'app_pages/details/vendor-products.htm',
	controller: 'vendorProductsController'
  })

  .when('/details/vendor-product-lines', {
	templateUrl: 'app_pages/details/vendor-product-lines.htm',
	controller: 'vendorProductLinesController'
  })

  .when('/details/vendor-product-measures', {
	templateUrl: 'app_pages/details/vendor-product-measures.htm',
	controller: 'vendorProductMeasuresController'
  })

  .when('/details/vendor-product-types', {
	templateUrl: 'app_pages/details/vendor-product-types.htm',
	controller: 'vendorProductTypesController'
  })

  .when('/details/vendor-reports', {
	templateUrl: 'app_pages/details/vendor-reports.htm',
	controller: 'vendorReportsController'
  })

  .when('/details/vendor-roles', {
	templateUrl: 'app_pages/details/vendor-roles.htm',
	controller: 'vendorRolesController'
  })

  .when('/details/vendor-social', {
	templateUrl: 'app_pages/details/vendor-social.htm',
	controller: 'vendorSocialController'
  })

  .when('/details/vendor-users', {
	templateUrl: 'app_pages/details/vendor-users.htm',
	controller: 'vendorUsersController'
  })


  .when('/logout', {
	templateUrl: 'app_pages/logout.htm',
	controller: 'logoutController'
  });


});
