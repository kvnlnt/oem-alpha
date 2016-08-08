(function(Core) {

    var Test = {};
    Test.name = null;
    Test.testComponent = null;

    Test.runTestSuite = function(testSuiteName, testSuite){

        // create container
        var testSuiteName = testSuiteName || '';
        var el = document.querySelector('[data-oem-test="'+this.testComponent+'"]');
        var h3 = document.createElement('h3');
        h3.classList.add('oem');
        h3.innerText = testSuiteName;
        el.appendChild(h3);
        var ul = document.createElement('ul');
        el.appendChild(ul);
        function noop(){ return false; }

        // run tests
        if(this.hasOwnProperty('beforeAll')) this.afterAll();
        for(var i = 0; i < testSuite.length; i++){
            if(this.hasOwnProperty('beforeEach')) this.beforeEach();
            testSuite[i]();
            if(this.hasOwnProperty('afterEach')) this.afterEach();
        }
        if(this.hasOwnProperty('afterAll')) this.afterAll();
        
    };

    Test.assert = function(msg, a, b){
        var ul = document.querySelector('[data-oem-test="'+this.testComponent+'"]' + ' ul');
        ul.classList.add('oem');
        var li;
        if(a === b){
            li = document.createElement('li');
            li.classList.add('test-pass');
            li.classList.add('oem');
            li.innerHTML = "&#10003; " + msg;
        } else {
            li = document.createElement('li');
            li.classList.add('test-fail');
            li.classList.add('oem');
            li.innerHTML = "&#10007; " + msg;
        }
        ul.appendChild(li);
    };

    var css = [

        {
            selector: '',
            declaration: [
                "margin:20px 0px",
                "font-size:14px"
            ]
        },
        {
            selector: ".test-pass",
            declaration: [
                "color:black"
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

    Core.Modules.Css.render('Test', css);
    Core.Modules.Test = Test;
    return Core;

})(oem.Core);

