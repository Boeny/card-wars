var Creature = function(params){
	this.init(params);
};

Creature.prototype = {
	constructor: Creature,
	init: function(params){
		this.getDistance = null;
		this.create = null;
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
		target = target || this;
		var i = target.index;
		
		var params = {};//target.getParams();
		params.pool = this.pool;
		
		/*foreach (['offence','defence'], (f) => {
			params[f] += random(-1,1);
		});*/
		
		this.pool.splice(i, 1, this.create(i, params));
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