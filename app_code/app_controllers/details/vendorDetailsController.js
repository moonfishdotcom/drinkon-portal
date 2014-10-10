drinkon.controller('vendorDetailsController', function($scope, dbRepository)
{
  var _vendor_id = "1";

  dbRepository.getVendorDetails(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });

  dbRepository.getLocations(function(_error, _data)
  {
    $scope.locations = _data.Data;
    console.log($scope.locations);
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

      $('#__id').val(itemData[0].vendor_id);
      
      $scope.vendor_name = itemData[0].vendor_name;
      $scope.vendor_addr1 = itemData[0].vendor_addr1;
      $scope.vendor_addr2 = itemData[0].vendor_addr2;
      $scope.vendor_addr3 = itemData[0].vendor_addr3;
      $scope.vendor_addr4 = itemData[0].vendor_addr4;
      $scope.vendor_postcode = itemData[0].vendor_postcode;
      $scope.vendor_phone = itemData[0].vendor_phone;
      $scope.vendor_fax = itemData[0].vendor_fax;
      $scope.vendor_email = itemData[0].vendor_email;

      $scope.location_id = $scope.locations.filter(function (item)
      {
        return item.id == itemData[0].location_id;
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
    var __pt = "sys_vendors";

    var __vendor_name = $scope.vendor_name;
    var __vendor_addr1 = $scope.vendor_addr1;
    var __vendor_addr2 = $scope.vendor_addr2;
    var __vendor_addr3 = $scope.vendor_addr3;
    var __vendor_addr4 = $scope.vendor_addr4;
    var __vendor_postcode = $scope.vendor_postcode;
    var __vendor_phone = $scope.vendor_phone;
    var __vendor_fax = $scope.vendor_fax;
    var __vendor_email = $scope.vendor_email;

    var __location_id = "0";
    if ($scope.location_id != null)
    {
      __location_id = $scope.location_id.id;
    }


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
