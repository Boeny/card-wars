var types = {
	CARDS: {
		count: 2,
		getMaxCount: function(){
			return this.count;
		},
		getDistance: function(){
			return 0;
		}
	},
	FIELD: {
		rows: null,
		cols: null,
		getMaxCount: function(){
			return this.rows * this.cols;
		},
		getDistance: function(){
			
		}
	},
	HEX: {
		size: null,
		getMaxCount: function(){
			return this.size;
		},
		getDistance: function(){
			
		}
	}
};

module.exports = function(name, params){
	var type = types[name];
	if (!params) return type;
	
	merge(type, params);
	
	return type;
};