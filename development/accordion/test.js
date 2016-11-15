(function(COMPONENTS, CORE) {

    var Test = Object.create(CORE.Test); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'Accordion';

    Test.canExpandTargetItem = function(){
        var testAccordion = oem.read("accordion");
        var term = testAccordion.getEl().querySelectorAll('input')[0];
        term.checked = true;
        var test = term.checked === true;
        Test.assert('Can expand target item', test, true);
    };

    Test.afterAll = function(){
        var testAccordion = oem.read("accordion");
        var term = testAccordion.getEl().querySelectorAll('input')[0];
        term.checked = false;
    };

    /**
     * Run tests
     */
    CORE.Events.addEventListener(CORE.EVENTS.DOCUMENT_READY, function(){
        Test.runTestSuite('Accordion', [
            Test.canExpandTargetItem
        ]);
    });

    // exports
    COMPONENTS.Accordion.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core);