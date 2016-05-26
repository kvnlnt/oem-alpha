oem.Core = (function (Components, Core) {

    // AutoInitializer component
    var AutoInitializerTest = Object.create(Core.Test); // call super constructor
    AutoInitializerTest.name = "AutoInitializerTests";
    AutoInitializerTest.testComponent = 'oem-core-auto-initializer-test';
    var autoInitializer = Object.create(Core.AutoInitializer);

    AutoInitializerTest.canCollectComponents = function () {
        var testEl = Core.El("div", {"class":"test-component"}, "");
        document.body.appendChild(testEl);
        var initWasCalled = false;
        var testComponent = Core.Prototype(Core.Component, {
            name: "testComponent",
            selector: "test-component",
            el: testEl
        });
        testComponent.init = function(){
            initWasCalled = true;
        };
        autoInitializer.addComponent(testComponent);
        autoInitializer.collectAll();
        AutoInitializerTest.assert('Can collect components', initWasCalled, true);
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
    Core.AutoInitializerTest = AutoInitializerTest;
    return Core;

})(oem.Components || {}, oem.Core);