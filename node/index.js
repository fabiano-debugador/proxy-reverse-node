import express from 'express';
import faker from 'faker';
import mysql from 'mysql';

const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'fullcycle',
};

const connection = mysql.createConnection(config);

app.get('/', (req, res) => {
  const name = faker.name.findName()

  connection.query(`INSERT INTO people (nome) VALUES ('${name}')`);

  connection.query(`SELECT nome FROM people`, (error, results, fields) => {
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ol>
        ${!!results.length ? results.map(el => `<li>${el.nome}</li>`).join('') : ''}
      </ol>
    `);
  });
});

app.listen(port, () => {
  console.log('Runnin on port:', port);
});