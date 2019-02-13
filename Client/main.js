import express from 'express';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
  app.use(morgan('short'));
}

app.use(express.static('../public'));
app.listen(port, async () => {
  console.log(`Application server is listening on http://localhost:${port}/`);
});
