const express = require('express'),
  cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());

app.get('/data', (req, res) => {
  res.send(data);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const data = [
  {
    product_name: 'Product A',
    product_description: 'Lorum ipsum',
    is_active: true,
    price: '44$',
    offer_price: '34$',
    offer_start_at: '2020-02-03T00:00:00',
    offer_end_at: '2020-02-03T00:00:00',
    created_at: '2020-02-03T00:00:00',
    updated_at: '2020-02-03T00:00:00',
  },
  {
    product_name: 'Product B',
    product_description: 'Lorum ipsum',
    is_active: false,
    price: '42$',
    offer_price: '32$',
    offer_start_at: '2020-02-03T00:00:00',
    offer_end_at: '2020-02-03T00:00:00',
    created_at: '2020-02-03T00:00:00',
    updated_at: '2020-02-03T00:00:00',
  },
  {
    product_name: 'Product C',
    product_description: 'Lorum ipsum',
    is_active: true,
    price: '4$',
    offer_price: '3$',
    offer_start_at: '2020-02-03T00:00:00',
    offer_end_at: '2020-02-03T00:00:00',
    created_at: '2020-02-03T00:00:00',
    updated_at: '2020-02-03T00:00:00',
  },
  {
    product_name: 'Product D',
    product_description: 'Lorum ipsum',
    is_active: true,
    price: '40$',
    offer_price: '23$',
    offer_start_at: '2020-02-03T00:00:00',
    offer_end_at: '2020-02-03T00:00:00',
    created_at: '2020-02-03T00:00:00',
    updated_at: '2020-02-03T00:00:00',
  },
];
