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

  angular.element(document).ready(function () {
    $rootScope.retreiveBasket();
  });

	$scope.menu = {};
    MenuService.get('/data/menu.json').success(function(data) {
	  $scope.menu = data;
  });

    $rootScope.basketEmpty = true;
    $rootScope.basket = [];
    $rootScope.totalCost = 0;
    $rootScope.totalItems = 0;


    $scope.add = function(meal) {
      $rootScope.basketEmpty = false;

      var i;
      var alreadyExists = false;
      for (i = 0; i < $rootScope.basket.length; i++) {
        if ($rootScope.basket[i].meal === meal.name) {
          alreadyExists = true;
          var j = $rootScope.basket[i].quantity;
          $rootScope.basket[i] = ({meal: meal.name, price: parseFloat(meal.price), quantity: j+1});
          }
      }

      if (!alreadyExists) {
        $rootScope.basket.push({meal: meal.name, price: parseFloat(meal.price), quantity: 1});
      }

      if ($rootScope.basket.length === 0) {
        $rootScope.basket.push({meal: meal.name, price: parseFloat(meal.price), quantity: 1});
      }
      $scope.updateStorage();
      $rootScope.totalItems += 1;
      $rootScope.totalCost += parseFloat(meal.price);
    };

    $scope.incrementDish = function(item) {
      var i;
      for (i = 0; i < $rootScope.basket.length; i++) {
        if ($rootScope.basket[i].meal === item.meal) {
          var j = $rootScope.basket[i].quantity;
          $rootScope.basket[i] = ({meal: item.meal, price: parseFloat(item.price), quantity: j+1});
          }
      }
      $rootScope.totalItems += 1;
      $rootScope.totalCost += parseFloat(item.price);
    };

    $scope.decrementDish = function(item) {
      var i;
      for (i = 0; i < $rootScope.basket.length; i++) {
        if ($rootScope.basket[i].meal === item.meal) {
          var j = $rootScope.basket[i].quantity;
          $rootScope.basket[i] = ({meal: item.meal, price: parseFloat(item.price), quantity: j-1});
          if ($rootScope.basket[i].quantity === 0) {
            delete $rootScope.basket[i];
          }
        }
      }
      $rootScope.totalItems -= 1;
      $rootScope.totalCost -= parseFloat(item.price);
    };

    $scope.updateStorage = function() {
      // var storage = JSON.parse(sessionStorage.getItem($rootScope.basket));
      sessionStorage.setItem('basket', JSON.stringify($rootScope.basket));
    };

    $rootScope.retreiveBasket = function() {
      var retrieved = JSON.parse(sessionStorage.getItem('basket'));
      if (retrieved != null) {
        $rootScope.basket = retrieved;
        $rootScope.basketEmpty = false;
      }
    };
  }

]);
