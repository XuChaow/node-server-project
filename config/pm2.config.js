module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: "node-server",
      script: "./bin/www",
      watch: true,
      ignore_watch: [
        "public",
        "test",
        "logs",
        "node_modules"
      ],
      instances: 0,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      error_file: "./logs/pm2-err.log",
      out_file: "./logs/pm2-out.log",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: "node",
      host: ["212.83.163.1"],
      ref: "origin/master",
      repo: "git@github.com:repo.git",
      path: "/var/www/production",
      "post-deploy": "npm install && npm run prod",
      env: {
        NODE_ENV: "production"
      }
    },
    development: {
      user: "node",
      host: "212.83.163.1",
      ref: "origin/develop",
      repo: "git@github.com:repo.git",
      path: "/var/www/development",
      ssh_options: "StrictHostKeyChecking=no, PasswordAuthentication=no",
      "post-setup": "cnpm install && npm run prod",
      "post-deploy": "cnpm install && npm run prod",
      env: {
        NODE_ENV: "development"
      }
    }
  }
}

