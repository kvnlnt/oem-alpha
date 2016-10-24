// (function(Components, Core) {

//     // Util component
//     var UtilTest = Object.create(Core.Test); // call super constructor
//     UtilTest.name = "UtilTests";
//     UtilTest.testComponent = 'oem-core-util-test';
//     var component = Object.create(Core.Util);
//     component.name = "TestUtil";

//     // event driven architecture is very difficult to test, do basic existential checks here
//     UtilTest.canMixinObjects = function(){
//         var destination = {};
//         var source = { test: "test" };
//         var test = Core.Util.mixin(destination, source).hasOwnProperty('test');
//         UtilTest.assert('can mixin objects', test, true);
//     };

//     UtilTest.canDebounce = function(){
//         var test = false;
//         function changeVal(){ 
//             test = true; 
//         }
//         Core.Util.debounce(changeVal, 10, true);
//         changeVal();
//         setTimeout(function(){
//             if(test){
//                 UtilTest.assert('can debounce functions', true, true);
//             } else {
//                 UtilTest.assert('can debounce functions', false, true);
//             }
//         }, 20);
        
//     };

//     /**
//      * Run tests
//      */
//     Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
//         UtilTest.runTestSuite('Util', [
//             UtilTest.canMixinObjects,
//             UtilTest.canDebounce
//         ]);
//     });

//     // exports
//     Core.UtilTest = UtilTest;
//     return Core;

// })(oem.Components, oem.Core);