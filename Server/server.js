import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import routes from './src/route/routes';

const app = express();
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
  app.use(morgan('short'));
}

app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: false, type: '*/x-www-form-urlencoded' }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.raw({ type: '*/octet-stream' }));

app.get('/', (req, res) => {
  res.status(200)
  .send(`<h1>Welcome...</h1><br><h4>Server is running on https://${req.hostname}:${port}/ `)
  .end();
});
app.use('/api/v1', routes);
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}/`);
  });
}
export default app;
