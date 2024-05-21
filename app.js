const express = require('express');
const cors = require('cors');

const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

const corsOptionns = {
  origin: 'http://localhost:8080',
  optionSuccessStatus: 200,
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/img', express.static(path.join(__dirname, './public/img')));

const db = require('./app/models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.send('Hello, welcome to vuestore-server!');
});

require('./app/routes/product.route')(app);
require('./app/routes/order.route')(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
