(function(COMPONENTS, CORE, EL) {

    var Test = Object.create(CORE.Test); // call super constructor
    Test.name = "Tests";
    Test.testComponent = 'Accordion';

    // test element
    // tests everything in memory
    var dt1 = EL("dt", {}, "dt1");
    var dd1 = EL("dd", {}, "dd1");
    var dt2 = EL("dt", {}, "dt2");
    var dd2 = EL("dd", {"class":"expanded"}, "dd2");
    var dd3 = EL("dd", {}, "dd3");
    var dt3 = EL("dt", {}, "dt3");
    var testEl = EL("dl", {"data-oem-id":"testAccordion", "data-oem":"Accordion"}, [dt1, dd1, dt2, dd2, dt3, dd3]);

    var testAccordion = oem.create(COMPONENTS.Accordion.Prototype, {
        el: testEl
    });

    /**
     * Run this test first before we start interacting with the component
     */
    Test.canExpandItemByDefault = function(){
        var term = testAccordion.getTerm(1);
        var test = term.isExpanded === true;
        Test.assert('Can expand target by default', test, true);
    };

    Test.canExpandAndContractTargetItem = function(){
        var term = testAccordion.getTerm(0);
        term.click();
        var test1 = term.isExpanded === true;
        term.click();
        var test2 = term.isExpanded === false;
        var test = test1 && test2;
        Test.assert('Can expand and contract target item', test, true);
    };

    Test.canContractNonTargetItems = function(){
        var term = testAccordion.getTerm(1);
        var firstTerm = testAccordion.getTerm(0);
        term.click();
        var test = firstTerm.isExpanded === false;
        Test.assert('Can contract non target items', test, true);
    };

    Test.canContractNonTargetItem = function(){
        var firstTerm = testAccordion.getTerm(0);
        var secondTerm = testAccordion.getTerm(1);
        secondTerm.click();
        firstTerm.click();
        var test = secondTerm.isExpanded === false;
        testAccordion.contractAll(); // cleanup
        Test.assert('Can contract non target item', test, true);
    };

    Test.afterAll = function(){
        oem.destroy(testAccordion.id);
    };

    /**
     * Run tests
     */
    CORE.Events.addEventListener(CORE.EVENTS.DOCUMENT_READY, function(){
        Test.runTestSuite('Accordion', [
            Test.canExpandItemByDefault,
            Test.canExpandAndContractTargetItem,
            Test.canContractNonTargetItem,
            Test.canContractNonTargetItems
        ]);
    });

    // exports
    COMPONENTS.Accordion.Test = Test;
    return COMPONENTS;

})(oem.Components, oem.Core, oem.Core.El);