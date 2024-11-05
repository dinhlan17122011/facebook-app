'use strict';

import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import { env as _env } from 'process';
import configJson from '../config/config.json' assert { type: 'json' }; // Import JSON config

// Sử dụng import.meta.url để lấy __filename
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..'); // Đường dẫn đến thư mục cha
const basename = _basename(__filename);
const env = _env.NODE_ENV || 'development';
const config = configJson[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(_env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = import(join(__dirname, file)).then(mod => mod.default(sequelize, DataTypes));
    model.then(model => {
      db[model.name] = model;
    });
  });

// Đảm bảo các association được thiết lập
Promise.all(Object.keys(db).map(modelName => {
  if (db[modelName].associate) {
    return db[modelName].associate(db);
  }
})).then(() => {
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
});

export default db;
