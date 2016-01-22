'use strict';

/**
 * @ngdoc function
 * @name jstestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jstestApp
 */
angular.module('jstestApp')
  .controller('MainCtrl', ['$scope', 'MenuService', '$rootScope', function ($scope, MenuService, $rootScope) {
	$scope.menu = {};
    MenuService.get('/data/menu.json').success(function(data) {
	  $scope.menu = data;
    // $scope.basket = {};
  });

    $rootScope.basketEmpty = true;
    $rootScope.basket = {};
    $rootScope.totalCost = 0;
    $rootScope.totalItems = 0;

    $scope.add = function(meal) {
      $rootScope.basketEmpty = false;
      $rootScope.basket[meal.name] = [parseFloat(meal.price)];
      $rootScope.totalItems += 1;
      $rootScope.totalCost += parseFloat(meal.price);
      console.log($rootScope.totalCost.toFixed(2));
      console.log($rootScope.basket);
      console.log($rootScope.totalItems);
    };
  }
]);
