const text = await Deno.readTextFile("input");
const content = text.split("\n").filter((l) => l.length > 0);

const digitsLines = content.slice(0, -1);
const operations = content.at(-1)!.trim().split(/\s+/);

const matrix = digitsLines.map((line) =>
  line.split("").flatMap((
    ch,
  ) => (ch === " " ? [0] : ch.split("").map((d) => parseInt(d, 10))))
);

const rows = matrix.length;
const cols = matrix[0]?.length ?? 0;

const zeroCols = new Set<number>();
for (let c = 0; c < cols; c++) {
  let zero = true;
  for (let r = 0; r < rows; r++) {
    if (matrix[r][c] !== 0) {
      zero = false;
      break;
    }
  }
  if (zero) zeroCols.add(c);
}

let result = 0;
let numsBuffer: number[] = [];
let opsIdx = operations.length - 1;

for (let c = cols - 1; c >= -1; c--) {
  if (c === -1 || zeroCols.has(c)) {
    const op = operations[opsIdx--];
    if (op === "*") {
      result += numsBuffer.reduce((a, b) => a * b, 1);
    } else if (op === "+") {
      result += numsBuffer.reduce((a, b) => a + b, 0);
    }
    numsBuffer = [];
    continue;
  }

  let colNum = "";
  for (let r = 0; r < rows; r++) {
    const v = matrix[r][c];
    if (v !== 0) colNum += v;
  }
  if (colNum.length > 0) numsBuffer.push(parseInt(colNum, 10));
}

console.log(result);
