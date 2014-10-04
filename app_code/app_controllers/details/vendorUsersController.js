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
