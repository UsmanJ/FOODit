'use strict';

/**
 * @ngdoc function
 * @name jstestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jstestApp
 */
angular.module('jstestApp')
  .controller('MainCtrl', ['$scope', 'MenuService', '$rootScope', '$timeout', function ($scope, MenuService, $rootScope, $timeout) {

  angular.element(document).ready(function () {
    $scope.retreiveBasket();
    $scope.sessionPrice();
    $scope.sessionQuantity();
    $scope.sessionBasket();
  });

	$scope.menu = {};
    MenuService.get('/data/menu.json').success(function(data) {
	  $scope.menu = data;
  });

    $rootScope.basketEmpty = true;
    $rootScope.basket = [];
    $rootScope.totalCost = 0;
    $rootScope.totalMains = 0;
    $rootScope.totalOthers = 0;

    $scope.add = function(meal) {
      $rootScope.basketEmpty = false;
      var i;
      var alreadyExists = false;
      for (i = 0; i < $rootScope.basket.length; i++) {
        if ($rootScope.basket[i].meal === meal.name) {
          alreadyExists = true;
          var quantity = $rootScope.basket[i].quantity;
          $rootScope.basket[i] = ({meal: meal.name, price: parseFloat(meal.price), quantity: quantity+1, tags: meal.tags});
          }
      }

      if (!alreadyExists) {
        $rootScope.basket.push({meal: meal.name, price: parseFloat(meal.price), quantity: 1, tags: meal.tags});
      }

      if ($rootScope.basket.length === 0) {
        $rootScope.basket.push({meal: meal.name, price: parseFloat(meal.price), quantity: 1, tags: meal.tags});
      }
      if (meal.tags.indexOf('#course:main_courses') > -1) {
        $rootScope.totalMains += 1;
      } else {
        $rootScope.totalOthers += 1;
      }
      $scope.updateStorage();
      $scope.totalCost += parseFloat(meal.price);
      console.log($rootScope.basket);
    };

    $scope.incrementDish = function(item) {
      var i;
      for (i = 0; i < $rootScope.basket.length; i++) {
        if ($rootScope.basket[i].meal === item.meal) {
          var quantity = $rootScope.basket[i].quantity;
          $rootScope.basket[i] = ({meal: item.meal, price: parseFloat(item.price), quantity: quantity+1, tags: item.tags});
          }
      }
      if (item.tags.indexOf('#course:main_courses') > -1) {
        $rootScope.totalMains += 1;
      } else {
        $rootScope.totalOthers += 1;
      }
      $scope.totalCost += parseFloat(item.price);
      $scope.updateStorage();
    };

    $scope.decrementDish = function(item) {
      var i;
      for (i = 0; i < $rootScope.basket.length; i++) {
        if ($rootScope.basket[i].meal === item.meal) {
          var quantity = $rootScope.basket[i].quantity;
          $rootScope.basket[i] = ({meal: item.meal, price: parseFloat(item.price), quantity: quantity-1, tags: item.tags});
          if ($rootScope.basket[i].quantity === 0 ) {
            delete $rootScope.basket[i];
            $scope.deleted = true;
            $scope.clearBasket();
            $rootScope.basketEmpty = true;
          }
        }
      }
      if (item.tags.indexOf('#course:main_courses') > -1) {
        $rootScope.totalMains -= 1;
      } else {
        $rootScope.totalOthers -= 1;
      }      $scope.totalCost -= parseFloat(item.price);
      $scope.updateStorage();
    };

    $scope.updateStorage = function() {
      sessionStorage.setItem('basket', JSON.stringify($rootScope.basket));
    };

    $scope.retreiveBasket = function() {
      var retrieved = JSON.parse(sessionStorage.getItem('basket'));
      if (retrieved !== null) {
        $rootScope.basket = retrieved;
        $rootScope.basket = $rootScope.basket.filter(function(n){ return n != undefined });
      }
    };

    $scope.sessionPrice = function() {
      var i;
      for (i = 0; i < $rootScope.basket.length; i++) {
        var price = $rootScope.basket[i].price;
        var quantity = $rootScope.basket[i].quantity;
        $scope.totalCost += (price * quantity);
      }
    };

    $scope.sessionQuantity = function() {
      var i;
      for (i = 0; i < $rootScope.basket.length; i++) {
        var quantity = $rootScope.basket[i].quantity;
        if ($rootScope.basket[i].tags.indexOf('#course:main_courses') > -1) {
          $rootScope.totalMains += quantity;
        } else {
          $rootScope.totalOthers += quantity;
        }
      }
    };

    $scope.clearBasket = function() {
      sessionStorage.clear();
      location.reload();
    };

    $scope.sessionBasket = function() {
      if ($rootScope.totalOthers > 0 || $rootScope.totalMains > 0) {
        $timeout(function() {
          $rootScope.basketEmpty = false;
        },50);
      }
    };

    $scope.delete = function() {
      return $scope.deleted;
    };
  }

]);
