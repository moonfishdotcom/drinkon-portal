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
