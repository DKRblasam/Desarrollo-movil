console.log("Hola mundo node!!");

let edad = 20;
let edad2 = 8;

console.log("Edad promedio: " + (edad + edad2)/2);


console.log("\t\t----- Medidor de procesos -----");

console.time('miProceso');

for(let i = 0; i < 100000000; i++) {

}

console.timeEnd('miProceso');

