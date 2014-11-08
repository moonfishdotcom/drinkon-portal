drinkon.controller('vendorSystemSettingsController', function($scope, dbRepository)
{
//  var _vendor_id = "1";
  var _vendor_id = __cookie_vendor_id;


  //Setup the data defaults for the page drop down lists
  $scope.timeslots = [{"id":"5","timeslot_name":"5 mins"},{"id":"10","timeslot_name":"10 mins"},{"id":"15","timeslot_name":"15 mins"},{"id":"20","timeslot_name":"20 mins"},{"id":"25","timeslot_name":"25 mins"},{"id":"30","timeslot_name":"30 mins"}];

  $scope.maxorders = [{"id":"5","maxorders_name":"5"},{"id":"10","maxorders_name":"10"},{"id":"15","maxorders_name":"15"}];

  $scope.order_alerts = [{"id":"5","order_alert_name":"5 mins"},{"id":"10","order_alert_name":"10 mins"},{"id":"15","order_alert_name":"15 mins"}];

  $scope.review_maxscores = [{"id":"5","maxscore_name":"5"},{"id":"7","maxscore_name":"7"},{"id":"9","maxscore_name":"9"}];

  $scope.review_showcounts = [{"id":"5","showcount_name":"5"},{"id":"10","showcount_name":"10"},{"id":"15","showcount_name":"15"},{"id":"20","showcount_name":"20"}];


  dbRepository.getVendorSettings(_vendor_id, function(_error, _data)
  {
    var itemData = _data.Data;
    console.log(itemData);

    //Set the various drop down lists
    $scope.timeslot_length = $scope.timeslots.filter(function (item)
    {
      return item.id == itemData[0].timeslot_length;
    })[0];

    $scope.timeslot_maxorders = $scope.maxorders.filter(function (item)
    {
      return item.id == itemData[0].timeslot_maxorders;
    })[0];

    $scope.order_alert = $scope.order_alerts.filter(function (item)
    {
      return item.id == itemData[0].order_alert;
    })[0];

    $scope.review_maxscore = $scope.review_maxscores.filter(function (item)
    {
      return item.id == itemData[0].review_maxscore;
    })[0];

    $scope.review_showcount = $scope.review_showcounts.filter(function (item)
    {
      return item.id == itemData[0].review_showcount;
    })[0];

    $('#__id').val(itemData[0].id);

  });


  $scope.saveItem = function()
  {
    var __id = $('#__id').val();
    var __pt = "sys_vendor_settings";

    var __timeslot_length = $scope.timeslot_length.id;
    var __timeslot_maxorders = $scope.timeslot_maxorders.id;
    var __order_alert = $scope.order_alert.id;
    var __review_maxscore = $scope.review_maxscore.id;
    var __review_showcount = $scope.review_showcount.id;


    var __canSaveData = 0;
    

    //Save the data if we have no validation issues
    if (__canSaveData == 0)
    {
      //Build the json
      var form_json = '';
      form_json += '{"data": [{';
      form_json += '"id": "' + __id + '",';
      form_json += '"pt": "' + __pt + '",';
      form_json += '"vendor_id": "' + _vendor_id + '",';
      form_json += '"timeslot_length": "' + __timeslot_length + '",';
      form_json += '"timeslot_maxorders": "' + __timeslot_maxorders + '",';
      form_json += '"order_alert": "' + __order_alert + '",';
      form_json += '"review_maxscore": "' + __review_maxscore + '",';
      form_json += '"review_showcount": "' + __review_showcount + '"';
      form_json += '}]}';

      var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=SET&t=".concat(form_json);

      $.ajax({
        type: "POST", url: url,
        success: function (data, text) {
          window.location.href="#details/vendor-system-settings";
        },
        error: function (request, status, error) {
          console.log(error);
          window.location.href="#error";
        }
      });

    }

  };



});
