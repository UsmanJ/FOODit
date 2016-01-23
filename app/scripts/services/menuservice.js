'use strict';

/**
 * @ngdoc service
 * @name jstestApp.Menuservice
 * @description
 * # MenuService
 * Service in the jstestApp.
 */
angular.module('jstestApp')
	.factory('MenuService', ['$http', function ($http) {
		var service = {
			get: get
		};

		return service;

		function get () {
			return $http.get('/data/menu.json');
		}

		var basket = {

        meal: {
            name: '',
            price: '',
						quantity: '',
        },

        SaveState: function () {
            sessionStorage.MenuService = angular.toJson(basket.model);
        },

        RestoreState: function () {
            basket.model = angular.fromJson(sessionStorage.MenuService);
        }
    }

    $rootScope.$on("savestate", basket.SaveState);
    $rootScope.$on("restorestate", basket.RestoreState);

    return basket;
	}]);
