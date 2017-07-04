require('../base');
var res;

module.exports = {
	'_for (count,callback(index))': {
		'iterates callback count times':()=>{
			res = 0;
			_for (5, (i)=>{res=i});
			return [res, 4];
		},
		'breaks if callback returns false':()=>{
			res = 0;
			_for (5, (i)=> i < 2 ? res=i : false);
			return [res, 1];
		}
	},
	'foreach (arr/obj, callback(el,key))': {
		'iterates the array through its elements':()=>{
			res = '';
			foreach (['a','b'], (el,i)=> res += el+i);
			return [res,'a1b2'];
		},
		'iterates the object as (value, key)':()=>{
			res = '';
			foreach ({a:1,b:2}, (v,f)=> res += f+v);
			return [res,'a1b2'];
		},
		'breaks if callback returns false':()=>{
			res = '';
			foreach ([1,2,3], (el,i)=> el == 2 ? false : res=el);
			return [res,1];
		}
	},
	'in_array (v, arr)': {
		'returns true if 1 in [1]': () => [in_array(1,[1]),true],
		'returns false if 1 not in [11]': () => [in_array(1,[11]),true],
		'returns true if \'999\' in [999,\'999\']': () => [in_array('999',[999,'999']),true],
		'returns false if \'a\' not in [999,\'999\']': () => [in_array('a',[999,'999']),false],
	},
	'random (min, max): generates random value between min and max': {
		'-10, 10': () => -10 <= random(-10, 10) && random(-10, 10) <= 10,
		'0, 99': () => 0 <= random(0, 99) && random(0, 99) <= 99,
		'random(1, 1) === 1': () => [random(1, 1), 1]
	},
	'merge (obj1, obj2)': {
		'merges {} and {a:1,b:2} and returns the copy of it': () => [JSON.stringify(merge({}, {a:1,b:2})), '{"a":1,"b":2}'],
		'merges {a:4,c:3} and {a:1,b:2} and returns {a:1,b:2,c:3}': () => {
			res = {a:4,c:3};
			merge(res, {a:1,b:2});
			return [JSON.stringify(res), '{"a":1,"c":3,"b":2}'];
		}
	}
};
