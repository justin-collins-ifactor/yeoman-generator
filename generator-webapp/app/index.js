'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var WebappGenerator = yeoman.generators.Base.extend({
	init: function () {
		this.pkg = require('../package.json');

		this.on('end', function () {
			this.installDependencies({
				skipInstall: this.options['skip-install'],
				callback: function () {
					//this.spawnCommand('grunt', ['build']);
				}.bind(this)
			});
		});
	},

	welcome: function(){
		if (!this.options['skip-welcome-message']) {
			this.log(yosay());
			this.log(chalk.magenta('KUBRA Front End Team webapp bootstrapper. \n'));
		}
	},

	askFor: function () {
		var done = this.async();

		var prompts = [{
            name: 'appname',
            message: 'What is your app\'s name?'
        },{
            name: 'componentName',
            message: 'What is your first component name?'
        }];

		this.prompt(prompts, function (props) {
			this.appname = this._.camelize(this._.slugify(this._.humanize(props.appname)));
			this.componentName = this._.camelize(this._.slugify(this._.humanize(props.componentName)));
			this.componentNameCap = this._.capitalize(this.componentName);

			done();
		}.bind(this));
	},

	app: function () {
		this.directory('app/js', 'dev/js');
		this.directory('app/sass', 'dev/sass');
		this.copy('app/index.html', 'dev/index.html');

		this.mkdir('dev/shared');
		this.mkdir('dev/shared/constants');
		this.mkdir('dev/shared/directives');
		this.mkdir('dev/assets');
		this.mkdir('dev/assets/fonts');
		this.mkdir('dev/assets/images');
		this.mkdir('dev/assets/images/_builders');

		this.mkdir('dev/components/'+this.componentName);
		this.copy('app/components/sample/SampleCtrl.js', 'dev/components/'+this.componentName+'/'+this.componentNameCap+'Ctrl.js');
		this.copy('app/components/sample/SampleService.js', 'dev/components/'+this.componentName+'/'+this.componentNameCap+'Service.js');
		this.copy('app/components/sample/_SampleStyles.scss', 'dev/components/'+this.componentName+'/_'+this.componentNameCap+'Styles.scss');
		this.copy('app/components/sample/SampleView.tpl.html', 'dev/components/'+this.componentName+'/'+this.componentNameCap+'View.tpl.html');
	},

	projectfiles: function () {
		//var join = path.join;
		//this.sourceRoot(join(__dirname, 'templates/root'));

		this.directory('root/test', 'test');
		this.copy('root/_editorconfig', '.editorconfig');
		this.copy('root/_jshintrc', '.jshintrc');
		this.copy('root/_gitignore', '.gitignore');
		this.copy('root/_bowerrc', '.bowerrc');

		this.template('root/_bower.json', 'bower.json');
		this.template('root/_package.json', 'package.json');
		//this.copy('root/_Gruntfile.js', 'Gruntfile.js');

		//similar to template, but replaces only the appname
		var indexFile = this.readFileAsString(__dirname+'/templates/root/_Gruntfile.js');
		indexFile = indexFile.replace(new RegExp('<%= appname %>', 'g'), this.appname);
		this.write('Gruntfile.js',indexFile);
	}
});

module.exports = WebappGenerator;