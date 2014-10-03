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
