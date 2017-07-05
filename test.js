require('./tester')({
	'global.': require('./tests/base.spec'),
	'Creature class': require('./tests/creature.spec'),
	'Creature manager class': require('./tests/creature_manager.spec')
});
