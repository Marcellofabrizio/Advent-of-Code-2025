const text = await Deno.readTextFile("input")

const content = text.split("\n\n")

console.log(content)

const ranges = content[0].split("\n")
console.log(ranges)

const ids = content[1].split("\n").filter(line => line.length > 0)
console.log(ids)


function mergeRanges(ranges) {
  let intervals = ranges.map(r => {
    const [s, e] = r.split("-").map(Number);
    return [s, e];
  });

  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [];
  let [currStart, currEnd] = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];

    if (start <= currEnd) {
      currEnd = Math.max(currEnd, end);
    } else {
      merged.push([currStart, currEnd]);
      [currStart, currEnd] = intervals[i];
    }
  }

  merged.push([currStart, currEnd]);

  return merged;
}

const mergedRanges = mergeRanges(ranges)

console.log(mergedRanges)

let result = 0

let resultP2 = 0

for (const id of ids) {
  
  let spoiled = true
  for (const range of mergedRanges) {
    if (id >= range[0] && id <= range[1]) {
      spoiled = false
    }
  }

  if (!spoiled) {
   result += 1
  }
}

for (const range of mergedRanges) {

  resultP2 += range[1] - range[0] +1

}

console.log(resultP2)
