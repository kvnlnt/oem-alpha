oem.Core = (function(Core) {

    function Extends(proto) {
      function F() {}
      F.prototype = proto
      return new F
    }
    
    Core.Extends = Extends;
    return Core;
    

})(oem.Core || {});

