(function(COMPONENTS, COMPONENT, PROTOTYPE, CSS) {

    // PROTOTYPE

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Theme"
    });

    // EXPORTS
    COMPONENTS.Theme.Prototype = Prototype;
    return COMPONENTS;

})(
    oem.Components,
    oem.Core.Prototypes.Component,
    oem.Core.Modules.Prototype,
    oem.Core.Modules.Css
);