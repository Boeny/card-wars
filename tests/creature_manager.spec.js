var CreatureManager = require('../creature_manager');
var Creature = require('../creature');

module.exports = {
	'initialization(params)': {
		'doesn\'t generate creatures by default (while {createAtStartCount: Number} is not set)': ()=>{
			return [new CreatureManager().pool.length, 0];
		},
		'doesn\'t generate creatures even if {maxCount: 2} is set': ()=>{
			return [new CreatureManager({maxCount: 2}).pool.length, 0];
		},
		'generates some creatures with {createAtStartCount: 2}': ()=>{
			return [new CreatureManager({
				createAtStartCount: 2,
				getCreature: Creature.create
			}).pool.length, 2];
		},
		'generates max count of creatures with {createAtStartCount: 10, maxCount: 2}': ()=>{
			return [new CreatureManager({
				createAtStartCount: 10,
				maxCount: 2,
				getCreature: Creature.create
			}).pool.length, 2];
		}
	},
	'"create(count)" method': {
		'doesn\'t generate creatures if count and maxCount are not set': ()=>{
			return [new CreatureManager({
				getCreature: Creature.create
			}).create().pool.length, 0];
		},
		'generates max count (2) of creatures by default': ()=>{
			return [new CreatureManager({
				maxCount: 2,
				getCreature: Creature.create
			}).create().pool.length, 2];
		},
		'generates more(4) creatures with {createAtStartCount: 2}': ()=>{
			return [new CreatureManager({
				createAtStartCount: 2,
				getCreature: Creature.create
			}).create().pool.length, 4];
		},
		'generates more(4) creatures with {createAtStartCount: 10, maxCount: 2}': ()=>{
			return [new CreatureManager({
				createAtStartCount: 10,
				maxCount: 2,
				getCreature: Creature.create
			}).create().pool.length, 4];
		},
		'generates max count (2) of creatures by count=10 argument': ()=>{
			return [new CreatureManager({
				maxCount: 2,
				getCreature: Creature.create
			}).create(10).pool.length, 2];
		},
		'generates some creatures by count=2 argument': ()=>{
			return [new CreatureManager({
				getCreature: Creature.create
			}).create(2).pool.length, 2];
		},
		'generates more(4) creatures with {createAtStartCount: 10, maxCount: 2} and count=3': ()=>{
			return [new CreatureManager({
				createAtStartCount: 10,
				maxCount: 2,
				getCreature: Creature.create
			}).create(3).pool.length, 4];
		}
	}
};