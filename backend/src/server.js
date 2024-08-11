const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const flashcardsRoutes = require('./routes/flashcards');

const app = express();
const PORT = process.env.PORT || 5051;

app.use(cors());
app.use(bodyParser.json());


app.use('/flashcards', flashcardsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
