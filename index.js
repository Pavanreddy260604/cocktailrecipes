import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/cocktail", async (req, res) => {
    const cocktailName = req.query.name || 'margarita';
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`;

    try {
        const response = await axios.get(url);
        const drinks = response.data.drinks || [];  // Ensure drinks is always an array

        console.log('Fetched drinks:', drinks);  // Debug log

        res.render("cocktail", { drinks, error: null });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.render("cocktail", { drinks: [], error: 'Error fetching data' });
    }
});

app.get("/cocktails", async (req, res) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;

    try {
        const response = await axios.get(url);
        const drinks = response.data.drinks || [];  // Ensure drinks is always an array

        console.log('Fetched drinks:', drinks);  // Debug log

        res.render("cocktail", { drinks, error: null });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.render("cocktail", { drinks: [], error: 'Error fetching data' });
    }
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
