// Modules ..
const http = require('http');
const next = require('next');

// Initialization ..
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

// Extract the Next.js handler ..
const nexJsHandler = app.getRequestHandler();

app
  // Wait for Next.js to prepare himself for using new server .. 
  .prepare()
  .then(() => {
    // Our raw Node.js server ..
    http
      .createServer((req, res) => {
        // Call the Next.js handler ..
        nexJsHandler(req, res, req.url);
      })
      .listen(
        PORT,
        () => console.log(`> Ready on http://localhost:${PORT}`)
      );
  });
