module.exports = {
  apps: [{
    name: 'orbitblu',
    script: 'src/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      MONGODB_URI: 'mongodb://orbitbluadmin:Secure2025!@localhost:27017/orbitblu?authSource=admin'
    }
  }]
};
