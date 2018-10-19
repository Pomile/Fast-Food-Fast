import db from '../model';

const { query } = db;
const queryText = {
  name: 'add-admin-user',
  text: 'INSERT INTO users (firstname, lastname, email, phone, password, role) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
  values: ['admin', 'admin', 'superadmin@gmail.com', '+23490782282176', 'Admin1234', 'admin'],
  rowMode: 'array',
};


query.postCall(queryText);
