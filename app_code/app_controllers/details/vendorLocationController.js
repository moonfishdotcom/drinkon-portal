drinkon.controller('vendorLocationController', function($scope, dbRepository)
{
//  var _vendor_id = "1";
  var _vendor_id = __cookie_vendor_id;

  dbRepository.getVendorLocation(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });


  $scope.editItem = function(_vendor_id)
  {
    $scope._location_long_ErrorMessage = "";
    $scope._location_lat_ErrorMessage = "";

    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";

    dbRepository.getVendorLocation(_vendor_id, function(_error, _data)
    {
      var itemData = _data.Data;

      $('#__id').val(itemData[0].vendor_id);
      
      $scope.location_long = itemData[0].location_long;
      $scope.location_lat = itemData[0].location_lat;
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
    var __pt = "sys_vendor_location";

    var __location_long = $scope.location_long;
    var __location_lat  = $scope.location_lat;


    //Check if we have any mandatory fields missing
    $scope._location_long_ErrorMessage = "";
    $scope._location_lat_ErrorMessage = "";

    
    var __canSaveData = 0;
    
    if (__location_long == "")
    {
      __canSaveData = __canSaveData + 1;
      $scope._location_long_ErrorMessage = "this field is mandatory";
    }

    if (__location_lat == "")
    {
      __canSaveData = __canSaveData + 1;
      $scope._location_lat_ErrorMessage = "this field is mandatory";
    }


    //Save the data if we have no validation issues
    if (__canSaveData == 0)
    {
      //Build the json
      var form_json = '';
      form_json += '{"data": [{';
      form_json += '"id": "' + __id + '",';
      form_json += '"pt": "' + __pt + '",';
      form_json += '"location_long": "' + __location_long + '",';
      form_json += '"location_lat": "' + __location_lat + '"';
      form_json += '}]}';

      var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=SET&t=".concat(form_json);

      $.ajax({
        type: "POST", url: url,
        success: function (data, text) {
          window.location.href="#details/vendor-location";
        },
        error: function (request, status, error) {
          console.log(error);
          window.location.href="#error";
        }
      });
    }

  };


});
