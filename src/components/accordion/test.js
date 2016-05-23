oem.Components = (function(Components, Core) {

    // Accordion component
    var AccordionTest = Object.create(Core.Test); // call super constructor
    AccordionTest.name = "Tests";
    AccordionTest.testComponent = 'oem-accordion-test';

    // test element
    // tests everything in memory
    var dt1 = Core.El("dt", {}, "dt1");
    var dd1 = Core.El("dd", {}, "dd1");
    var dt2 = Core.El("dt", {}, "dt2");
    var dd2 = Core.El("dd", {"class":"expanded"}, "dd2");
    var dd3 = Core.El("dd", {}, "dd3");
    var dt3 = Core.El("dt", {}, "dt3");
    var testEl = Core.El("dl", {"class":"oem-accordion"}, [dt1, dd1, dt2, dd2, dt3, dd3]);

    var testAccordion = oem.create(Components.Accordion, {
        el: testEl
    });

    /**
     * Run this test first before we start interacting with the component
     */
    AccordionTest.canExpandItemByDefault = function(){
        var term = testAccordion.getTerm(1);
        var test = term.isExpanded === true;
        AccordionTest.assert('Can expand target by default', test, true);
    };

    AccordionTest.canExpandTargetItem = function(){
        var term = testAccordion.getTerm(0);
        term.click();
        var test = term.isExpanded === true;
        AccordionTest.assert('Can expand target item', test, true);
    };

    AccordionTest.canContractNonTargetItems = function(){
        var term = testAccordion.getTerm(1);
        var firstTerm = testAccordion.getTerm(0);
        term.click();
        var test = firstTerm.isExpanded === false;
        AccordionTest.assert('Can contract non target item', test, true);
    };

    AccordionTest.canContractNonTargetItem = function(){
        var firstTerm = testAccordion.getTerm(0);
        var secondTerm = testAccordion.getTerm(1);
        secondTerm.click();
        firstTerm.click();
        var test = secondTerm.isExpanded === false;
        testAccordion.contractEverything(); // cleanup
        AccordionTest.assert('Can contract non target item', test, true);
    };

    /**
     * Run tests
     */
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        AccordionTest.runTestSuite('Accordion', [
            AccordionTest.canExpandItemByDefault,
            AccordionTest.canExpandTargetItem,
            AccordionTest.canContractNonTargetItems,
            AccordionTest.canContractNonTargetItem
        ]);
    });

    // exports
    Components.AccordionTest = AccordionTest;
    return Components;

})(oem.Components || {}, oem.Core);