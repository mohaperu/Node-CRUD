

const { fstat } = require("fs");

//memory
const os = require("os")

console.log("hello, guvi!!!");

const marks = [40, 50, 80, 10, 70];

console.log(Math.max(...marks));

function double(){
    return num*2;
}

console.log(process.argv);
const num = process.argv[2]

console.log("the double is",double(num) );

console.log(os.freemem());
console.log(os.totalmem());

//Async - call stack -> webapi(complete reading) -> callback Q
//Event loop -> call stack
fs.readFile("./nice.txt","utf8",(err,data) =>{
    if(err) {
        console.log(err);
    }
    console.log(data,"Mohan");
});

//sync - call stack
const data = fs.readFileSync("./nice.txt","utf8");
console.log(data);