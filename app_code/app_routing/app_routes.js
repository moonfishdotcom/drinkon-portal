drinkon.config(function($routeProvider) {
$routeProvider

  .when('/', {
	templateUrl: 'app_pages/dashboard.htm',
	controller: 'homeController'
  })

  .when('/error', {
	templateUrl: 'app_pages/error.htm',
	controller: 'errorController'
  })


  .when('/orders', {
	templateUrl: 'app_pages/orders.htm',
	controller: 'ordersController'
  })

  .when('/orders/accept/:id', {
	templateUrl: 'app_pages/orders/order-accept.htm',
	controller: 'orderAcceptController'
  })

  .when('/orders/complete/:id', {
	templateUrl: 'app_pages/orders/order-complete.htm',
	controller: 'orderCompleteController'
  })


  .when('/stock', {
	templateUrl: 'app_pages/stock.htm',
	controller: 'stockController'
  })


  .when('/products', {
	templateUrl: 'app_pages/products.htm',
	controller: 'productsController'
  })


  .when('/social', {
	templateUrl: 'app_pages/social.htm',
	controller: 'socialController'
  })

  .when('/social/social-notifications', {
	templateUrl: 'app_pages/social/social-notifications.htm',
	controller: 'socialNotificationsController'
  })

  .when('/social/social-reviews', {
	templateUrl: 'app_pages/social/social-reviews.htm',
	controller: 'socialReviewsController'
  })


  .when('/details', {
	templateUrl: 'app_pages/details.htm',
	controller: 'detailsController'
  })

  .when('/details/vendor-accounts', {
	templateUrl: 'app_pages/details/vendor-accounts.htm',
	controller: 'vendorAccountsController'
  })

  .when('/details/vendor-details', {
	templateUrl: 'app_pages/details/vendor-details.htm',
	controller: 'vendorDetailsController'
  })

  .when('/details/vendor-description', {
	templateUrl: 'app_pages/details/vendor-description.htm',
	controller: 'vendorDescriptionController'
  })

  .when('/details/vendor-location', {
	templateUrl: 'app_pages/details/vendor-location.htm',
	controller: 'vendorLocationController'
  })

  .when('/details/vendor-patterns', {
	templateUrl: 'app_pages/details/vendor-patterns.htm',
	controller: 'vendorPatternsController'
  })

  .when('/details/vendor-products', {
	templateUrl: 'app_pages/details/vendor-products.htm',
	controller: 'vendorProductsController'
  })

  .when('/details/vendor-product-lines', {
	templateUrl: 'app_pages/details/vendor-product-lines.htm',
	controller: 'vendorProductLinesController'
  })

  .when('/details/vendor-product-measures', {
	templateUrl: 'app_pages/details/vendor-product-measures.htm',
	controller: 'vendorProductMeasuresController'
  })

  .when('/details/vendor-product-specials', {
	templateUrl: 'app_pages/details/vendor-product-specials.htm',
	controller: 'vendorProductSpecialsController'
  })

  .when('/details/vendor-product-types', {
	templateUrl: 'app_pages/details/vendor-product-types.htm',
	controller: 'vendorProductTypesController'
  })

  .when('/details/vendor-reports', {
	templateUrl: 'app_pages/details/vendor-reports.htm',
	controller: 'vendorReportsController'
  })

  .when('/details/vendor-roles', {
	templateUrl: 'app_pages/details/vendor-roles.htm',
	controller: 'vendorRolesController'
  })

  .when('/details/vendor-social', {
	templateUrl: 'app_pages/details/vendor-social.htm',
	controller: 'vendorSocialController'
  })

  .when('/details/vendor-users', {
	templateUrl: 'app_pages/details/vendor-users.htm',
	controller: 'vendorUsersController'
  })


  .when('/logout', {
	templateUrl: 'app_pages/logout.htm',
	controller: 'logoutController'
  });


});
