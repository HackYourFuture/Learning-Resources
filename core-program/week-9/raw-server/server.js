import net from "node:net";
import chalk from "chalk";

const port = Number(process.argv[2]) || 3000;

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const raw = data.toString();

    console.log(chalk.gray("─".repeat(60)));
    console.log(chalk.cyan.bold("Raw HTTP request:"));
    console.log(raw);
    console.log(chalk.gray("─".repeat(60)));

    const body = "Hello from raw TCP server!\n";
    const response = [
      "HTTP/1.1 200 OK",
      "Content-Type: text/plain",
      `Content-Length: ${Buffer.byteLength(body)}`,
      "Connection: close",
      "",
      body,
    ].join("\r\n");

    console.log(chalk.yellow.bold("Raw HTTP response:"));
    console.log(response);
    console.log(chalk.gray("─".repeat(60)));

    socket.end(response);
  });
});

server.listen(port, () => {
  console.log(chalk.green(`Raw HTTP server listening on port ${port}`));
  console.log(chalk.gray(`Try: curl http://localhost:${port}/hello`));
});
