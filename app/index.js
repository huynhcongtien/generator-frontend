'use strict';

var path = require('path'),
    yo = require('yeoman-generator');


module.exports = yo.generators.Base.extend({
    constructor: function(arg, options) {
        yo.generators.Base.apply(this, arguments);

        this.on('end', function() {
            this.installDependencies({
                skipInstall: options['skip-install']
            });
        });

        this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
        this.bwr = JSON.parse(this.readFileAsString(path.join(__dirname, '/templates/bowerrc')));
    },

    askFor: function() {
        var cb = this.async();

        var prompts = [
            {
                name: 'projectName',
                message: 'Project Name',
                default: path.basename(process.cwd())
            },
            {
                name: 'lang',
                message: 'Project Language',
                default: 'ru'
            }
        ];

        this.prompt(prompts, function(props) {
            for (var prop in props) {
                if (props.hasOwnProperty(prop)) {
                    this[prop] = props[prop];
                }
            }

            cb();
        }.bind(this));

    },

    scaffold: function() {
        this.directory('src/', 'src/');

        this.mkdir('src/fonts');
        this.mkdir('src/img/sprites/2x');

        this.copy('_gitignore', '.gitignore');
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
        this.copy('bowerrc', '.bowerrc');

        this.template('_bower.json', 'bower.json');
        this.template('_package.json', 'package.json');
        this.template('_Gruntfile.js', 'Gruntfile.js');
        this.template('_index.ejs', 'src/pages/index.ejs');
    }
});
