const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = 3000;
const PUBLIC_DIR = process.cwd();

const clients = new Set();

// Watch directory for changes
fs.watch(PUBLIC_DIR, { recursive: true }, (eventType, filename) => {
  if (
    filename &&
    !filename.includes('node_modules') &&
    !filename.startsWith('.')
  ) {
    for (const client of clients) {
      client.write('data: reload\n\n');
    }
  }
});

const getContentType = (filePath) => {
  const ext = path.extname(filePath);
  switch (ext) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'application/javascript';
    case '.json':
      return 'application/json';
    case '.png':
      return 'image/png';
    case '.jpg':
      return 'image/jpeg';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'text/plain';
  }
};

const server = http.createServer((req, res) => {
  let filePath = path.join(
    PUBLIC_DIR,
    req.url === '/' ? 'index.html' : req.url
  );

  if (req.url === '/__live_reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
        return;
      }

      let content = data;
      const contentType = getContentType(filePath);

      if (contentType === 'text/html') {
        const injection = `
          <script>
            const eventSource = new EventSource('/__live_reload');
            eventSource.onmessage = (event) => {
              if (event.data === 'reload') {
                window.location.reload();
              }
            };
          </script>
        `;
        content = Buffer.from(
          data.toString('utf8').replace('</body>', injection + '</body>')
        );
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Live server running at http://localhost:${PORT}`);
});
