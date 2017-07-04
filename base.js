global._for = function(init, count, callback){
	if (typeof count == 'function'){
		callback = count;
		count = init;
		init = 0;
	}
	
	for (var i = init; i < count; i++){
		if (callback(i) === false) break;
	}
};

global.foreach = function(arr, callback){
	for (var i in arr){
		if (callback(arr[i], i) === false) break;
	}
};

global.in_array = function(v, arr){
	return arr.indexOf(v) > -1;
};

global.merge = function(dest, src, fields){
	foreach (src, (v, f) => {
		if (!fields || in_array(f, fields)){
			dest[f] = v;
		}
	});
	return dest;
};

global.random = function(min, max){
	return Math.round((max - min) * Math.random()) + min;
};

/*cards = {
	count: Number,
	types: Number,
	playersCount: Number
}
stats = {
	energy: Number,
	off: Number,
	def: Number
}
buffs = {
	incStat: Function,
	decStat: Function,
	...res
}
res = {
	inc,
	dec
}
skills = {
	...someSkills,
	castHelp: Function,
	incHelp: Function,
	sleep: Function
}
interface = {
	target: Object,
	count: Number,
	condition: boolean
}
resources = {
	...stats,
	...someSkills,
	...someRes
}*/