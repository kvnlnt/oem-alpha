ToolhouseUI.Core = (function(Core) {

    var Test = {};
    Test.name = null;
    Test.testComponent = null;

    Test.runTestSuite = function(testSuite){

        // create container
        var el = document.querySelector('.' + this.testComponent);
        var ul = document.createElement('ul');
        el.appendChild(ul);
        function noop(){ return false; }

        // run tests
        for(var i = 0; i < testSuite.length; i++){
            testSuite[i]();
        }
        


    };

    Test.assert = function(msg, a, b){
        var ul = document.querySelector('.' + this.testComponent + ' ul');
        var li;
        if(a === b){
            li = document.createElement('li');
            li.classList.add('test-pass');
            li.innerHTML = "&#10003; " + msg;
        } else {
            li = document.createElement('li');
            li.classList.add('test-fail');
            li.innerHTML = "&#10007; " + msg;
        }
        ul.appendChild(li);
    };

    var css = [

        {
            selector: ".test",
            declaration: [
                "margin:20px 0px",
                "font-size:14px"
            ]
        },
        {
            selector: ".test-pass",
            declaration: [
                "color:grey"
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
        id: 'th-test-css',
        css: css
    });

    Core.Test = Test;
    return Core;

})(ToolhouseUI.Core || {});

