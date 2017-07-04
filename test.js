var assert = require('chai').assert;
require('./base');

var test = function(title, tests){
	describe(title, ()=>{
		var res;
		for (var text in tests){
			it(text, ()=>{
			res = tests[text]();
			assert.equal(res[0],res[1]);
			});
		}
	});
};

test('_for (count,callback(index))', {
	'iterates callback count times':()=>{
		var res = 0;
		_for (5, (i)=>{res=i});
		return [res, 4];
	},
	'breaks if callback returns false':()=>{
		var res = 0;
		_for (5, (i)=>i<2?res=i:false);
		return [res, 1];
	}
});

test('foreach (arr/obj, callback(el,key))', {
	'iterates the array through its elements':()=>{
		var res = '';
		foreach (['a','b'], (el,i)=>res+=el+i);
		return [res,'a1b2'];
	},
	'iterates the object as (value, key)':()=>{
		var res = '';
		foreach ({a:1,b:2}, (v,f)=>res+=f+v);
		return [res,'a1b2'];
	},
	'breaks if callback returns false':()=>{
		var res = '';
		foreach ([1,2,3], (el,i)=>el==2?false:res=el);
		return [res,1];
	}
});

test('', {
	'':()=>{
	}
});
