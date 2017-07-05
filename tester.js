var assert = require('chai').assert;

function run_test(text, callback){
	it(text, function(){
		var res = callback(assert);
		if (res === undefined) return;
		
		if (res instanceof Array){
			assert[res[0] && typeof res[0] == 'object' ? 'deepEqual' : 'equal'](res[0], res[1], res[2]);
			return;
		}
		
		assert.isTrue(res);
	});
}

function describe_tests(title, subtests){
	describe(title, function(){
		for (var text in subtests){
			run_test(text, subtests[text]);
		}
	});
}

function test(tests){
	for (var title in tests){
		describe_tests(title, tests[title]);
	}
};

function obj_val(o){
	return o[Object.keys(o)[0]];
}

module.exports = function(modules){
	if (typeof obj_val(obj_val(modules)) == 'function'){// tests -> subtests -> function
		test(modules);
		return;
	}
	
	for (var name in modules){
		((tests) => {describe(name, ()=>{test(tests)})})(modules[name]);
	}
};