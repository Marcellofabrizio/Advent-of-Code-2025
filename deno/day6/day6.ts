const text = await Deno.readTextFile("input");

const content = text.split("\n").filter((line) => line.length > 0);

const numbers = content.slice(0, -1).map((line) =>
  line.split(" ").filter((line) => line.length > 0).map((num) =>
    parseInt(num.trim(), 10)
  )
);

const rows = numbers.length;
const cols = numbers[0]?.length ?? 0;

const operations = content.at(-1)!
  .split(" ")
  .map((op) => op.trim())
  .filter((op) => op.length > 0);

let result = 0;

for (let col = 0; col < Math.min(cols, operations.length); col++) {
  const op = operations[col];
  if (op === "*") {
    let acc = 1;
    for (let row = 0; row < rows; row++) acc *= numbers[row][col];
    result += acc;
  } else if (op === "+") {
    let acc = 0;
    for (let row = 0; row < rows; row++) acc += numbers[row][col];
    result += acc;
  }
}

console.log({ result });

