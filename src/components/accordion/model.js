oem.Components = (function(Components, Core) {

    // Card component
    var Accordion = Object.create(Core.Component); // call super constructor.
    Accordion.name = "Accordion";
    Accordion.selector = "oem-accordion";
    Accordion.expandClass = "expanded";

    Accordion.init = function() {
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
            definition = list.definitions[i];
            term.isExpanded = definition.classList.contains(this.expandClass);
            term.definition = list.definitions[i];
            term.addEventListener('click', this.toggle.bind(this));
        }
        return this;
    };

    Accordion.toggle = function(e) {
        if (e.preventDefault) e.preventDefault(); // catch for event triggered
        var term = e.target;
        if (term.isExpanded) {
            this.contract(term);
        } else {
            this.expand(term);
        }
        this.contractEverythingBut(term);
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
