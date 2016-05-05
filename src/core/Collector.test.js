oem.Core = (function(Components, Core) {

    // Collector component
    var CollectorTest = Object.create(Core.Test); // call super constructor
    CollectorTest.name = "CollectorTests";
    CollectorTest.testComponent = 'oem-core-collector-test';
    var collector = Object.create(Core.Collector);

    CollectorTest.canCollectComponents = function(){
        var testComponent = Object.create(Core.Component); // call super constructor.
        testComponent.name = "testComponent";
        var testEl = document.createElement("div");
        testEl.classList.add('testEl');
        document.body.appendChild(testEl);
        collector.addComponent('testEl', testComponent);
        collector.collectAll();
        var test = oem.Collections.testEl.length === 1;
        CollectorTest.assert('Can collect components', test, true);
    };    

    /**
     * Run tests
     */
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        CollectorTest.runTestSuite('Collector', [
            CollectorTest.canCollectComponents
        ]);
    });

    // exports
    Components.CollectorTest = CollectorTest;
    return Components;

})(oem.Components || {}, oem.Core);