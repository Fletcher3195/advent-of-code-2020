const readline = require('readline')
const fs = require('fs')

const input = './input.txt'
const sum = 2020

let nums = []
let pair = []

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
            if( i !== j && parseInt(x) + parseInt(y) === sum) {
                pair = [x,y]
                return true // Stop searching for a pair
            }
        })
    })
}).then(() => {
    // Report findings back to the user
    pair.length > 0 ? pair.forEach((num, i) => { console.log(`num ${i}: ${num}`) }) : console.log(`No pair exists which sums to ${sum}`)
})
