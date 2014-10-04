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
