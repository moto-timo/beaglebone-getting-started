module.exports = function(grunt) {

    grunt.initConfig({
        nodewebkit: {
            options: {
                version: '0.12.2',
                buildDir: './build',
                macIcns: './App/beaglebone-getting-started.icns',
                platforms: ['win', 'osx', 'linux'] // builds both 32 and 64 bit versions
            },
            src: ['./App/**', './Docs/**', './README.htm']
        },

        remotefile: {
            "jquery": {
                url:'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js',
                dest:'App/js/jquery.min.js'
            },
            "bootstrap-js": {
                url:'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js',
                dest:'App/css/bootstrap.min.js'
            },
            "font-awesome": {
                url:'http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css',
                dest:'App/css/font-awesome.min.css'
            },
            "bootstrap-pingendo-theme": {
                url:'http://pingendo.github.io/pingendo-bootstrap/themes/default/bootstrap.css',
                dest:'App/css/bootstrap.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-remotefile');

    grunt.registerTask('build', ['nodewebkit']);
    grunt.registerTask('getdependencies', ['remotefile']);
    grunt.registerTask('test', []);

};
