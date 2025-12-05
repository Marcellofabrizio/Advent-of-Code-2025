
const text = await Deno.readTextFile("input");

const grid = text
    .trimEnd()
    .split("\n")
    .filter(line => line.length > 0)
    .map(line => [...line]);

const rows = grid.length;
const cols = rows ? grid[0].length : 0;

const dirs = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1], [1, -1],
    [1, 0], [1, 1],
];

const rollsCount = Array.from({ length: rows }, () => new Array(cols).fill(0));
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        if (grid[r][c] !== "@") { 
            continue 
        };

        let count = 0;
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === "@") {
                count++;
            }
        }
        rollsCount[r][c] = count;
    }
}

// console.log(rollsCount.map(row => row.join(" ")).join("\n"));

const deleteQueue = [];
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        if (grid[r][c] === "@" && rollsCount[r][c] < 4) {
            deleteQueue.push([r, c]);
        }
    }
}

let result = 0;

while (deleteQueue.length) {
    const [r, c] = deleteQueue.shift();
    if (grid[r][c] !== "@") {
        continue;
    }

    grid[r][c] = ".";
    result++;

    for (const [dr, dc] of dirs) {
        
        const nr = r + dr, nc = c + dc;
        
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
            continue;
        }
        if (grid[nr][nc] !== "@") {
            continue;
        }

        if (rollsCount[nr][nc] > 0) {
            rollsCount[nr][nc] -= 1;
        }

        if (rollsCount[nr][nc] < 4) {
            deleteQueue.push([nr, nc]);
        }
    }
}

console.log(result);

