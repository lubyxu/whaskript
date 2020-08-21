const {program} = require('commander');
const lint = require('./cli/lint');

program
	.option('--lint', 'lint files', lint)
	.parse(process.argv);