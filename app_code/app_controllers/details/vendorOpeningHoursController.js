drinkon.controller('vendorOpeningHoursController', function($scope, dbRepository)
{
//  var _vendor_id = "1";
  var _vendor_id = __cookie_vendor_id;

  dbRepository.getOpeningHours(function(_error, _data)
  {
    $scope.mon_open_hrs = _data.Data;
    $scope.mon_close_hrs = _data.Data;

    $scope.tues_open_hrs = _data.Data;
    $scope.tues_close_hrs = _data.Data;

    $scope.wed_open_hrs = _data.Data;
    $scope.wed_close_hrs = _data.Data;

    $scope.thurs_open_hrs = _data.Data;
    $scope.thurs_close_hrs = _data.Data;

    $scope.fri_open_hrs = _data.Data;
    $scope.fri_close_hrs = _data.Data;

    $scope.sat_open_hrs = _data.Data;
    $scope.sat_close_hrs = _data.Data;

    $scope.sun_open_hrs = _data.Data;
    $scope.sun_close_hrs = _data.Data;
  });

  dbRepository.getVendorOpeningHours(_vendor_id, function(_error, _data)
  {
    $scope.items = _data.Data;
    console.log($scope.items);
  });


  $scope.editItem = function(_vendor_id)
  {
    console.log(_vendor_id);

    $scope._opening_hours_ErrorMessage = "";

    document.getElementById("pagePanel").style = "display:none;";
    document.getElementById("pageEditPanel").style = "display:block;";
    
    dbRepository.getVendorOpeningHours(_vendor_id, function(_error, _data)
    {
      var itemData = _data.Data;

      $('#__id').val(itemData[0].id);

      //Monday      
      $scope.mon_open = $scope.mon_open_hrs.filter(function (item)
      {
        return item.hours_value == itemData[0].monday_open;
      })[0];

      $scope.mon_close = $scope.mon_close_hrs.filter(function (item)
      {
        return item.hours_value == itemData[0].monday_close;
      })[0];

      //Tuesday      
      $scope.tues_open = $scope.tues_open_hrs.filter(function (item)
      {
        return item.hours_value == itemData[0].tuesday_open;
      })[0];

      $scope.tues_close = $scope.tues_close_hrs.filter(function (item)
      {
        return item.hours_value == itemData[0].tuesday_close;
      })[0];

      //Wednesday      
      $scope.wed_open = $scope.wed_open_hrs.filter(function (item)
      {
        return item.hours_value == itemData[0].wednesday_open;
      })[0];

      $scope.wed_close = $scope.wed_close_hrs.filter(function (item)
      {
        return item.hours_value == itemData[0].wednesday_close;
      })[0];

      //Thursday      
      $scope.thurs_open = $scope.thurs_open_hrs.filter(function (item)
      {
        return item.hours_value == itemData[0].thursday_open;
      })[0];

      $scope.thurs_close = $scope.thurs_close_hrs.filter(function (item)
      {
        return item.hours_value == itemData[0].thursday_close;
      })[0];

      //Friday      
      $scope.fri_open = $scope.fri_open_hrs.filter(function (item)
      {
        return item.hours_value == itemData[0].friday_open;
      })[0];

      $scope.fri_close = $scope.fri_close_hrs.filter(function (item)
      {
        return item.hours_value == itemData[0].friday_close;
      })[0];

      //Saturday      
      $scope.sat_open = $scope.sat_open_hrs.filter(function (item)
      {
        return item.hours_value == itemData[0].saturday_open;
      })[0];

      $scope.sat_close = $scope.sat_close_hrs.filter(function (item)
      {
        return item.hours_value == itemData[0].saturday_close;
      })[0];

      //Sunday      
      $scope.sun_open = $scope.sun_open_hrs.filter(function (item)
      {
        return item.hours_value == itemData[0].sunday_open;
      })[0];

      $scope.sun_close = $scope.sun_close_hrs.filter(function (item)
      {
        return item.hours_value == itemData[0].sunday_close;
      })[0];


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
    var __pt = "sys_vendor_opening_hours";

    var __mon_open = "0";
    if ($scope.mon_open != null) { __mon_open = $scope.mon_open.hours_value; }

    var __mon_close = "0";
    if ($scope.mon_close != null) { __mon_close = $scope.mon_close.hours_value; }

    var __tues_open = "0";
    if ($scope.tues_open != null) { __tues_open = $scope.tues_open.hours_value; }

    var __tues_close = "0";
    if ($scope.tues_close != null) { __tues_close = $scope.tues_close.hours_value; }

    var __wed_open = "0";
    if ($scope.wed_open != null) { __wed_open = $scope.wed_open.hours_value; }

    var __wed_close = "0";
    if ($scope.wed_close != null) { __wed_close = $scope.wed_close.hours_value; }

    var __thurs_open = "0";
    if ($scope.thurs_open != null) { __thurs_open = $scope.thurs_open.hours_value; }

    var __thurs_close = "0";
    if ($scope.thurs_close != null) { __thurs_close = $scope.thurs_close.hours_value; }

    var __fri_open = "0";
    if ($scope.fri_open != null) { __fri_open = $scope.fri_open.hours_value; }

    var __fri_close = "0";
    if ($scope.fri_close != null) { __fri_close = $scope.fri_close.hours_value; }

    var __sat_open = "0";
    if ($scope.sat_open != null) { __sat_open = $scope.sat_open.hours_value; }

    var __sat_close = "0";
    if ($scope.sat_close != null) { __sat_close = $scope.sat_close.hours_value; }

    var __sun_open = "0";
    if ($scope.sun_open != null) { __sun_open = $scope.sun_open.hours_value; }

    var __sun_close = "0";
    if ($scope.sun_close != null) { __sun_close = $scope.sun_close.hours_value; }


    var __is_active = "1";


    //Check if we have any mandatory fields missing
    $scope._opening_hours_ErrorMessage = "";
    
    var __canSaveData = 0;
    
    if
    (__mon_open == "0" || __mon_close == "0" ||
     __tues_open == "0" || __tues_close == "0" ||
     __wed_open == "0" || __wed_close == "0" ||
     __thurs_open == "0" || __thurs_close == "0" ||
     __fri_open == "0" || __fri_close == "0" ||
     __sat_open == "0" || __sat_close == "0" ||
     __sun_open == "0" || __sun_close == "0")
    {
      __canSaveData = __canSaveData + 1;
      $scope._opening_hours_ErrorMessage = "All items are mandatory";
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
      form_json += '"monday_open": "' + __mon_open + '",';
      form_json += '"monday_close": "' + __mon_close + '",';
      form_json += '"tuesday_open": "' + __tues_open + '",';
      form_json += '"tuesday_close": "' + __tues_close + '",';
      form_json += '"wednesday_open": "' + __wed_open + '",';
      form_json += '"wednesday_close": "' + __wed_close + '",';
      form_json += '"thursday_open": "' + __thurs_open + '",';
      form_json += '"thursday_close": "' + __thurs_close + '",';
      form_json += '"friday_open": "' + __fri_open + '",';
      form_json += '"friday_close": "' + __fri_close + '",';
      form_json += '"saturday_open": "' + __sat_open + '",';
      form_json += '"saturday_close": "' + __sat_close + '",';
      form_json += '"sunday_open": "' + __sun_open + '",';
      form_json += '"sunday_close": "' + __sun_close + '",';
      form_json += '"is_active": "' + __is_active + '" ';
      form_json += '}]}';

      var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=SET&t=".concat(form_json);

      $.ajax({
        type: "POST", url: url,
        success: function (data, text) {
          window.location.href="#details/vendor-opening-hours";
        },
        error: function (request, status, error) {
          console.log(error);
          window.location.href="#error";
        }
      });

    }

  }

});
