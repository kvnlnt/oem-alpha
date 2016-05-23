oem.Components = (function(Components, Core) {

    // Accordion component
    var Accordion = Core.Prototype(Core.Component, {
        name: "Accordion",
        selector:"oem-accordion"
    });

    // params
    Accordion.expandClass = "expanded";
    Accordion.terms = [];
    Accordion.definitions = [];

    Accordion.init = function() {
        Core.Responsifier.addComponent(this);
        this.registerEvents();
    };

    Accordion.registerEvents = function() {
        var list = this.getEl();
        list.terms = list.querySelectorAll('dt');
        list.definitions = list.querySelectorAll('dd');
        var term;
        var definition;
        for (var i = 0; i < list.terms.length; i = i + 1) {
            term = list.terms[i];
            Accordion.terms.push(term);
            definition = list.definitions[i];
            Accordion.definitions.push(definition);
            term.isExpanded = definition.classList.contains(this.expandClass);
            term.definition = list.definitions[i];
            term.addEventListener('click', this.toggle.bind(this));
        }
        return this;
    };

    Accordion.getTerm = function(i){
        return this.terms[i];
    };

    Accordion.getDefinition = function(i){
        return this.definitions[i];
    };

    Accordion.toggle = function(e) {
        if (e.preventDefault) e.preventDefault(); // catch for event triggered
        var term = e.target;
        this.contractEverything();
        if (term.isExpanded) {
            this.contract(term);
        } else {
            this.expand(term);
        }
        return this;
    };

    Accordion.expand = function(term) {
        term.definition.classList.add(this.expandClass);
        term.isExpanded = true;
        return this;
    };

    Accordion.contract = function(term) {
        term.definition.classList.remove(this.expandClass);
        term.isExpanded = false;
        return this;
    };

    Accordion.contractEverythingBut = function(term) {
        var list = this.getEl();
        var currentTerm;
        for (var i = 0; i < list.terms.length; i = i + 1) {
            currentTerm = list.terms[i];
            if (currentTerm != term) {
                this.contract(currentTerm);
            }
        }
        return this;
    };

    Accordion.contractEverything = function(){
        var list = this.getEl();
        var currentTerm;
        for (var i = 0; i < list.terms.length; i = i + 1) {
            currentTerm = list.terms[i];
            this.contract(currentTerm);
        }
        return this;
    };

    Components.Accordion = Accordion;
    return Components;

})(oem.Components || {}, oem.Core);
