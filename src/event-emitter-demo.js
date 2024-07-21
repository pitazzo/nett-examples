const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("is-multiple-of", (multiple, number) => {
  console.log(`${number} es multiplo de ${multiple}`);
});

for (let i = 0; i < 100; i++) {
  console.log(i);
  if (i % 11 === 0) {
    emitter.emit("is-multiple-of", 11, i);
  }
}
