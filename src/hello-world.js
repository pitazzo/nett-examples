process.stdout.write("¿Cuál es tu nombre? ");

process.stdin.on("data", (data) => {
  console.log(`hola, ${data}`);
  process.stdout.write("¿Cuántos años tienes? ");

  process.stdin.on("data", (data) => {
    console.log(`tienes ${data} años`);
  });
});
