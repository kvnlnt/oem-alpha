oem.Components = (function(Components, Core) {

    // Card component
    var CardTest = Object.create(Core.Test); // call super constructor
    CardTest.name = "Tests";
    CardTest.testComponent = 'oem-card-test';

    /**
     * Test mobile responsive
     *
     * @method     isMobileResponsive
     */
    CardTest.isMobileResponsive = function(){
        
        // create test container
        var testComponent = document.querySelector("."+CardTest.testComponent);
        var testContainer = document.createElement("div");
        testContainer.style.width = '200px';
        testComponent.appendChild(testContainer);

        // create test element
        var thCard = document.createElement("div");
        thCard.classList.add('oem-card');
        testContainer.appendChild(thCard);

        var card = Object.create(Components.Card, {
            el: {
                value: thCard
            }
        });

        // test
        card.init();
        Core.Responsifier.responsify();
        CardTest.assert('is mobile response', thCard.classList.contains('mobile'), true);

        // clean up
        testComponent.removeChild(testContainer);

    };

    /**
     * Test tablet responsive
     *
     * @method     isTabletResponsive
     */
    CardTest.isTabletResponsive = function(){

        // create test container
        var testComponent = document.querySelector("."+CardTest.testComponent);
        var testContainer = document.createElement("div");
        testContainer.style.width = '400px';
        testComponent.appendChild(testContainer);

        // create test element
        var thCard = document.createElement("div");
        thCard.classList.add('oem-card');
        testContainer.appendChild(thCard);

        var card = Object.create(Components.Card, {
            el: {
                value: thCard
            }
        });

        // test
        card.init();
        Core.Responsifier.responsify();
        CardTest.assert('is tablet response', thCard.classList.contains('tablet'), true);

        // clean up
        testComponent.removeChild(testContainer);

    };

    /**
     * Test desktop responsive
     *
     * @method     isDesktopResponsive
     */
    CardTest.isDesktopResponsive = function(){
        
        // create test container
        var testComponent = document.querySelector("."+CardTest.testComponent);
        var testContainer = document.createElement("div");
        testContainer.style.width = '600px';
        testComponent.appendChild(testContainer);

        // create test element
        var thCard = document.createElement("div");
        thCard.classList.add('oem-card');
        testContainer.appendChild(thCard);

        var card = Object.create(Components.Card, {
            el: {
                value: thCard
            }
        });

        // test
        card.init();
        Core.Responsifier.responsify();
        CardTest.assert('is desktop response', thCard.classList.contains('desktop'), true);

        // clean up
        testComponent.removeChild(testContainer);

    };

    /**
     * Run tests
     */
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        CardTest.runTestSuite('Card', [
            CardTest.isMobileResponsive,
            CardTest.isTabletResponsive,
            CardTest.isDesktopResponsive
        ]);
    });

    // exports
    Components.CardTest = CardTest;
    return Components;

})(oem.Components || {}, oem.Core);