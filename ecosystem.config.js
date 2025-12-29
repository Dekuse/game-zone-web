module.exports = {
  apps: [{
    name: 'game-zone-web',
    script: 'node_modules/@vue/cli-service/bin/vue-cli-service.js',
    args: 'serve',
    env: {
      NODE_ENV: 'development',
      HOST: '0.0.0.0',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      HOST: '0.0.0.0',
      PORT: 3000
    }
  }]
};
