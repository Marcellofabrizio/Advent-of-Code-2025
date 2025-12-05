const text = await Deno.readTextFile('input');

const content = text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

const rotations = []

content.forEach(line => {
    const dir = line[0]
    const dial = Number(line.slice(1))

    rotations.push({
        dir,
        dial
    })
})


var currentDial = 50
var result = 0

for (const rotation of rotations) {

    let newDial

    if (rotation.dir === "L") {
        newDial = currentDial - rotation.dial
    } else {
        newDial = currentDial + rotation.dial
    }

    currentDial = (newDial % 100 + 100) % 100

    if (currentDial === 0) {
        result++
    }
}

console.log(result)
