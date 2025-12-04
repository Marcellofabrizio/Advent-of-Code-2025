const text = await Deno.readTextFile('input');

const content = text
                .split('\n')
                .filter(line => line.length > 0)
                .map(line => line.split("").map(n => Number(n)))

var result = 0
const len = content[0].length

for (const line of content) {
    
    let top = -1

    for (let i = 0; i < len; i++) {
    
        let start = line[i] * 10
        let leftMax = Math.max(...line.slice(i+1))

        start += leftMax

        if (start > top) {
            top = start
        }
    }

    result += top
}

console.log(result)