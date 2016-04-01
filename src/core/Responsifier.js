 ToolhouseUI.Core = (function(Core) {

     var Responsifier = {};

    // components
     Responsifier.components = [];

     // breakpoints
     Responsifier.BREAKPOINTS = [];
     Responsifier.BREAKPOINTS.push({
         "klass": "mobile",
         range: [0, 300]
     });
     Responsifier.BREAKPOINTS.push({
         "klass": "tablet",
         range: [301, 500]
     });
     Responsifier.BREAKPOINTS.push({
         "klass": "desktop",
         range: [501, 10000]
     });

     // initialize
     Responsifier.init = function() {
        Core.Events.addEventListener(Core.EVENTS.WINDOW_RESIZED, Responsifier.responsify);
        return this;
     };

     Responsifier.responsify = function() {

        // loop all components        
        for(var i = 0; i < Responsifier.components.length; i++){

            var component = Responsifier.components[i];
            var el = component.getEl();
            var breakpoints = component.getBreakpoints();
            var width = $(el).width();

            // calc current components classes based on it's breakpoints
            for (var b = 0; b < breakpoints.length; b++) {
                var breakpoint = breakpoints[b];
                el.classList.remove(breakpoint.klass);
                if (width >= breakpoint.range[0] && width <= breakpoint.range[1]) {
                    el.classList.add(breakpoint.klass);
                }
            }

        }

        return this;
     };

     Responsifier.addComponent = function(component) {
         Responsifier.components.push(component);
         return this;
     };

    // run after all components have been collected
    Core.Events.addEventListener(Core.EVENTS.COMPONENTS_COLLECTED, Responsifier.init);
    Core.Events.addEventListener(Core.EVENTS.COMPONENTS_COLLECTED, Responsifier.responsify);

    Core.Responsifier = Responsifier;
    return Core;

 })(ToolhouseUI.Core || {});