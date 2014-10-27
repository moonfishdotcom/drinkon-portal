drinkon.controller('vendorUsersController', function($scope, dbRepository)
{
//  var _vendor_id = "1";
  var _vendor_id = __cookie_vendor_id;
  
  dbRepository.getVendorUsers(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });

  dbRepository.getVendorPatterns(_vendor_id, function(_error, _data)
  {
    $scope.patterns = _data.Data;
    console.log($scope.patterns);
  });

  dbRepository.getVendorRolesList(_vendor_id, function(_error, _data)
  {
    $scope.roles = _data.Data;
    console.log($scope.roles);
  });


  $scope.newItem = function()
  {
    $('#__id').val("0");

    $scope.vendor_user_id = "";
    $scope.user_name = "";
    $scope.user_known_as = "";
    $scope.user_pattern = null;
    $scope.user_role = null;

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

      $scope.vendor_user_id = itemData[0].vendor_user_id;
      $scope.user_name = itemData[0].user_name;
      $scope.user_known_as = itemData[0].user_known_as;

      $scope.user_pattern = $scope.patterns.filter(function (item)
      {
        return item.id == itemData[0].user_pattern_id;
      })[0];

      $scope.user_role = $scope.roles.filter(function (role)
      {
        return role.id == itemData[0].user_role_id;
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
    var __pt = "sys_users";

    var __vendor_user_id = $scope.vendor_user_id;
    var __user_name = $scope.user_name;
    var __user_known_as = $scope.user_known_as;
    
    var __user_pattern_id = "0";
    if ($scope.user_pattern != null)
    {
      __user_pattern_id = $scope.user_pattern.id;
    }

    var __user_role_id = "0";
    if ($scope.user_role != null)
    {
      __user_role_id = $scope.user_role.id;
    }
	
    var __is_active = document.getElementById("is_active").checked ? "1" : "0";


    //Check if we have any mandatory fields missing
    $scope._vendor_user_id_ErrorMessage = "";
    $scope._user_name_ErrorMessage = "";
    $scope._user_pattern_ErrorMessage = "";
    $scope._user_role_ErrorMessage = "";
    
    var __canSaveData = 0;
    
    if (__vendor_user_id == "")
    {
      __canSaveData = __canSaveData + 1;
      $scope._vendor_user_id_ErrorMessage = "this field is mandatory";
    }

    //Check if the key value has already been used
    var _itemCount = 0;
    angular.forEach($scope.items,function(value,index)
    {
      if (__vendor_user_id == value.vendor_user_id && __id != value.id)
      {
        _itemCount = _itemCount + 1;
      }
    })

    if (_itemCount > 0)
    {
      __canSaveData = __canSaveData + 1;
      $scope._vendor_user_id_ErrorMessage = "this user id has already been used";
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

    if (__user_role_id == "0")
    {
      __canSaveData = __canSaveData + 1;
      $scope._user_role_ErrorMessage = "you must choose a role";
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
      form_json += '"user_role_id": "' + __user_role_id + '",';
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
