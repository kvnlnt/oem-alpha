// (function (Components, Core) {

//     // AutoInitializer component
//     var AutoInitializerTest = Object.create(Core.Test); // call super constructor
//     AutoInitializerTest.name = "AutoInitializerTests";
//     AutoInitializerTest.testComponent = 'oem-core-auto-initializer-test';
//     var autoInitializer = Object.create(Core.AutoInitializer);

//     AutoInitializerTest.canInitializeComponent = function () {
//         var testEl = Core.El("div", {"class":"test-component"}, "");
//         document.body.appendChild(testEl);
//         var initWasCalled = false;
//         var testComponent = {};
//         testComponent.Prototype = Core.Prototype(Core.Component, {
//             type: "testComponent",
//             selector: "test-component",
//         });
//         testComponent.Prototype.init = function(){
//             initWasCalled = true;
//         };
//         autoInitializer.initialize(testComponent);
//         AutoInitializerTest.assert('Can initialize component', initWasCalled, true);
//     };

//     /**
//      * Run tests
//      */
//     Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function () {
//         AutoInitializerTest.runTestSuite('AutoInitializer', [
//             AutoInitializerTest.canInitializeComponent
//         ]);
//     });

//     // exports
//     Core.AutoInitializerTest = AutoInitializerTest;
//     return Core;

// })(oem.Components, oem.Core);