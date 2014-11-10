module.exports = {
	min: {
      files: [{
          expand: true,
          cwd: 'www/tpl/',
          src: ['*.html', '**/*.html'],
          dest: 'dist/tpl/',
          ext: '.html',
          extDot: 'first'
      }]
  }
}