import db from '../model';

const { models } = db;

console.log('Database migration in progress....\n\n');
models.sync({ force: true });
