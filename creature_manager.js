var CreatureManager = function(params){
	this.init(params);
	
	if (this.createAtStartCount > 0){
		if (!this.maxCount) this.maxCount = this.createAtStartCount;
		this.create(this.createAtStartCount);
	}
};

CreatureManager.prototype = {
	constructor: CreatureManager,
	init: function(params){
		this.maxCount = 0;
		this.createAtStartCount = 0;
		this.getCreature = null;
		this.pool = [];
		merge(this, params);
	},
	
	create: function(count){
		count = count || this.maxCount;
		
		_for (count, (i) => {
			if (this.maxCount && i == this.maxCount) return false;
			this.pool.push(this.getCreature(i, {pool: this.pool}));
		});
		
		return this;
	},
	
	fight: function(){
		foreach (this.pool, (c1) => {
			foreach (c1.getInRange(), (c2) => {
				c1.fight(c2);
			});
		});
	}
};

module.exports = CreatureManager;