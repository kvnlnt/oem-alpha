ToolhouseUI.Components = (function(Components, Core) {

    // Card component
    var CardTest = Object.create(Core.Test); // call super constructor
    CardTest.testComponent = 'th-card-test';

    // tests come first
    CardTest.isMobileResponsive = function(){
        CardTest.assert(true, true, 'is mobile response');
        CardTest.assert(true, false, 'is mobile response');
    };

    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        CardTest.runTestSuite([
            CardTest.isMobileResponsive
        ]);
    });

    // exports
    Components.CardTest = CardTest;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);

// ToolhouseUI.Components = (function(Components) {

//     const CardTest = {};
//     CardTest.type = Components.BaseConfig.TYPES.test;
//     Components.CardTest = CardTest;
//     return Components;

// })(ToolhouseUI.Components || {});

// const Test = require('./test');
// const Card = require('./card');
// const Css = require('./card.test.css');

// class CardTest extends Test {

//     constructor(options){
//       super(options);
//       this.run([
//         this.isMobileResponsive,
//         this.isTabletResponsive,
//         this.isDesktopResponsive
//       ])
//       .render();
//     }

//     isMobileResponsive(){
//       var card = new Card({dom:document.createElement("th-card")});
//       this.dom.className = "";
//       this.dom.classList.add('mobile');
//       this.dom.appendChild(card.dom);
//       card.responsify();
//       this.assert(true, card.dom.classList.contains('mobile'), "is mobile responsive");
//     }

//     isTabletResponsive(){
//       var card = new Card({dom:document.createElement("th-card")});
//       this.dom.className = "";
//       this.dom.classList.add('tablet');
//       this.dom.appendChild(card.dom);
//       card.responsify();
//       this.assert(true, card.dom.classList.contains('tablet'), "is tablet responsive");
//     }

//     isDesktopResponsive(){
//       var card = new Card({dom:document.createElement("th-card")});
//       this.dom.className = "";
//       this.dom.classList.add('desktop');
//       this.dom.appendChild(card.dom);
//       card.responsify();
//       this.assert(true, card.dom.classList.contains('desktop'), "is desktop responsive");
//     }

// };

// module.exports = CardTest;