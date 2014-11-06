drinkon.controller('vendorPatternsController', function($scope, dbRepository)
{
//  var _vendor_id = "1";
  var _vendor_id = __cookie_vendor_id;

  dbRepository.getVendorPatterns(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });


  $scope.newItem = function()
  {
    $('#__id').val("0");

    $scope.vendor_pattern_id = "";
    $scope.pattern_name = "";

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

      $('#__id').val(itemData[0].id);

      $scope.vendor_pattern_id = itemData[0].vendor_pattern_id;
      $scope.pattern_name = itemData[0].pattern_name;

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

    var __vendor_pattern_id = $scope.vendor_pattern_id;
    var __pattern_name = $scope.pattern_name;
    var __is_active = document.getElementById("is_active").checked ? "1" : "0";

    //Check if we have any mandatory fields missing
    $scope._pattern_name_ErrorMessage = "";
    
    var __canSaveData = 0;
    var _itemCount = 0;


    if (__vendor_pattern_id == "")
    {
      __canSaveData = __canSaveData + 1;
      $scope._vendor_pattern_id_ErrorMessage = "this field is mandatory";
    }

    //Check if the key value has already been used
    angular.forEach($scope.items,function(value,index)
    {
      if (__vendor_pattern_id == value.vendor_pattern_id && __id != value.id)
      {
        _itemCount = _itemCount + 1;
      }
    })

    if (_itemCount > 0)
    {
      __canSaveData = __canSaveData + 1;
      $scope._vendor_pattern_id_ErrorMessage = "this pattern id has already been used";
	}

    
    if (__pattern_name == "")
    {
      __canSaveData = __canSaveData + 1;
      $scope._pattern_name_ErrorMessage = "this field is mandatory";
    }

    //Check if the key value has already been used
    _itemCount = 0;
    angular.forEach($scope.items,function(value,index)
    {
      if (__pattern_name == value.pattern_name && __id != value.id)
      {
        _itemCount = _itemCount + 1;
      }
    })

    if (_itemCount > 0)
    {
      __canSaveData = __canSaveData + 1;
      $scope._pattern_name_ErrorMessage = "this pattern name has already been used";
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
      form_json += '"vendor_pattern_id": "' + "'" + __vendor_pattern_id + "'" + '",';
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
