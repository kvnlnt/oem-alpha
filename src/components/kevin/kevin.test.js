ToolhouseUI.Components = (function(Components, Core) {

    // Kevin component
    var KevinTest = Object.create(Core.Test); // call super constructor
    KevinTest.name = "Tests";
    KevinTest.testComponent = 'th-kevin-test';

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
        KevinTest.runTestSuite([
            KevinTest.exampleIsWorking
        ]);
    });

    // exports
    Components.KevinTest = KevinTest;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);