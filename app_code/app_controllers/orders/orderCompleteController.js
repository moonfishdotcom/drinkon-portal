drinkon.controller('orderCompleteController', function($scope, $location, dbRepository)
{
  var _user_id = "2";

  var _url = $location.absUrl();

  var _id = _url.substring(_url.lastIndexOf("/") + 1);

  dbRepository.getOrderDetails(_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });


  $scope.completeOrder = function(_order_id)
  {
    var __id = _order_id;
    var __pt = "sys_order_header";
    var __status = "3";
    var __owner = _user_id;
  
    //Build the json
    var form_json = '';
    form_json += '{"data": [{';
    form_json += '"id": "' + __id + '",';
    form_json += '"pt": "' + __pt + '",';
    form_json += '"order_status_id": "' + __status + '",';
    form_json += '"order_owner_id": "' + __owner + '" ';
    form_json += '}]}';

    var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=SET&t=".concat(form_json);

    $.ajax({
      type: "POST", url: url,
      success: function (data, text) {
        window.location.href="#orders";
      },
      error: function (request, status, error) {
        window.location.href="#error";
      }
    });

  };

});
