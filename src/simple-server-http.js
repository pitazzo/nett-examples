const http = require("http");

const tasks = [
  {
    id: "1",
    name: "Ir a comprar comida del gato",
    topic: "compras",
    isCompleted: false,
    priority: "HIGH",
  },
  {
    id: "2",
    name: "Limpiar cocina",
    topic: "casa",
    isCompleted: true,
    priority: "MEDIUM",
  },
  {
    id: "3",
    name: "Preparar clase de NETT",
    topic: "trabajo",
    isCompleted: false,
    priority: "HIGH",
  },
];

async function requestListener(req, res) {
  const url = req.url;
  const method = req.method;

  const [_, resource, parameter] = url.split("/");

  if (resource === "tasks" && method === "GET") {
    res.writeHead(200);
    res.end(JSON.stringify(tasks));
    return;
  }

  if (resource === "task" && method === "GET") {
    if (!parameter) {
      res.writeHead(400);
      res.end("Please provide a valid id, e.g. /tasks/2");
      return;
    }

    const index = tasks.findIndex((task) => task.id === parameter);
    if (index === -1) {
      res.writeHead(404);
      res.end(`Task with id ${parameter} not found`);
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify(tasks[index]));
    return;
  }

  if (resource === "tasks" && method === "POST") {
    let raw = "";
    for await (const chunk of req) {
      raw += chunk;
    }
    let body = {};

    try {
      body = JSON.parse(raw);
    } catch (_) {
      res.writeHead(400);
      res.end("Please provide a valid JSON for the body");
      return;
    }

    const { id, name, topic, isCompleted, priority } = body;

    if (
      id === undefined ||
      name === undefined ||
      topic === undefined ||
      isCompleted === undefined ||
      priority === undefined
    ) {
      res.writeHead(400);
      res.end(
        "Please provide a valid body: {id: number, name: string, isCompleted: bool, priority: string}"
      );
      return;
    }

    const newTask = { id, name, topic, isCompleted, priority };

    tasks.push(newTask);
    res.writeHead(201);
    res.end(JSON.stringify(newTask));
    return;
  }

  if (resource === "mark-as-completed" && method === "PUT") {
    if (!parameter) {
      res.writeHead(400);
      res.end("Please provide a valid id, e.g. /tasks/2");
      return;
    }

    const index = tasks.findIndex((task) => task.id === parameter);
    if (index === -1) {
      res.writeHead(404);
      res.end(`Task with id ${parameter} not found`);
      return;
    }

    if (tasks[index].isCompleted) {
      res.writeHead(400);
      res.end(`Task with id ${parameter} is already completed`);
      return;
    }

    tasks[index].isCompleted = true;
    res.writeHead(202);
    res.end(JSON.stringify(tasks[index]));
    return;
  }

  res.writeHead(404);
  res.end("Not found");
}

const server = http.createServer(requestListener);
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
