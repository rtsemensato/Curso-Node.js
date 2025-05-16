const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {
  //   res.write(`
  //     <!DOCTYPE html>
  //     <html>
  //     <head><title>Hello</title></head>
  //     <body><h1>Hello, World!</h1></body>
  //     </html>
  //   `);
  res.write("Oi HTTTP");
  res.end();
});

server.listen(port, () => {
  console.log(`Server rodando na porta ${port}...`);
});
