(function(Core) {

     var Responsifier = {};

     // default breakpoints
     // Responsifier.BREAKPOINTS = [{
     //    "klass": "mobile",
     //     width: [0, 300]
     // }, 
     // {
     //    "klass": "short",
     //     height: [50, 300]
     // },
     // {
     //    "klass": "tablet",
     //     width: [301, 500]
     // }, {
     //    "klass": "desktop",
     //    width: [501, '*']
     // }];

     // initialize
     Responsifier.init = function() {
        Responsifier.responsify();
        return this;
     };

     // get breakpoints from element
     Responsifier.getBreakpointsFromEl = function(el){
        var dataAttrs = el.dataset;
        var breakpoints = [];
        for(var x in dataAttrs){
            var args = dataAttrs[x];
            var isBreakpoint = x.indexOf("breakpoint") > -1;
            if(isBreakpoint){
                var breakpointType = x.replace("breakpoint","");
                var breakpoint = breakpointType[0].toLowerCase() + breakpointType.slice(1); // lowercase first letter
                var args = args.split("|").map(function(arg){ return Core.Modules.Util.typeCast(arg) }); 
                var config = {};
                config.klass = breakpoint;
                config[args[0]] = [args[1], args[2]];
                breakpoints.push(config);
            }
        }
        return breakpoints;
    };

     /**
      * Loops and adds classes based on breakpoints
      *
      * @method     responsify
      * @return     {Object}  { description_of_the_return_value }
      */
     Responsifier.responsify = function(components) {

        var components = components || oem.list.all;

         // loop all components        
         for (var i in components) {

             var component = components[i]; // current component
             var el = component.getEl(); // current element
             var breakpoints = this.getBreakpointsFromEl(el); // current breakpoints
             if(breakpoints){
                var width = el.offsetWidth; // element width
                 var height = el.offsetHeight; // element height

                 // calc current components classes based on it's breakpoints
                 for (var b = 0; b < breakpoints.length; b++) {

                    // current breakpoint
                     var breakpoint = breakpoints[b];

                     // reset application of current klass
                     el.classList.remove(breakpoint.klass);

                     // apply width ranges
                     if (breakpoint.hasOwnProperty('width') && 
                        width >= breakpoint.width[0] && 
                        (width <= breakpoint.width[1] || breakpoint.width[1] === '*')) {
                        el.classList.add(breakpoint.klass);
                     }

                     // apply height ranges
                     if (breakpoint.hasOwnProperty('height') && 
                        height >= breakpoint.height[0] && 
                        (height <= breakpoint.height[1] || breakpoint.height[1] === '*')) {
                        el.classList.add(breakpoint.klass);
                     }
                 }
             }
         }

         return this;
     };


     // run after all components have been collected
     Core.Modules.Events.addEventListener(Core.Modules.EVENTS.COMPONENTS_COLLECTED, Responsifier.init);
     Core.Modules.Events.addEventListener(Core.Modules.EVENTS.WINDOW_RESIZED, function(){
        Responsifier.responsify();
     });

     Core.Modules.Responsifier = Responsifier;
     return Core;

 })(oem.Core);