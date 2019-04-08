module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://10.36.136.231:8080',
                changeOrigin: true
            }
        }
    }
}