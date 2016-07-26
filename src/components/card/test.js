oem.Components = (function(Components, Core) {

    var Test = Object.create(Core.Test); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'oem-card-test';

    /**
     * Test mobile responsive
     *
     * @method     isMobileResponsive
     */
    Test.isMobileResponsive = function(){
        
        // create test container
        var testComponent = document.querySelector("."+Test.testComponent);
        var testContainer = document.createElement("div");
        testContainer.style.width = '200px';
        testComponent.appendChild(testContainer);

        // create test element
        var thCard = document.createElement("div");
        thCard.classList.add('oem-card');
        testContainer.appendChild(thCard);

        var card = oem.create(Components.Card.Prototype, { el:  thCard });

        // test
        card.init();
        Core.Responsifier.responsify();
        Test.assert('is mobile response', thCard.classList.contains('mobile'), true);

        // clean up
        testComponent.removeChild(testContainer);

    };

    /**
     * Test tablet responsive
     *
     * @method     isTabletResponsive
     */
    Test.isTabletResponsive = function(){

        // create test container
        var testComponent = document.querySelector("."+Test.testComponent);
        var testContainer = document.createElement("div");
        testContainer.style.width = '400px';
        testComponent.appendChild(testContainer);

        // create test element
        var thCard = document.createElement("div");
        thCard.classList.add('oem-card');
        testContainer.appendChild(thCard);

        var card = oem.create(Components.Card.Prototype, { el:  thCard });

        // test
        card.init();
        Core.Responsifier.responsify();
        Test.assert('is tablet response', thCard.classList.contains('tablet'), true);

        // clean up
        testComponent.removeChild(testContainer);

    };

    /**
     * Test desktop responsive
     *
     * @method     isDesktopResponsive
     */
    Test.isDesktopResponsive = function(){
        
        // create test container
        var testComponent = document.querySelector("."+Test.testComponent);
        var testContainer = document.createElement("div");
        testContainer.style.width = '600px';
        testComponent.appendChild(testContainer);

        // create test element
        var thCard = document.createElement("div");
        thCard.classList.add('oem-card');
        testContainer.appendChild(thCard);

        var card = oem.create(Components.Card.Prototype, { el:  thCard });

        // test
        card.init();
        Core.Responsifier.responsify();
        Test.assert('is desktop response', thCard.classList.contains('desktop'), true);

        // clean up
        testComponent.removeChild(testContainer);

    };

    /**
     * Run tests
     */
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        Test.runTestSuite('Card', [
            Test.isMobileResponsive,
            Test.isTabletResponsive,
            Test.isDesktopResponsive
        ]);
    });

    // exports
    Components.Card.Test = Test;
    return Components;

})(oem.Components || {}, oem.Core);