	module.exports = {
	  devServer: {
	    proxy: {
				'/api': {
	        target: 'https://h5.tfryb.com',
					changeOrigin:true,
	        pathRewrite: {
	          '^/api': '/'
	        }
	      }
	    },
	  }
	}
