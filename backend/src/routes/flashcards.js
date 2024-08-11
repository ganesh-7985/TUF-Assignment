const express = require('express');
const router = express.Router();
const db = require('../db')

router.get('/', (req, res) => {
    db.query('SELECT * FROM flashcards', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { question, answer } = req.body;
    db.query(
        'INSERT INTO flashcards (question, answer) VALUES (?, ?)',
        [question, answer],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: results.insertId, question, answer });
        }
    );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query(
        'DELETE FROM flashcards WHERE id = ?',
        [id],
        (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(204).end();
        }
    );
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    db.query(
        'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?',
        [question, answer, id],
        (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(204).end();
        }
    );
});



module.exports = router;
