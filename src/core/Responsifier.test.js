oem.Core = (function(Components, Core) {

    // Responsifier component
    var ResponsifierTest = Object.create(Core.Test); // call super constructor
    ResponsifierTest.name = "ResponsifierTests";
    ResponsifierTest.testComponent = 'oem-core-responsifier-test';

    ResponsifierTest.isMobileResponsive = function(){
        
        // create test container
        var testComponent = document.querySelector("."+ResponsifierTest.testComponent);
        var testContainer = document.createElement("div");
        testContainer.style.width = '200px';
        testComponent.appendChild(testContainer);

        // create test element
        var thTestComp = document.createElement("div");
        thTestComp.classList.add('oem-test-comp');
        testContainer.appendChild(thTestComp);

        var component = Object.create(Core.Component, {
            el: {
                value: thTestComp
            }
        });

        // test
        component.init();
        Core.Responsifier.responsify();
        var test = thTestComp.classList.contains('mobile');
        ResponsifierTest.assert('is mobile response', test, true);

        // clean up
        testComponent.removeChild(testContainer);

    };

    ResponsifierTest.isTabletResponsive = function(){
        
        // create test container
        var testComponent = document.querySelector("."+ResponsifierTest.testComponent);
        var testContainer = document.createElement("div");
        testContainer.style.width = '400px';
        testComponent.appendChild(testContainer);

        // create test element
        var thTestComp = document.createElement("div");
        thTestComp.classList.add('oem-test-comp');
        testContainer.appendChild(thTestComp);

        var component = Object.create(Core.Component, {
            el: {
                value: thTestComp
            }
        });

        // test
        component.init();
        Core.Responsifier.responsify();
        var test = thTestComp.classList.contains('tablet');
        ResponsifierTest.assert('is tablet response', test, true);

        // clean up
        testComponent.removeChild(testContainer);

    };

    ResponsifierTest.isDesktopResponsive = function(){
        
        // create test container
        var testComponent = document.querySelector("."+ResponsifierTest.testComponent);
        var testContainer = document.createElement("div");
        testContainer.style.width = '1000px';
        testComponent.appendChild(testContainer);

        // create test element
        var thTestComp = document.createElement("div");
        thTestComp.classList.add('oem-test-comp');
        testContainer.appendChild(thTestComp);

        var component = Object.create(Core.Component, {
            el: {
                value: thTestComp
            }
        });

        // test
        component.init();
        Core.Responsifier.responsify();
        var test = thTestComp.classList.contains('desktop');
        ResponsifierTest.assert('is desktop response', test, true);

        // clean up
        testComponent.removeChild(testContainer);

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

})(oem.Components || {}, oem.Core);