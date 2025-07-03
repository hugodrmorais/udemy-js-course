/*
Very underweight - 16 to 16.9 kg/m2
Underweight - 17 to 18.4 kg/m2
Normal weight - 18.5 to 24.9 kg/m2
Overweight - 25 to 29.9 kg/m2
Obesity Class I - 30 to 34.9 kg/m2
Obesity Class II - 35 to 40 kg/m2
Obesity Class III - greater than 40 kg/m2
*/

function calculateBMI(weight, height, callback) {
    if (weight === undefined || height === undefined) {
        throw Error("Need two parameters: weight and height");
    }
    let bmi = weight / (height * height);
    if (typeof callback === "function") {
        return callback(bmi);
    }
    return bmi;
}

function classifyBMI(bmi) {
    if (bmi <= 16.9) {
        return 'very underweight';
    } else if (bmi <= 18.4) {
        return 'underweight';
    } else if (bmi <= 24.9) {
        return 'normal weight';
    } else if (bmi <= 29.9) {
        return 'overweight';
    } else if (bmi <= 34.9) {
        return 'obesity 1';
    } else if (bmi <= 40) {
        return 'obesity 2';
    } else {
        return 'obesity 3';
    }
}

// Calculate BMI and store the raw numerical value
let bmi = calculateBMI(80, 1.65);
// Calculate BMI and immediately classify it using the callback function
let bmi2 = calculateBMI(80, 1.65, classifyBMI);

console.log(bmi);  // Logs the numerical BMI value (e.g., 29.38...)
console.log(bmi2); // Logs the classification string (e.g., "overweight")
