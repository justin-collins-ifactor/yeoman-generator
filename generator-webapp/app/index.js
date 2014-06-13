'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var WebappGenerator = yeoman.generators.Base.extend({
	init: function () {
		this.pkg = require('../package.json');

		this.on('end', function () {
			if (!this.options['skip-install']) {
				this.installDependencies();
			}
		});
	},

	welcome: function(){
		if (!this.options['skip-welcome-message']) {
			this.log(
				chalk.magenta('Custom webapp installer. \n')
			);
		}
	},

	askFor: function () {
		var done = this.async();

		var prompts = [{
            name: 'appname',
            message: 'What is your app\'s name?'
        }];

		this.prompt(prompts, function (props) {
			this.appname = this._.camelize(this._.slugify(this._.humanize(props.appname)));

			done();
		}.bind(this));
	},

	app: function () {
		this.directory('templates/app', 'dev');

		this.mkdir('dev/assets');
		this.mkdir('dev/assets/fonts');
		this.mkdir('dev/assets/images');
		this.mkdir('dev/assets/images/_builders');
		this.mkdir('dev/assets/images/global');
	},

	projectfiles: function () {
		var join = path.join;

		this.sourceRoot(join(__dirname, 'templates/root'));
		this.copy('_editorconfig', '.editorconfig');
		this.copy('_jshintrc', '.jshintrc');
		this.copy('_gitignore', '.gitignore');
		this.copy('_bowerrc', '.bowerrc');

		this.template('_bower.json', 'bower.json');
		this.template('_package.json', 'package.json');
		this.template('_Gruntfile.js', 'Gruntfile.js');
	}
});

module.exports = WebappGenerator;