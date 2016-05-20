oem.Core = (function (Components, Core) {

    // AutoInitializer component
    var AutoInitializerTest = Object.create(Core.Test); // call super constructor
    AutoInitializerTest.name = "AutoInitializerTests";
    AutoInitializerTest.testComponent = 'oem-core-auto-initializer-test';
    var autoInitializer = Object.create(Core.AutoInitializer);

    AutoInitializerTest.canCollectComponents = function () {
        var testEl = document.createElement("div");
        testEl.classList.add('test-component');
        document.body.appendChild(testEl);
        var testComponent = oem.create(Core.Component, {
            name: "testComponent",
            selector: "test-component",
            el: testEl
        });
        autoInitializer.addComponent(testComponent);
        autoInitializer.collectAll();
        var test = oem.Collections['test-component'].length === 1;
        AutoInitializerTest.assert('Can collect components', test, true);
    };

    /**
     * Run tests
     */
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function () {
        AutoInitializerTest.runTestSuite('AutoInitializer', [
            AutoInitializerTest.canCollectComponents
        ]);
    });

    // exports
    Components.AutoInitializerTest = AutoInitializerTest;
    return Components;

})(oem.Components || {}, oem.Core);