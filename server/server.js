const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:4200', 'http://127.0.0.1:4200'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
}));
app.use(express.json());

let games = [
  { id: 1, title: 'Half-Life 3', price: 29.99, available: true },
  { id: 2, title: 'Cyberpunk 2077', price: 49.99, available: false },
  { id: 3, title: 'Portal 3', price: 19.99, available: true }
];

// GET: Fetch all games
app.get(['/api/games', '/api/games/'], (req, res) => {
  res.json(games);
});

// POST: Add a new game
app.post(['/api/games', '/api/games/'], (req, res) => {
  const { title, price } = req.body;

  if (!title || price === undefined || price < 1) {
    return res.status(400).json({
      message: "Title is required and price must be at least $1.00"
    });
  }

  const newGame = {
    id: games.length > 0 ? Math.max(...games.map(g => g.id)) + 1 : 1,
    title,
    price: Number(price),
    available: true
  };

  games.push(newGame);
  res.status(201).json(newGame);
});

// PUT: Toggle availability status of a game or update game details
app.put(['/api/games/:id', '/api/games/:id/'], (req, res) => {
  const gameId = Number(req.params.id);
  const game = games.find(g => g.id === gameId);

  if (!game) {
    return res.status(404).json({
      message: "Game not found"
    });
  }

  // Toggle availability if it is a toggle request, otherwise update fields
  if (req.body.available !== undefined) {
    game.available = req.body.available;
  } else {
    game.available = !game.available;
  }

  res.json(game);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

