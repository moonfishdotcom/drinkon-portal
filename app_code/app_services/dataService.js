/*
drinkon.service('dataService', function($http)
{
  this.getData = function(_item_id) {

    return $http({
      method: "GET",
      url: "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=dv_sys_users&i=2"
    });
  },

  this.getVendorDetails = function(_item_id)
  {
    return $http({
      method: "GET",
      url: "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=dv_sys_vendors&i=" + _item_id + ""
    });
  },

  this.getUserDetails = function(_item_id) {

    return $http({
      method: "GET",
      url: "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=dv_sys_users&i=" + _item_id + ""
    });
  }

});
*/

/*
 * In the controller
    $scope.data = null;
    dataService.getUserDetails(_item_id).then(function(dataResponse)
    {
      $scope.data = dataResponse;
      console.log($scope.data);
      console.log(dataResponse.data[0].user_known_as);
	});
*/

