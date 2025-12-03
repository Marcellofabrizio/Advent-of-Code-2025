const text = await Deno.readTextFile('input');

const content = text.replace('\n', '').split(',').filter(line => line.length > 0);

var result = 0
var resultP2 = 0

const ranges = content.map(content => content.split('-'))

for (const range of ranges) {
    const minNum = Number(range[0])
    const maxNum = Number(range[1])

    for (let i = minNum; i <= maxNum; i++) {
    
        const numStr = i.toString()
        
        // PT1
        if (numStr.length%2 === 0) {
            
            const mid = Math.floor(numStr.length / 2)
            const firstPart = numStr.slice(0, mid)
            const secondPart = numStr.slice(mid)

            if (firstPart === secondPart) {
                // console.log("found", i)
                result += i
            }
        }

        for (let size = 1; size <= numStr.length/2; size++) {
        
            const block = numStr.slice(0, size)
            const repeat = numStr.length / size
            if (block.repeat(repeat) === numStr) {
                // console.log("found", i)
                resultP2 += i
                break
            }
        }
    }
}

console.log(result, resultP2)