let age = 27;
let parentsPresent = false;
let boughtTicket = true;
const canTravel = (age >= 18 || parentsPresent) && boughtTicket;

console.log(`Can travel: ${canTravel}`);

// let msgAdult = ""
// if (age >= 18) {
//     msgAdult = "Is an adult"
// } else {
//     msgAdult = "Is under 18"
// }
let msgAdult = (age >= 18) ? "Is an adult" : "Is under 18";

if (!boughtTicket) {
    console.log("Did not buy the ticket");
} else {
    console.log(msgAdult);
}

let n1 = 0;
let n2 = 7;
let average = (n1 + n2) / 2;
console.log(`Average: ${average}`);

if (n1 === 0 || n2 === 0) {
    console.log("Failed");
} else if (average < 7) {
    console.log("Failed. But there's a chance to recover");
} else {
    console.log("Approved");
}

console.log("Exited the if block");
