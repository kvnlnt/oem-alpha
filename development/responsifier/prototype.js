(function(COMPONENTS, COMPONENT, PROTOTYPE) {


    // PROTOTYPE

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Responsifier"
    });

    Prototype.DIMENSIONS = {
        width: "width",
        height: "height"

    };

    // INIT
    // ========================================================
    Prototype.init = function(){
        this.component = this.getEl().dataset.oemComponent;
        this.container = this.getEl().dataset.oemContainer || this.component;
        this.responsiveClass = this.getEl().dataset.oemResponsiveClass;
        this.dimension = this.getEl().dataset.oemDimension;
        this.min = this.getEl().dataset.oemMin;
        this.max = this.getEl().dataset.oemMax;
        oem.events.addEventListener(oem.EVENTS.COMPONENTS_INITIALIZED, this.responsifier, this);
        oem.events.addEventListener(oem.EVENTS.WINDOW_RESIZED, this.responsifier, this);
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

    Prototype.getContainer = function(){
        return this.container;
    };

    Prototype.getContainerEl = function(){
        var isOemComponent = oem.read(this.getContainer());
        if(isOemComponent){
            return isOemComponent.getEl();
        } else {
            // if we didn't find it, it should at least be a valid DOM id
            return document.getElementById(this.getContainer());
        }
        return this.watch;
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

    Prototype.setWatch = function(watch){
        this.watch = watch;
        return this;
    };

    // METHODS
    // ========================================================
    Prototype.responsifier = function(){
        var el = this.getComponent().getEl();
        var container = this.getContainerEl();
        var width = container.offsetWidth;
        var height = container.offsetHeight;
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
        oem.events.removeEventListener(oem.EVENTS.COMPONENTS_INITIALIZED, this.responsifier, this);
        oem.events.removeEventListener(oem.EVENTS.WINDOW_RESIZED, this.responsifier, this);
    };
    
    // EXPORTS
    // ========================================================
    // Probably only want to export the prototype
    COMPONENTS.Responsifier.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Component, oem.Core.Prototype);