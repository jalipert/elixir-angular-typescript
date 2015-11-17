var gulp = require('gulp');
var elixir = require('laravel-elixir');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var _ = require('underscore');

// Laravel Elixir Reporter
var _laravelReporter = require('./reporter');

var Task = elixir.Task;

elixir.extend('angulartypescript', function (output, dest, options) {

    var pluginName = 'angulartypescript';
    var assetPath = './' + elixir.config.assetsPath;
    
    var libraryTypeScriptDefinitions = './tools/typings/**/*.ts';    

    options = _.extend({
        sortOutput: true
    }, options);
    
    new Task(pluginName, function () {
        var tsResult = gulp.src([
            libraryTypeScriptDefinitions,            
            assetPath + '/*.module.ts',
            assetPath + '/**/*.module.ts',
            assetPath + '/**/*.ts'
        ])
        .pipe(ts(options, undefined, _laravelReporter.ElixirMessage()));
      
        return tsResult
            .pipe(concat(output))
            .pipe(gulp.dest(dest || './public/js/app.js'));
    })
    .watch(assetPath +  '/**/*.ts');
});