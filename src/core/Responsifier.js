 ToolhouseUI.Core = (function(Core) {

     var Responsifier = {};

     // breakpoints
     Responsifier.BREAKPOINTS = [];
     Responsifier.BREAKPOINTS.push({
         "klass": "mobile",
         range: [0, 720]
     });
     Responsifier.BREAKPOINTS.push({
         "klass": "tablet",
         range: [721, 960]
     });
     Responsifier.BREAKPOINTS.push({
         "klass": "desktop",
         range: [961, 10000]
     });

     // components
     Responsifier.components = [];

     // initialize
     Responsifier.init = function() {
        Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, this.responsify, this);
        Core.Events.addEventListener(Core.EVENTS.WINDOW_RESIZED, this.responsify, this);
        return this;
     };

     Responsifier.responsify = function() {
        console.log(this.components[0].name);

        // var width = this.dom.offsetWidth;
        // var klass = this.breakpoints[0]; // default
        // for (var i = 0; i < this.breakpoints.length; i++) {
        //     var breakpoint = this.breakpoints[i];
        //     this.dom.classList.remove(breakpoint.klass);
        //     if (width >= breakpoint.range[0] && width <= breakpoint.range[1]) {
        //         this.dom.classList.add(breakpoint.klass);
        //         this.breakpoint = breakpoint.klass;
        //     }
        // }

        return this;
     };

     Responsifier.addComponent = function(component) {
         Responsifier.components.push(component);
         return this;
     };

     // auto start
     Responsifier.init();

     Core.Responsifier = Responsifier;
     return Core;

 })(ToolhouseUI.Core || {});