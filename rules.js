require('./base');

var Field = require('./field_type')('CARDS');
var Creature = require('./creature');

function createCreature(i, params){
	var mod = {
		off: random(0, 100),
		def: random(0, 100),
		eng: random(0, 20)
	};
	
	var defaults = {
		index: i,
		getDistance: Field.getDistance,
		create: createCreature,
		
		range: 0,
		energy: random(50, 100),
		offence: random(1, 10),
		defence: random(1, 10),
		
		modify: function(){
			this.oldParams = merge({}, this, ['offence','defence','energy']);
			this.offence += mod.off - 50;
			this.defence += mod.def - 50;
			this.energy += mod.eng - 10;
		}
	};
	
	return new Creature(merge(defaults, params || {}));
}

var CreatureManager = require('./creature_manager');

var creatures = new CreatureManager({
	maxCount: Field.getMaxCount(),
	createAtStartCount: 10,
	getCreature: createCreature
});

creatures.getResult();
_for(1, () => {creatures.fight()});
creatures.getResult();
