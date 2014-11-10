module.exports = {
	app: {
        files: {
          'www/css/app.css': [
            'www/css/less/app.less'
          ]
        },
        options: {
          compile: true
        }
    },
    min: {
        files: {
            'dist/css/app.min.css': [
                'www/css/bootstrap.css',
                'www/css/*.css'
            ]
        },
        options: {
            compress: true
        }
    }
}