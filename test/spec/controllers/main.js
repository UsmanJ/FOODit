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


  var fakeDish;

  beforeEach(function(){
    fakeDish = jasmine.createSpyObj('fakeDish', ['order']);

    module({
      Search: fakeDish,
    });

  });

  beforeEach(function(){
    fakeDish.query.and.returnValue({then: function(callback){callback({data: {items: items}})}})
  });

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


  it('should add a dish to the basket', function () {
    scope.add(scope);
    expect(scope.basketEmpty).toBe(false);
  });

  it('basketEmpty remains false when numerous dishes are added to the basket', function () {
    scope.add(scope);
    scope.add(scope);
    expect(scope.basketEmpty).toBe(false);
  });

  // it('should add the dish and price to the basket', function () {
  //   scope.add();
  //   expect(scope.basket).toContain('Seafood risotto');
  // });

  // it('should add dish price to the total', function () {
  //   scope.add(scope);
  //   expect(scope.total).toBe(false);
  // });

  it('should add a number to the total number of items when a dish is added', function () {
    scope.add(Menu);
    expect(scope.items).toBe(0);
  });
});
