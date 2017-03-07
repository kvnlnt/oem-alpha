(function(COMPONENTS, TEST, EL) {

    var Test = Object.create(TEST); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'Accordion';

    function createAndInitializeTestComponent () {

        var data = {
            id: "testAccordion",
            title: "testAccordion",
            list: [
                {
                    term:"1",
                    definition:"1",
                    expanded: false
                },
                {
                    term:"2",
                    definition:"2",
                    expanded: true
                },
                {
                    term:"3",
                    definition:"3",
                    expanded: false
                }
            ]
        };

        var testEl = oem.Core.Template(COMPONENTS.Accordion.Template, data, true);
        var testComponent = document.querySelector('[data-oem-test="Accordion"]');
        testComponent.appendChild(testEl);
        oem.create(COMPONENTS.Accordion.Prototype, { el: testEl });
        oem.read("testAccordion").init();
    }

    Test.beforeEach = function() {
        return createAndInitializeTestComponent();
    };

    Test.afterEach = function() {
        return oem.destroy('testAccordion');
    };

    /**
     * Run this test first before we start interacting with the component
     */
    Test.canExpandItemByDefault = function(){
        var testAccordion = oem.read('testAccordion');
        var item = testAccordion.getItem(1);
        var test = item.isExpanded() === true;
        Test.assert('Can expand target by default', test, true);
    };

    Test.canExpandAndContractTargetItem = function(){
        var testAccordion = oem.read('testAccordion');
        var item = testAccordion.getItem(0);
        item.getDt().click();
        var test1 = item.isExpanded() === true;
        item.getDt().click();
        var test2 = item.isExpanded() === false;
        var test = test1 && test2;
        Test.assert('Can expand and contract target item', test, true);
    };

    Test.canContractNonTargetItems = function(){
        var testAccordion = oem.read('testAccordion');
        var item = testAccordion.getItem(1);
        var firstItem = testAccordion.getItem(0);
        item.getDt().click();
        var test = firstItem.isExpanded() === false;
        Test.assert('Can contract non target items', test, true);
    };

    Test.canContractNonTargetItem = function(){
        var testAccordion = oem.read('testAccordion');
        var firstItem = testAccordion.getItem(0);
        var secondItem = testAccordion.getItem(1);
        secondItem.getDt().click();
        firstItem.getDt().click();
        var test = secondItem.isExpanded() === false;
        Test.assert('Can contract non target item', test, true);
    };   

    /**
     * Run tests
     */
    oem.events.addEventListener(oem.EVENTS.DOCUMENT_READY, function(){
        Test.runTestSuite('Accordion', [
            Test.canExpandItemByDefault,
            Test.canExpandAndContractTargetItem,
            Test.canContractNonTargetItems,
            Test.canContractNonTargetItem
        ]);
    });

    // exports
    COMPONENTS.Accordion.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core.Test, oem.Core.El);