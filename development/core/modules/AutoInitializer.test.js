(function (CORE) {

    // AutoInitializer component
    var AutoInitializerTest = Object.create(CORE.Test); // call super constructor
    AutoInitializerTest.testComponent = 'AutoInitializerTest';
    var autoInitializer = Object.create(CORE.AutoInitializer);

    AutoInitializerTest.canInitializeComponent = function () {
        var testEl = CORE.El("div", {"data-oem":"TestComponent", "data-oem-id":"TestComponent"}, "");
        document.body.appendChild(testEl);
        var initWasCalled = false;
        var testComponent = {};
        testComponent.Prototype = CORE.Prototype(CORE.Component, { type: "TestComponent" });
        testComponent.Prototype.init = function(){ initWasCalled = true; };
        autoInitializer.collect(testComponent); // manually add since 
        autoInitializer.initializeAll();
        AutoInitializerTest.assert('Can auto initialize component', initWasCalled, true);
    };

    /**
     * Run tests
     */
    CORE.Events.addEventListener(CORE.EVENTS.DOCUMENT_READY, function () {
        AutoInitializerTest.runTestSuite('AutoInitializer', [
            AutoInitializerTest.canInitializeComponent
        ]);
    });

    // exports
    CORE.AutoInitializerTest = AutoInitializerTest;
    return CORE;

})(oem.Core);