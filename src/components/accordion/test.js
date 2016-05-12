oem.Components = (function(Components, Core) {

    // Accordion component
    var AccordionTest = Object.create(Core.Test); // call super constructor
    AccordionTest.name = "Tests";
    AccordionTest.testComponent = 'oem-accordion-test';

    var testAccordion = document.querySelector('dl.oem-accordion');

    /**
     * Run this test first before we start interacting with the component
     */
    AccordionTest.canExpandItemByDefault = function(){
        var thirdTerm = testAccordion.terms[2];
        var test = thirdTerm.isExpanded === true;
        AccordionTest.assert('Can expand target by default', test, true);
    };

    AccordionTest.canExpandTargetItem = function(){
        var firstTerm = testAccordion.terms[0];
        firstTerm.click();
        var test = firstTerm.isExpanded === true;
        AccordionTest.assert('Can expand target item', test, true);
    };

    AccordionTest.canContractTargetItem = function(){
        var firstTerm = testAccordion.terms[0];
        firstTerm.click();
        var test = firstTerm.isExpanded === false;
        AccordionTest.assert('Can contract target item', test, true);
    };

    AccordionTest.canContractNonTargetItem = function(){
        var firstTerm = testAccordion.terms[0];
        var secondTerm = testAccordion.terms[1];
        secondTerm.click();
        firstTerm.click();
        var test = secondTerm.isExpanded === false;
        testAccordion.oem.contractEverything(); // cleanup
        AccordionTest.assert('Can contract non target item', test, true);
    };

    /**
     * Run tests
     */
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        AccordionTest.runTestSuite('Accordion', [
            AccordionTest.canExpandItemByDefault,
            AccordionTest.canExpandTargetItem,
            AccordionTest.canContractTargetItem,
            AccordionTest.canContractNonTargetItem
        ]);
    });

    // exports
    Components.AccordionTest = AccordionTest;
    return Components;

})(oem.Components || {}, oem.Core);