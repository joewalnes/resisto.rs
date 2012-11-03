// Very simple unit-test library, with zero deps. Results logged to console.
// -jwalnes
var failures = 0;
var TinyTest = {
    run: function(suiteName, tests) {
        for (var testName in tests) {
            var testAction = tests[testName];
            try {
                testAction.apply(this);
                console.log('Suite:', suiteName, 'Test:', testName, 'OK');
            } catch (e) {
                failures++;
                console.error('Suite:', suiteName, 'Test:', testName, 'FAILED');
                console.error(e.stack);
            }
        }
        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
            }
        }, 0);
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

    assertStructure: function(expected, actual) {
	this.assertEquals(JSON.stringify(expected), JSON.stringify(actual));
    },

};