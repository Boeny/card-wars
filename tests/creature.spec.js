var Creature = require('../creature');

module.exports = {
	'static "create(index, params)" method creates a new creature': {
		'with positive energy': (assert)=>{
			assert.isAtLeast(Creature.create().energy, 50);
		},
		'with positive offence': (assert)=>{
			assert.isAtLeast(Creature.create().offence, 0);
		},
		'with positive defence': (assert)=>{
			assert.isAtLeast(Creature.create().defence, 0);
		}
	}
};
