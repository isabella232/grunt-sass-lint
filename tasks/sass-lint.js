'use strict';
var path = require('path'),
	lint = require('sass-lint');

module.exports = function (grunt) {
	grunt.verbose.writeln('\n' + lint.info + '\n');

	grunt.registerMultiTask('sasslint', 'Lint your Sass', function () {
		var opts = this.options({
				configFile: ''
			});
		var results = [];

		for (var i = 0; i < this.filesSrc.length; i++) {
			results = results.concat(lint.lintFiles(this.filesSrc[i], opts, opts.configFile));
		}

		var failResultCount = lint.resultCount(results);
		var resultFormat = lint.format(results, { options: opts });

		if (failResultCount > 0) {
			if(opts['outputFile']) {
				opts['output-file'] = opts['outputFile'];
				lint.outputResults(results, { options: opts });
				grunt.fail.warn('');
			} else {
				grunt.log.writeln(resultFormat);
				grunt.fail.warn('');
			}
		}
	});
};
