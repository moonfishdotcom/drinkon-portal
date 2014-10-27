drinkon.controller('vendorRolesController', function($scope, dbRepository)
{
  var _vendor_id = __cookie_vendor_id;

  dbRepository.getVendorRolesList(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });


  $scope.newItem = function()
  {
    $('#__id').val("0");

    $scope.role_name = "";

    $scope._role_name_ErrorMessage = "";

    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";
  }


  $scope.editItem = function(_item_id)
  {
    $scope._role_name_ErrorMessage = "";

    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";

    dbRepository.getVendorRolesDetails(_item_id, function(_error, _data)
    {
      var itemData = _data.Data;

      $('#__id').val(itemData[0].id);
      
      $scope.role_name = itemData[0].role_name;

      $('#is_can_see_orders').prop('checked', itemData[0].is_can_see_orders == 1 ? true : false);      
      $('#is_can_accept_orders').prop('checked', itemData[0].is_can_accept_orders == 1 ? true : false);      
      $('#is_can_complete_orders').prop('checked', itemData[0].is_can_complete_orders == 1 ? true : false);      

      $('#is_can_handle_stock').prop('checked', itemData[0].is_can_handle_stock == 1 ? true : false);      

      $('#is_administrator').prop('checked', itemData[0].is_administrator == 1 ? true : false);      

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
    var __pt = "sys_user_roles";

    var __role_name = $scope.role_name;

    var __is_can_see_orders = document.getElementById("is_can_see_orders").checked ? "1" : "0";
    var __is_can_accept_orders = document.getElementById("is_can_accept_orders").checked ? "1" : "0";
    var __is_can_complete_orders = document.getElementById("is_can_complete_orders").checked ? "1" : "0";
    var __is_can_handle_stock = document.getElementById("is_can_handle_stock").checked ? "1" : "0";
    var __is_administrator = document.getElementById("is_administrator").checked ? "1" : "0";
    
    var __is_active = document.getElementById("is_active").checked ? "1" : "0";


    //Check if we have any mandatory fields missing
    $scope._role_name_ErrorMessage = "";
    
    var __canSaveData = 0;
    
    if (__role_name == "")
    {
      __canSaveData = __canSaveData + 1;
      $scope._role_name_ErrorMessage = "this field is mandatory";
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
      form_json += '"role_name": "' + __role_name + '",';
      form_json += '"is_can_see_orders": "' + __is_can_see_orders + '", ';
      form_json += '"is_can_accept_orders": "' + __is_can_accept_orders + '", ';
      form_json += '"is_can_complete_orders": "' + __is_can_complete_orders + '", ';
      form_json += '"is_can_handle_stock": "' + __is_can_handle_stock + '", ';
      form_json += '"is_administrator": "' + __is_administrator + '", ';
      form_json += '"is_active": "' + __is_active + '" ';
      form_json += '}]}';

      var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=SET&t=".concat(form_json);

      $.ajax({
        type: "POST", url: url,
        success: function (data, text) {
          window.location.href="#details/vendor-roles";
        },
        error: function (request, status, error) {
          console.log(error);
          window.location.href="#error";
        }
      });

    }

  };



});
