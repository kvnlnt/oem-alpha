(function(CORE) {

    var Test = {};
    Test.name = null;
    Test.testComponent = null;
    Test.testSuiteName = 'Test';

    Test.runTestSuite = function(testSuiteName, testSuite){

        // create container
        this.testSuiteName = testSuiteName || '';
        var el = document.querySelector('[data-oem-test="'+this.testComponent+'"]');
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
        var li;
        if(a === b){
            li = document.createElement('li');
            li.classList.add('test-pass');
            li.classList.add('test');
            li.innerHTML = this.testSuiteName + ": " + msg;
        } else {
            li = document.createElement('li');
            li.classList.add('test-fail');
            li.classList.add('test');
            li.innerHTML = this.testSuiteName + ": " + msg;
        }
        ul.appendChild(li);
    };

    CORE.Test = Test;
    return CORE;

})(oem.Core);

