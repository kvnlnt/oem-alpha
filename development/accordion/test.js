// (function(Components, Core) {

//     var Test = Object.create(Core.Test); // call super constructor
//     Test.name = "Tests";
//     Test.testComponent = 'Accordion';

//     // test element
//     // tests everything in memory
//     var dt1 = Core.El("dt", {}, "dt1");
//     var dd1 = Core.El("dd", {}, "dd1");
//     var dt2 = Core.El("dt", {}, "dt2");
//     var dd2 = Core.El("dd", {"class":"expanded"}, "dd2");
//     var dd3 = Core.El("dd", {}, "dd3");
//     var dt3 = Core.El("dt", {}, "dt3");
//     var testEl = Core.El("dl", {"data-oem-id":"testAccordion", "data-oem":"Accordion"}, [dt1, dd1, dt2, dd2, dt3, dd3]);

//     var testAccordion = oem.create(Components.Accordion.Prototype, {
//         el: testEl
//     });

//     /**
//      * Run this test first before we start interacting with the component
//      */
//     Test.canExpandItemByDefault = function(){
//         var term = testAccordion.getTerm(1);
//         var test = term.isExpanded === true;
//         Test.assert('Can expand target by default', test, true);
//     };

//     Test.canExpandTargetItem = function(){
//         var term = testAccordion.getTerm(0);
//         term.click();
//         var test = term.isExpanded === true;
//         Test.assert('Can expand target item', test, true);
//     };

//     Test.canContractNonTargetItems = function(){
//         var term = testAccordion.getTerm(1);
//         var firstTerm = testAccordion.getTerm(0);
//         term.click();
//         var test = firstTerm.isExpanded === false;
//         Test.assert('Can contract non target items', test, true);
//     };

//     Test.canContractNonTargetItem = function(){
//         var firstTerm = testAccordion.getTerm(0);
//         var secondTerm = testAccordion.getTerm(1);
//         secondTerm.click();
//         firstTerm.click();
//         var test = secondTerm.isExpanded === false;
//         testAccordion.contractEverything(); // cleanup
//         Test.assert('Can contract non target item', test, true);
//     };

//     Test.afterAll = function(){
//         oem.destroy(testAccordion.id);
//     };

//     /**
//      * Run tests
//      */
//     Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
//         Test.runTestSuite('Accordion', [
//             Test.canExpandItemByDefault,
//             Test.canExpandTargetItem,
//             Test.canContractNonTargetItems,
//             Test.canContractNonTargetItem
//         ]);
//     });

//     // exports
//     Components.Accordion.Test = Test;
//     return Components;

// })(oem.Components, oem.Core);