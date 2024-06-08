const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 3001; 

app.use(cors());

app.get('/api/products', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.ekoman.si/vsi-izdelki/');
    const $ = cheerio.load(data);

    const products = [];
    $('.product.type-product').each((index, element) => {
      const title = $(element).find('.entry-title a').text().trim();
      const link = $(element).find('.entry-title a').attr('href');
      const image = $(element).find('figure.woocom-project img').attr('data-src') || $(element).find('figure.woocom-project img').attr('src');
      const price = $(element).find('.woocommerce-Price-amount').text().trim();

      products.push({
        title,
        link,
        image,
        price
      });
    });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

app.get('/api/articles', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.ecowatch.com');
    const $ = cheerio.load(data);

    const articles = [];
    $('.home-categories__list-item').each((index, element) => {
      const title = $(element).find('.home-category__title a').text().trim();
      const link = $(element).find('.home-category__title a').attr('href');
      const description = $(element).find('.home-category__description p').text().trim();

      articles.push({
        title,
        link,
        description,
      });
    });

    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Error fetching articles' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
