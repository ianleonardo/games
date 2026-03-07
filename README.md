# Retro Arcade Collection

A web-based retro arcade collection containing clones of classic games, currently featuring Tetris and Pac-Man. These games are built natively with HTML5 Canvas, CSS, and Vanilla JavaScript, requiring no build tools or external dependencies.

## Games Included
- **Tetris**: The classic block puzzle game.
- **Pac-Man**: The timeless maze chase game.

## How to Play

To play the games locally, you just need to serve the project directory with a static HTTP server. You cannot simply open the HTML files directly (via `file://`) because ES6 modules are used, which are blocked by CORS policies.

1. Open your terminal and navigate to the root directory of this project.
2. Start a local HTTP server. If you have Python installed, you can run:
   ```bash
   python3 -m http.server 8000
   ```
   (Alternatively, you can use Node's `npx serve`, PHP, or any other static file server).
3. Open your web browser and navigate to:
   [http://localhost:8000](http://localhost:8000)

Enjoy playing!