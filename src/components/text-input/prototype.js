(function(COMPONENTS, PROTOTYPE, FIELD, EL) {

    var Prototype = PROTOTYPE(FIELD, {
        type: "TextInput"
    });

    // INIT

    Prototype.init = function(){

        // config params
        this
        .setLabel(this.getEl().dataset.oemLabel)
        .setHelp(this.getEl().dataset.oemHelp)
        .setName(this.getEl().dataset.oemName)
        .setPlaceholder(this.getEl().dataset.oemPlaceholder)
        .setValue(this.getEl().dataset.oemValue)
        .setValidations(this.getValidationsFromEl())
        .setField(this.setup());

        // events
        this.getField().addEventListener('input', this.handleInputChange.bind(this)); // get the input field
    };

    Prototype.setup = function(){

        // create elements
        var label = new EL("label", { for:this.getName()}, this.getLabel());
        var help = new EL("div", { class:"help"}, this.getHelp());
        var input = new EL("input", {type:"text", name:this.getName(), placeholder:this.getPlaceholder()});
        var errors = new EL("ul", {class:"errors"});

        // attach elements
        this.getEl().appendChild(label);
        this.getEl().appendChild(help)
        this.getEl().appendChild(input)
        this.getEl().appendChild(errors);

        // return the input field
        return input;
    };

    Prototype.handleInputChange = function(){
        var currValue = this.getField().value;
        this.setValue(currValue).validate();
    };

    COMPONENTS.TextInput.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Modules.Prototype, oem.Core.Prototypes.Field, oem.Core.Modules.El);