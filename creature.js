var Creature = function(params){
	this.init(params);
};

Creature.create = function(index, params){
	var mod = {
		off: random(0, 100),
		def: random(0, 100),
		eng: random(0, 20)
	};
	
	var defaults = {
		index: index,
		
		range: 0,
		energy: random(50, 100),
		offence: random(0, 10),
		defence: random(0, 10),
		
		modify: function(){
			this.oldParams = merge({}, this, ['offence','defence','energy']);
			this.offence += mod.off - 50;
			this.defence += mod.def - 50;
			this.energy += mod.eng - 10;
		}
	};
	
	return new Creature(merge(defaults, params || {}));
};

Creature.prototype = {
	init: function(params){
		this.getDistance = null;
		this.modify = null;
		this.pool = [];
		this.range = 0;
		this.energy = 0;
		this.index = 0;
		this.offence = 0;
		this.defence = 0;
		this.enemies = [];
		this.oldParams = null;
		merge(this, params);
	},
	
	getParams: function(){
		return merge({}, this, ['offence','defence','energy','range']);
	},
	
	getInRange: function(){
		var result = [];
		
		foreach (this.pool, (c) => {
			if (this.getDistance(c) <= this.range){
				result.push(c);
			}
		});
		
		return result;
	},
	
	kill: function(target){
		this.pool.splice((target || this).index, 1);
	},
	
	isDead: function(target){
		return (target || this).energy <= 0;
	},
	
	strikeWith: function(strength){
		strength -= this.defence;
		if (strength <= 0) return null;
		
		this.energy -= strength;
		
		if (this.isDead()) this.kill();
		return this.getParams();
	},
	
	fight: function(other){
		this.modify();
		other.modify();
		
		this.enemies.push({
			creature: other.getParams(),
			result: other.strikeWith(this.offence)
		});
		
		if (!other.isDead()){
			other.enemies.push({
				creature: this.getParams(),
				result: this.strikeWith(other.offence)
			});
		}
		
		this.restore();
		other.restore();
	},
	
	restore: function(){
		merge(this, this.oldParams);
	}
};

module.exports = Creature;