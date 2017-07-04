var assert = require('chai').assert;

function test(tests){
	for (var title in tests){
		describe(title, ()=>{
			var subtests = tests[title];
			
			for (var text in subtests){
				it(text, ()=>{
					var res = subtests[text]();
					
					if (res instanceof Array){
						assert.equal(res[0],res[1]);
						return;
					}
					
					if (typeof res == 'boolean'){
						assert(res);
					}
				});
			}
		});
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
		describe(name, ()=>{
			test(modules[name]);
		});
	}
};