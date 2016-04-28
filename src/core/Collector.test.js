oem.Core = (function(Components, Core) {

    // Collector component
    var CollectorTest = Object.create(Core.Test); // call super constructor
    CollectorTest.name = "Tests";
    CollectorTest.testComponent = 'oem-core-test';

    /**
     * Test example
     *
     * @method     
     */
    CollectorTest.exampleIsWorking = function(){
        CollectorTest.assert('Collector: test example is working', true, true);
    };    

    /**
     * Run tests
     */
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        CollectorTest.runTestSuite([
            CollectorTest.exampleIsWorking
        ]);
    });

    // exports
    Components.CollectorTest = CollectorTest;
    return Components;

})(oem.Components || {}, oem.Core);