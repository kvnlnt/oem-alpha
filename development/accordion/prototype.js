(function(COMPONENTS, PROTOTYPE, COMPONENT) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Accordion"
    });

    // // DEFAULTS

    // Prototype.expandClass = "expanded";
    // Prototype.terms = [];
    // Prototype.definitions = [];

    // Prototype.init = function() {
    //     this.registerEvents();
    // };

    // Prototype.getTerms = function(){
    //     return this.terms;
    // };

    // Prototype.registerEvents = function() {
    //     var list = this.getEl();
    //     list.terms = list.querySelectorAll('dt');
    //     list.definitions = list.querySelectorAll('dd');
    //     var term;
    //     var definition;
    //     for (var i = 0; i < list.terms.length; i = i + 1) {
    //         term = list.terms[i];
    //         Prototype.terms.push(term);
    //         definition = list.definitions[i];
    //         Prototype.definitions.push(definition);
    //         term.isExpanded = definition.classList.contains(this.expandClass);
    //         term.definition = list.definitions[i];
    //         term.addEventListener('click', this.toggle.bind(this));
    //     }
    //     return this;
    // };

    // Prototype.getTerm = function(i){
    //     return this.terms[i];
    // };

    // Prototype.getDefinition = function(i){
    //     return this.definitions[i];
    // };

    // Prototype.toggle = function(e) {
    //     if (e.preventDefault) e.preventDefault(); // catch for event triggered
    //     var term = e.target;
    //     this.contractEverything();
    //     if (term.isExpanded) {
    //         this.contract(term);
    //     } else {
    //         this.expand(term);
    //     }
    //     return this;
    // };

    // Prototype.expand = function(term) {
    //     term.definition.classList.add(this.expandClass);
    //     term.isExpanded = true;
    //     return this;
    // };

    // Prototype.contract = function(term) {
    //     term.definition.classList.remove(this.expandClass);
    //     term.isExpanded = false;
    //     return this;
    // };

    // Prototype.contractEverythingBut = function(term) {
    //     var list = this.getEl();
    //     var currentTerm;
    //     for (var i = 0; i < list.terms.length; i = i + 1) {
    //         currentTerm = list.terms[i];
    //         if (currentTerm != term) {
    //             this.contract(currentTerm);
    //         }
    //     }
    //     return this;
    // };

    // Prototype.contractEverything = function(){
    //     var list = this.getEl();
    //     var currentTerm;
    //     for (var i = 0; i < list.terms.length; i = i + 1) {
    //         currentTerm = list.terms[i];
    //         this.contract(currentTerm);
    //     }
    //     return this;
    // };

    COMPONENTS.Accordion.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Prototype, oem.Core.Prototypes.Component);
