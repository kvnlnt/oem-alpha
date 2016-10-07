(function(COMPONENTS) {

    // Main component namespace
    var Theme = {};

    oem.events.addEventListener(oem.EVENTS.CSS_RENDERED, function(){
        var preloader = document.querySelector('[data-oem-css="Preloader"]');
        preloader.parentNode.removeChild(preloader);
    });

    COMPONENTS.Theme = Theme;
    return COMPONENTS;

})(oem.Components);