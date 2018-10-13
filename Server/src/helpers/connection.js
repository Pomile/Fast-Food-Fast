import db from '../model';

const { query } = db;
const queryText = {
  name: 'add-user',
  text: 'INSERT INTO users (firstname, lastname, email, phone, password) VALUES($1, $2, $3, $4, $5)',
  values: ['babatunde', 'ogedengbe', 'ogedengbe12357@gmail.com', '+23490782282176', 'admin1234'],
  rowMode: 'array',
};


query.postCall(queryText);
