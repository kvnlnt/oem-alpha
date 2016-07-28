(function(Components, Core) {

    // Responsifier component
    var ResponsifierTest = Object.create(Core.Modules.Test); // call super constructor
    ResponsifierTest.name = "ResponsifierTests";
    ResponsifierTest.testComponent = 'oem-core-responsifier-test';
    
    // main test list container
    var testContainer = document.querySelector('.'+ResponsifierTest.testComponent);

    // create test wrapper
    var testWrapper = document.createElement("div");
    testContainer.appendChild(testWrapper);

    // create test element
    var testEl = document.createElement("div");
    testEl.classList.add('oem-test-comp');
    testWrapper.appendChild(testEl);

    // create test component
    var testComponent = oem.create(Core.Component, { el:  testEl });
    testComponent.init();

    ResponsifierTest.isMobileResponsive = function(){
        testWrapper.style.width = '200px';
        Core.Modules.Responsifier.responsify();
        var test = testEl.classList.contains('mobile');
        ResponsifierTest.assert('is mobile response', test, true);
    };

    ResponsifierTest.isTabletResponsive = function(){
        testWrapper.style.width = '400px';
        Core.Modules.Responsifier.responsify();
        var test = testEl.classList.contains('tablet');
        ResponsifierTest.assert('is tablet response', test, true);
    };

    ResponsifierTest.isDesktopResponsive = function(){
        testWrapper.style.width = '1000px';
        Core.Modules.Responsifier.responsify();
        var test = testEl.classList.contains('desktop');
        ResponsifierTest.assert('is desktop response', test, true);
    };

    /**
     * Run tests
     */
    Core.Modules.Events.addEventListener(Core.Modules.EVENTS.DOCUMENT_READY, function(){
        ResponsifierTest.runTestSuite('Responsifier', [
            ResponsifierTest.isMobileResponsive,
            ResponsifierTest.isTabletResponsive,
            ResponsifierTest.isDesktopResponsive
        ]);
    });

    // exports
    Core.Modules.ResponsifierTest = ResponsifierTest;
    return Core;

})(oem.Components, oem.Core);