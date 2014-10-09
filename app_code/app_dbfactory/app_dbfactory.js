drinkon.factory('dbRepository', function($http)
{
  return {

    getOrderDetails: function(_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_orders.php?v=GET&s=ORDER&q=" + _id + "";

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getOrdersList: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_orders.php?v=GET&s=ALL&q=" + _vendor_id + ""
	  
      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },


    getStockList: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_products_with_types&s1=vendor_id&s2=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },


    getVendorDetails: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_vendors_with_location&s1=id&s2=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorDescription: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_vendors_description&s1=id&s2=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorPatterns: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_vendor_patterns&s1=vendor_id&s2=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorPatternDetails: function(_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_vendor_patterns&s1=id&s2=" + _id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorPatternDetailsByName: function(_vendor_id, _pattern_name, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_vendor_patterns&s1=id&s2=" + _vendor_id + "&s3=pattern_name&s4='" + _pattern_name + "' "

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductsList: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_products_with_types&s1=vendor_id&s2=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductDetails: function(_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_products_with_types&s1=id&s2=" + _id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductLinesList: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_product_lines_with_descs&s1=vendor_id&s2=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductLineDetails: function(_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_product_lines_with_descs&s1=id&s2=" + _id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductMeasuresList: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_product_measures_with_types&s1=vendor_id&s2=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductMeasuresListByTypeId: function(_type_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_product_measures_with_types&s1=product_type_id&s2=" + _type_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductMeasuresListByProductId: function(_product_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_products_with_measures&s1=product_id&s2=" + _product_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductMeasureDetails: function(_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_product_measures_with_types&s1=id&s2=" + _id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductTypesList: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=dv_sys_product_types&s1=vendor_id&s2=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorProductTypeDetails: function(_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=dv_sys_product_types&s1=id&s2=" + _id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorReviewsList: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_customer_reviews&s1=vendor_id&s2=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorUsers: function(_vendor_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=vw_users_with_patterns&s1=vendor_id&s2=" + _vendor_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorUserDetails: function(_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=dv_sys_users&s1=id&s2=" + _id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getVendorUserDetailsByVendorUserId: function(_vendor_id, _vendor_user_id, cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=dv_sys_users&s1=vendor_id&s2=" + _vendor_id + "&s3=vendor_user_id&s4=" + _vendor_user_id + ""

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    },

    getLocations: function(cb)
    {
	  var url = "" + sysconfig["web_protocol"] + "://" + sysconfig["svc_url_base"] + "/svc_data.php?v=GET&q=dv_sys_locations"

      $http.get(url)
        .success(function(data,status,headers){cb(null,{Data:data, Status:status, Headers:headers});})
        .error(function(data,status,headers){cb({Error:data, Status:status, Headers:headers},null);})
    }
    

  };
});
