module.exports = {
  apps: [
    {
      name: 'kknaga',
      cwd: '/home/kkmet/kknaga',
      script: 'node_modules/.bin/serve',
      args: '-s out -l 3015',
      instances: 1,
      autorestart: true,
      exp_backoff_restart_delay: 200,
      watch: false,
      max_memory_restart: '500M',
      exec_mode: "fork",
    },
  ],
};
