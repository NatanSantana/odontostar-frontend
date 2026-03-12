const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  devServer: {
    host: '0.0.0.0',
    allowedHosts: 'all',
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'
    }
  }
});