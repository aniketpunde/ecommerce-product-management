const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const variantRoutes = require('./routes/variantRoutes');
const orderRoutes = require('./routes/orderRoutes');
const logisticsRoutes = require('./routes/logisticsRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', productRoutes);
app.use('/api', variantRoutes);
app.use('/api', orderRoutes);
app.use('/api', logisticsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
