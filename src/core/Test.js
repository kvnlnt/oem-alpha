ToolhouseUI.Core = (function(Core) {

    var Test = {};
    Test.testComponent = null;

    Test.runTestSuite = function(testSuite){

        // create container
        var ul = document.createElement('ul');
        var el = document.querySelector('.' + this.testComponent);
        el.appendChild(ul);

        // run tests
        for(var i = 0; i < testSuite.length; i++){
            testSuite[i]();
        }

    };

    Test.assert = function(a, b, msg){
        var ul = document.querySelector('.' + this.testComponent + ' ul');
        var li;
        if(a === b){
            li = document.createElement('li');
            li.classList.add('test-pass');
            li.innerHTML = msg;
        } else {
            li = document.createElement('li');
            li.classList.add('test-fail');
            li.innerHTML = msg;
        }
        ul.appendChild(li);
    };

    var css = [

        {
            selector: ".test",
            declaration: [
                "margin:20px 0px",
                "font-style:oblique"
            ]
        },
        {
            selector: ".test-pass",
            declaration: [
                "color:green"
            ]
        },
        ,
        {
            selector: ".test-fail",
            declaration: [
                "color:red"
            ]
        }

    ];

    // add to css renderer
    Core.Css.add({
        id: 'th-test',
        css: css
    });


    Core.Test = Test;
    return Core;
    

})(ToolhouseUI.Core || {});

