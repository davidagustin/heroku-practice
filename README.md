# Sudoku Game

A beautiful and interactive Sudoku game built with React and Express, deployed on Heroku.

## Features

- **Three Difficulty Levels**: Easy, Medium, and Hard puzzles
- **Interactive Gameplay**: Click cells and type numbers to play
- **Real-time Validation**: Immediate feedback on correct/incorrect moves
- **Visual Feedback**: Highlighted cells, error indicators, and completion status
- **Modern UI**: Beautiful gradient design with smooth animations
- **Responsive Design**: Works perfectly on desktop and mobile devices

## Game Controls

- **Click** on any empty cell to select it
- **Type numbers 1-9** to fill the cell
- **Press Backspace/Delete** or **0** to clear a cell
- **New Game**: Start a fresh puzzle
- **Clear**: Reset the current puzzle to its initial state
- **Solve**: Automatically solve the puzzle

## Running Locally

Make sure you have Node.js and npm installed.

```bash
# Clone the repository
git clone https://github.com/your-username/sudoku-app.git
cd sudoku-app

# Install dependencies
npm install

# Build the React application
npm run build

# Start the server
npm start
```

Your app should now be running on `http://localhost:5006`.

## Development

For development with hot reloading:

```bash
# Install dependencies
npm install

# Start development build with watch mode
npm run build:dev

# In another terminal, start the server
npm start
```

## Deploying to Heroku

This application is ready to deploy to Heroku:

```bash
# Create a new Heroku app
heroku create your-sudoku-app

# Deploy to Heroku
git push heroku main

# Open the app
heroku open
```

## Project Structure

```
├── src/                 # React source code
│   ├── App.js          # Main Sudoku game component
│   ├── index.js        # React entry point
│   ├── index.html      # HTML template
│   └── styles.css      # Application styles
├── public/             # Built files (generated)
├── index.js            # Express server
├── webpack.config.js   # Webpack configuration
└── package.json        # Dependencies and scripts
```

## Technologies Used

- **Frontend**: React 18, CSS3
- **Backend**: Express.js, Node.js
- **Build Tool**: Webpack 5
- **Deployment**: Heroku

## Game Logic

The Sudoku game includes:
- Pre-defined puzzles for each difficulty level
- Real-time validation against correct solutions
- Visual indicators for errors and selections
- Completion detection and celebration

## License

MIT License - feel free to use this project for learning or building your own applications!
