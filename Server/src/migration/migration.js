import db from '../model';

const { models } = db;
console.log(process.env.NODE_ENV);
console.log('Database migration in progress....\n\n');
models.sync({ force: true });
