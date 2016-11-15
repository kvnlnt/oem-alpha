(function(COMPONENTS, COMPONENT, PROTOTYPE) {


    // PROTOTYPE
    // ========================================================
    // This is the main prototype class for this component. It is meant to:
    // 1) contain any/all functional behavior for this component.
    // 2) be prototyped into a new instance for each component
    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Responsify"
    });

    Prototype.DIMENSIONS = {
        width: "width",
        height: "height"

    };

    Prototype.component = null;
    Prototype.responsiveClass = null;
    Prototype.dimension = Prototype.DIMENSIONS.width;
    Prototype.min = 0;
    Prototype.max = 0;

    // INIT
    // ========================================================
    Prototype.init = function(){
        this.component = this.getEl().dataset.oemComponent;
        this.responsiveClass = this.getEl().dataset.oemResponsiveClass;
        this.dimension = this.getEl().dataset.oemDimension;
        this.min = this.getEl().dataset.oemMin;
        this.max = this.getEl().dataset.oemMax;

        oem.events.addEventListener(oem.EVENTS.COMPONENTS_INITIALIZED, this.responsify, this);
        oem.events.addEventListener(oem.EVENTS.WINDOW_RESIZED, this.responsify, this);
    };

    // GETTERS
    // ========================================================
    Prototype.getComponent = function(){
         return oem.read(this.component);
    };

    Prototype.getResponsiveClass = function(){
         return this.responsiveClass;
    };

    Prototype.getDimension = function(){
        return this.dimension;
    };

    Prototype.getMin = function(){
        return this.min;
    };

    Prototype.getMax = function(){
        return this.max;
    };

    // SETTERS
    // ========================================================
    Prototype.setComponent = function(component){
        this.component = component;
        return this;
    };

    Prototype.setResponsiveClass = function(responsiveClass){
        this.responsiveClass = responsiveClass;
        return this;
    };

    Prototype.setDimension = function(dimension){
        this.dimension = dimension;
        return this;
    };

    Prototype.setMin = function(min){
        this.min = min;
        return this;
    };

    Prototype.setMax = function(max){
        this.max = max;
        return this;
    };

    // METHODS
    // ========================================================
    Prototype.responsify = function(){
        var el = this.getComponent().getEl();
        var width = el.offsetWidth;
        var height = el.offsetHeight;
        el.classList.remove(this.getResponsiveClass());

        // apply width ranges
        var isWidthCalc = this.getDimension() === this.DIMENSIONS.width;
        var isOverMin = width >= this.getMin();
        var isUnderMax = (width <= this.getMax() || this.getMax() === '*');
        if (isWidthCalc && isOverMin && isUnderMax) el.classList.add(this.getResponsiveClass());

        // apply height ranges
        var isHeightCalc = this.getDimension() === this.DIMENSIONS.height;
        var isOverMin = height >= this.getMin();
        var isUnderMax = (height <= this.getMax() || this.getMax() === '*');
        if (isHeightCalc && isOverMin && isUnderMax) el.classList.add(this.getResponsiveClass());
    };

    Prototype.destroy = function(){
        oem.events.removeEventListener(oem.EVENTS.COMPONENTS_INITIALIZED, this.responsify, this);
        oem.events.removeEventListener(oem.EVENTS.WINDOW_RESIZED, this.responsify, this);
    };
    
    
    // EXPORTS
    // ========================================================
    // Probably only want to export the prototype
    COMPONENTS.Responsify.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Component, oem.Core.Prototype);