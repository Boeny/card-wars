require('./base');

var Field = require('./field_type')('CARDS');
var Creature = require('./creature');
var CreatureManager = require('./creature_manager');

var creatures = new CreatureManager({
	maxCount: Field.getMaxCount(),
	getCreature: Creature.create
});
creatures.create();

_for(1, () => {creatures.fight()});
