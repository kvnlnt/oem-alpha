oem.Components = (function(Components, Core) {

    // List component
    var ListTest = Object.create(Core.Test); // call super constructor
    ListTest.name = "Tests";
    ListTest.testComponent = 'oem-list-test';

    /**
     * Test example
     *
     * @method     
     */
    ListTest.exampleIsWorking = function(){
        ListTest.assert('Test example is working', true, true);
    };    

    /**
     * Run tests
     */
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        ListTest.runTestSuite([
            ListTest.exampleIsWorking
        ]);
    });

    // exports
    Components.ListTest = ListTest;
    return Components;

})(oem.Components || {}, oem.Core);