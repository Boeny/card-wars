var CreatureManager = function(params){
	this.init(params);
	
	if (this.createAtStartCount > 0){
		this.create(this.createAtStartCount);
	}
};

CreatureManager.prototype = {
	constructor: CreatureManager,
	init: function(params){
		this.maxCount = 0;
		this.createAtStartCount = 0;
		this.creatureClass = null;
		this.getCreature = null;
		this.pool = [];
		merge(this, params);
	},
	
	create: function(count){
		_for (count, (i) => {
			if (i == this.maxCount) return false;
			this.pool.push(this.getCreature(i, {pool: this.pool}));
		});
	},
	
	fight: function(){
		foreach (this.pool, (c1) => {
			foreach (c1.getInRange(), (c2) => {
				c1.fight(c2);
			});
		});
	},
	
	getResult: function(){
		console.log(this.pool);
		foreach (this.pool, (c) => {
			console.log(c.enemies);
		});
	}
};

module.exports = CreatureManager;