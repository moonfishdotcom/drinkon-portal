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

  });




});
