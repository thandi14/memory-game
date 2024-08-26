// routes/api/index.js
const express = require('express');
const router = express.Router();
const { Player } = require('../../models');

// Get all players
router.get('/players', async (req, res) => {
  try {
    const players = await Player.findAll();
    // console.log(players)
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a player by ID
router.get('/players/:id', async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (player) {
      res.json(player);
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new player
router.post('/players', async (req, res) => {
  try {
    const { username, score } = req.body;
    const newPlayer = await Player.create({ username, score });
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a player
router.put('/players/:id', async (req, res) => {
  try {
    const { username, score } = req.body;
    const [updated] = await Player.update({ username, score }, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPlayer = await Player.findByPk(req.params.id);
      res.json(updatedPlayer);
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a player
router.delete('/players/:id', async (req, res) => {
  try {
    const deleted = await Player.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
