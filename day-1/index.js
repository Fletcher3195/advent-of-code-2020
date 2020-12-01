const readline = require('readline')
const fs = require('fs')

const input = './input.txt'
const sum = 2020

const args = process.argv.slice(2)
const lookingForThree = args.some((arg) => {
    if(arg === '-3')
        return true
})

let nums = []
let sol = []

const readInterface = readline.createInterface({
    input: fs.createReadStream(input),
    // output: process.stdout,  // Uncomment for debug
    console: false
})

// Copies the input into nums array
const initNums = async () => { 
    for await (const num of readInterface) {
        nums.push(num)
    }
}

initNums().then(() => {
    // Search for a viable pair in the array
    nums.some((x, i) => {
        return nums.some((y, j) => {
            if(!lookingForThree) {
                if( i !== j && parseInt(x) + parseInt(y) === sum) {
                    sol = [x,y]
                    return true // Stop searching for a pair
                }
            } else {
                return nums.some((z, k) => {
                    if( (i !== j && i !== k) && parseInt(x) + parseInt(y) + parseInt(z) === sum) {
                        sol = [x,y,z]
                        return true // Stop searching for a triple
                    }
                })
            }
        })
    })
}).then(() => {
    // Report findings back to the user
    sol.length > 0 ? sol.forEach((num, i) => { console.log(`num ${i}: ${num}`) }) : console.log(`No set exists which sums to ${sum}`)
})
