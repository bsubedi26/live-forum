module.exports = {
  host: 'localhost',
  port: 3030,
  public: '../public/',
  paginate: {
    default: 25,
    max: 50
  },
  tests: {
    environmentsAllowingSeedData: [
      'seeding-data'
    ]
  },
  sqlite3: {
    client: 'sqlite3',
    connection: {
      filename: './db2.sqlite'
    }
  },
  mysql: {
    client: 'mysql2',
    connection: `mysql://${process.env.MY_SQL_USER}:${process.env.MY_SQL_PASSWORD}@localhost:3306/live_forum_db`
  },
  authentication: {
    secret: '9e68576566810196c7ec6539c682897029c543ff179d23eec934b1d75948f2037b020b3b6c888123c71227e696b641c7c13d8f9e5dacbb245be2cf8a5e8307a7e9e52be94879eb442dc3c632c0c6e80d952d3b7ca8da24b002c3cd7b6c406769722586aa34bda867b6307f803736a35f7cb70b4d7cfb7df79dd30915668b8f444745e2bb189c7522f7a5d2a3d0d87f938281e5891af7285603fbfa1050923946698d2b0466fbe73522ce6777fe9d6dcc1f00a4a9dd84fabda161d15150278b0ffcca4d54378efd3e286a04531ee99a156bdcf5c253b15309817d4403e7ad846ef1583cee94d10d319cd37a0f05548734c99190c310b2427bbdc5eb6698724220',
    strategies: [
      'jwt',
      'local'
    ],
    path: '/authentication',
    service: 'users',
    jwt: {
      header: {
        typ: 'access'
      },
      audience: 'https://yourdomain.com',
      subject: 'anonymous',
      issuer: 'feathers',
      algorithm: 'HS256',
      expiresIn: '1d'
    },
    local: {
      entity: 'user',
      usernameField: 'email',
      passwordField: 'password'
    }
  }
}
