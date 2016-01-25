'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('jstestApp'));

  var MainCtrl,
	scope,
	MenuService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
	MenuService = $injector.get('MenuService');
	var success = function(func) {
	  return func({resultCount: 1});
	};
	spyOn(MenuService, 'get').and.returnValue({success: success});
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should call the menu service to retrieve a list of meals', function () {
	expect(MenuService.get).toHaveBeenCalled();
	expect(scope.menu.resultCount).toBe(1);
  });

  it('should have an empty basket when page first loads', function () {
    expect(scope.basketEmpty).toBe(true);
  });
});


describe('when adding dishes to the basket', function () {

  beforeEach(module('jstestApp'));

  var MainCtrl,
	scope,
	MenuService;

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
	MenuService = $injector.get('MenuService');
	var success = function(func) {
	  return func({resultCount: 1});
	};
	spyOn(MenuService, 'get').and.returnValue({success: success});
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  var meal = {'meal': 'pizza', 'price': 9.50, 'quantity': 1, 'tags': ['#course:main_courses']};

  it('should add a dish to the basket', function () {
    scope.add(meal);
    expect(scope.basketEmpty).toBe(false);
  });

  it('basketEmpty remains false when numerous dishes are added to the basket', function () {
    scope.add(meal);
    scope.add(meal);
    expect(scope.basketEmpty).toBe(false);
  });

  it('should add the dish and price to the basket', function () {
    scope.add(meal);
    expect(scope.basket.length).toEqual(1);
  });

  it('should add dish price to the total', function () {
    scope.add(meal);
    expect(scope.totalCost).toBe(9.5);
  });

  it('should add a number to the total number of mains when a main is added', function () {
    scope.add(meal);
    expect(scope.totalMains).toBe(1);
  });

  it('should change quantity of item if another of the same is added', function () {
    scope.add(meal);
    scope.add(meal);
    expect(scope.basket[0].quantity).toBe(2);
  });
});

describe('when incremeneting dish in the basket', function () {

  beforeEach(module('jstestApp'));

  var MainCtrl,
	scope,
	MenuService;

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
	MenuService = $injector.get('MenuService');
	var success = function(func) {
	  return func({resultCount: 1});
	};
	spyOn(MenuService, 'get').and.returnValue({success: success});
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  var meal = {'meal': 'pizza', 'price': 9.50, 'quantity': 1, 'tags': ['#course:main_courses']};

  it('should increment totalMains when a main is added', function () {
    scope.add(meal);
    scope.incrementDish(meal);
    expect(scope.totalMains).toBe(2);
  });

  it('should add to the total price', function () {
    scope.add(meal);
    scope.incrementDish(meal);
    expect(scope.totalCost).toBe(19);
  });

  it('should change the quantity in the object', function () {
    scope.add(meal);
    scope.add(meal);
    expect(scope.basket[0].quantity).toBe(2);
  });
});

describe('when decrementing dish in the basket', function () {

  beforeEach(module('jstestApp'));

  var MainCtrl,
	scope,
	MenuService;

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
	MenuService = $injector.get('MenuService');
	var success = function(func) {
	  return func({resultCount: 1});
	};
	spyOn(MenuService, 'get').and.returnValue({success: success});
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  var meal = {'meal': 'pizza', 'price': 9.50, 'quantity': 1, 'tags': ['#course:main_courses']};

  it('should decrement totalMains when a main is decremented', function () {
    scope.add(meal);
    scope.incrementDish(meal);
    scope.incrementDish(meal);
    scope.decrementDish(meal);
    expect(scope.totalMains).toBe(2);
  });

  it('should decrement totalCost', function () {
    scope.add(meal);
    scope.incrementDish(meal);
    scope.incrementDish(meal);
    scope.decrementDish(meal);
    expect(scope.totalCost).toBe(19);
  });
});
