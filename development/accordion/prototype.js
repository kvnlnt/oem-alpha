(function (COMPONENTS, PROTOTYPE, COMPONENT) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Accordion"
    });

    Prototype.init = function () {

        var that = this;
        this.items = [];
        this.dts = this.getEl().querySelectorAll('dt');
        this.dds = this.getEl().querySelectorAll('dd');

        // add items (use for loop to accomodate array like object collection)
        for(var i = 0; i < this.dts.length; i = i + 1 ){
            var item = new this.Item({
                term: this.getDts()[i].innerHTML,
                definition: this.getDts()[i].innerHTML,
                dt: this.getDts()[i],
                dd: this.getDds()[i],
                expanded: this.getDds()[i].classList.contains("expanded"),
                list: this
            });
            this.addItem(item);
        }

        return this;
    };

    Prototype.Item = function (options) {
        this.list = options.list;
        this.term = options.term;
        this.definition = options.definition;
        this.dt = options.dt;
        this.dd = options.dd;
        this.expanded = options.expanded;
        this.init();
        return this;
    };

    Prototype.Item.prototype = {
        init: function () {
            this.getDt().addEventListener('click', this.toggle.bind(this));
        },
        getTerm: function () {
            return this.term;
        },
        getDefinition: function () {
            return this.definition;
        },
        getDt: function () {
            return this.dt;
        },
        getDd: function () {
            return this.dd;
        },
        getList: function () {
            return this.list;
        },
        isExpanded: function () {
            return this.expanded;
        },
        setExpanded: function (expanded) {
            this.expanded = expanded;
        },
        toggle: function () {
            this.getList().collapseAll(this);
            if (this.isExpanded()) {
                this.collapse();
            } else {
                this.expand();
            }
            return this;
        },
        expand: function () {
            this.getDd().classList.add("expanded");
            this.setExpanded(true);
            return this;
        },
        collapse: function () {
            this.getDd().classList.remove("expanded");
            this.setExpanded(false);
            return this;
        }
    };

    Prototype.getDds = function () {
        return this.dds;
    };

    Prototype.getDts = function () {
        return this.dts;
    };

    Prototype.getItems = function () {
        return this.items;
    };

    Prototype.getItem = function (i) {
        return this.getItems()[i];
    };

    Prototype.addItem = function (item) {
        this.getItems().push(item);
        return this;
    };

    Prototype.collapseAll = function (item) {
        this.getItems().forEach(function (currItem) {
            if (item.getTerm() != currItem.getTerm()) currItem.collapse();
        });
        return this;
    };

    COMPONENTS.Accordion.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Prototype, oem.Core.Component);