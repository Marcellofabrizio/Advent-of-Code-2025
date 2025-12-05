const text = await Deno.readTextFile('input');

const content = text
    .split('\n')
    .filter(line => line.length > 0)
    .map(line => line.split("").map(n => Number(n)))

var result = 0
// const numTarget = 2 -- FOR PART 1 
const numTarget = 12
const len = content[0].length

for (const line of content) {

    let max = -1
    let top = -1

    const numDigits = line.length
    const bufferStart = numDigits - numTarget

    let cap = -1
    let nextBiggestNum = -1

    let numBuffer = []

    for (let i = bufferStart; i < numDigits; i++) {
        let start = i
        nextBiggestNum = start

        for (let j = start; j > cap; j--) {
            if (line[j] >= line[start] && line[j] >= line[nextBiggestNum]) {
                nextBiggestNum = j
            }
        }

        cap = nextBiggestNum
        numBuffer.push(line[nextBiggestNum])
    }

    result += Number(numBuffer.join(''))
}

console.log(result)
