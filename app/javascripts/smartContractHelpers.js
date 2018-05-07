Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let code = fs.readFileSync('Perscription.sol').toString()
let solc = require('solc')
let compiledCode = solc.compile(code)

console.log(compiledCode)