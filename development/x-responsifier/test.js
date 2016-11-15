(function(COMPONENTS, TEST) {

    var Test = Object.create(TEST); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'ResponsifierTest';

    /**
     * Test example
     *
     * @method     
     */
    Test.exampleIsWorking = function(){
        Test.assert('Test example is working', true, true);
    };    

    /**
     * Run tests
     */
    oem.events.addEventListener(oem.EVENTS.DOCUMENT_READY, function(){
        Test.runTestSuite('Responsifier', [
            Test.exampleIsWorking
        ]);
    });

    // exports
    COMPONENTS.Responsifier.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core.Test);


(function(Components, Core) {

    // Responsifier component
    var ResponsifierTest = Object.create(Core.Test); // call super constructor
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
        Core.Responsifier.responsify();
        var test = testEl.classList.contains('mobile');
        ResponsifierTest.assert('is mobile response', test, true);
    };

    ResponsifierTest.isTabletResponsive = function(){
        testWrapper.style.width = '400px';
        Core.Responsifier.responsify();
        var test = testEl.classList.contains('tablet');
        ResponsifierTest.assert('is tablet response', test, true);
    };

    ResponsifierTest.isDesktopResponsive = function(){
        testWrapper.style.width = '1000px';
        Core.Responsifier.responsify();
        var test = testEl.classList.contains('desktop');
        ResponsifierTest.assert('is desktop response', test, true);
    };

    /**
     * Run tests
     */
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        ResponsifierTest.runTestSuite('Responsifier', [
            ResponsifierTest.isMobileResponsive,
            ResponsifierTest.isTabletResponsive,
            ResponsifierTest.isDesktopResponsive
        ]);
    });

    // exports
    Core.ResponsifierTest = ResponsifierTest;
    return Core;

})(oem.Components, oem.Core);