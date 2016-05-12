oem.Components = (function(Components, Core) {

    // Kevin component
    var KevinTest = Object.create(Core.Test); // call super constructor
    KevinTest.name = "Tests";
    KevinTest.testComponent = 'oem-kevin-test';

    /**
     * Test example
     *
     * @method     
     */
    KevinTest.exampleIsWorking = function(){
        KevinTest.assert('Test example is working', true, true);
    };    

    /**
     * Run tests
     */
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        KevinTest.runTestSuite('Kevin', [
            KevinTest.exampleIsWorking
        ]);
    });

    // exports
    Components.KevinTest = KevinTest;
    return Components;

})(oem.Components || {}, oem.Core);