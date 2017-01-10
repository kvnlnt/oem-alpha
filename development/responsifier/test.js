// (function(COMPONENTS, TEST, EL) {

//     var Test = Object.create(TEST); // call super constructor
//     Test.name = "Tests";
//     Test.testComponent = 'ResponsifierTest';

//     function createTestFieldElement () {
//         var input = EL("input", {"type":"text", "name":"firstNameTest", "placeholder":"First Name", "value":"k"});
//         var field = EL("div", { "data-oem": "Field", "data-oem-id":"testField" }, [input] );
//         return field;
//     }

//     /**
//      * Test example
//      *
//      * @method     
//      */
//     Test.canAddRemoveResponsiveClass = function(){
//         var field = oem.create(oem.Components.Button.Prototype, {
//             el: createTestFieldElement()
//         }); 
//         var responsifier = oem.create(oem.Components.Responsifier.Prototype, {
//             el: EL("div"),
//             id:"testResponsive",
//             component:"testField",
//             responsiveClass:"test-class",
//             dimension:"width",
//             min:"0",
//             max:"360"
//         });
//         responsifier.init();
//         var testComponent = document.querySelector('[data-oem-test="ResponsifierTest"]');
//         testComponent.appendChild(field.getEl());
//         field.getEl().style.width = "100px";
//         oem.events.dispatch(oem.EVENTS.WINDOW_RESIZED);
//         Test.assert('Can add responsive class', field.getEl().classList.contains('test-class'), true);
//         field.getEl().style.width = "500px";
//         oem.events.dispatch(oem.EVENTS.WINDOW_RESIZED);
//         Test.assert('Can remove responsive class', !field.getEl().classList.contains('test-class'), true);
//         testComponent.removeChild(field.getEl());
//         oem.destroy("testField");
//         oem.destroy("testResponsive");
//     };    

//     /**
//      * Run tests
//      */
//     oem.events.addEventListener(oem.EVENTS.DOCUMENT_READY, function(){
//         Test.runTestSuite('Responsifier', [
//             Test.canAddRemoveResponsiveClass
//         ]);
//     });

//     // exports
//     COMPONENTS.Responsifier.Test = Test;
//     return COMPONENTS;

// })(oem.Components, oem.Core.Test, oem.Core.El);