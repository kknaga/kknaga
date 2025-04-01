module.exports = {
  apps: [
    {
      name: 'kknaga',
      script: 'node_modules/next/dist/bin/next',
      args: 'start --port 3015',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
      exec_mode: "fork",
      user: 'kkmet',
    },
  ],
};