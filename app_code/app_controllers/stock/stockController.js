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
