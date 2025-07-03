/*
Very underweight - 16 to 16.9 kg/m2
Underweight - 17 to 18.4 kg/m2
Normal weight - 18.5 to 24.9 kg/m2
Overweight - 25 to 29.9 kg/m2
Obesity Class I - 30 to 34.9 kg/m2
Obesity Class II - 35 to 40 kg/m2
Obesity Class III - greater than 40 kg/m2
*/

function calculateBMI(weight, height) {
    // 1. Check for missing parameters
    if (weight === undefined || height === undefined) {
        throw new Error("Needs two parameters: weight and height.");
    }

    // 2. Convert inputs to numbers and validate
    // parseFloat will try to convert the input to a floating-point number.
    // If the input isn't a valid number (e.g., "abc"), parseFloat returns NaN.
    const numericWeight = parseFloat(weight);
    const numericHeight = parseFloat(height);

    // 3. Check if the converted values are actual numbers
    // isNaN() returns true if the value is Not-a-Number.
    if (isNaN(numericWeight) || isNaN(numericHeight)) {
        throw new Error("The parameters 'weight' and 'height' must be valid numbers.");
    }

    // 4. Also, check for non-positive height, which would cause division by zero or negative BMI
    if (numericHeight <= 0) {
        throw new Error("Height must be a positive value greater than zero.");
    }

    return numericWeight / (numericHeight * numericHeight);
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
        return 'obesity Class I';
    } else if (bmi <= 40) {
        return 'obesity Class II';
    } else {
        return 'obesity Class III';
    }
}

// --- Usage Examples and Error Testing ---

// Scenario with valid inputs
try {
    let validBmi = calculateBMI(60, 1.65);
    console.log(`BMI: ${validBmi.toFixed(2)}`); // .toFixed(2) to format to 2 decimal places
    console.log(`Classification: ${classifyBMI(validBmi)}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
}
console.log('---');

// Scenario with invalid weight (letter)
try {
    let invalidWeightBmi = calculateBMI("abc", 1.70);
    console.log(`BMI: ${invalidWeightBmi}`);
    console.log(`Classification: ${classifyBMI(invalidWeightBmi)}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
}
console.log('---');

// Scenario with invalid height (empty/not explicitly provided)
try {
    let invalidHeightBmi = calculateBMI(70, "");
    console.log(`BMI: ${invalidHeightBmi}`);
    console.log(`Classification: ${classifyBMI(invalidHeightBmi)}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
}
console.log('---');

// Scenario with zero height (causes division by zero)
try {
    let zeroHeightBmi = calculateBMI(70, 0);
    console.log(`BMI: ${zeroHeightBmi}`);
    console.log(`Classification: ${classifyBMI(zeroHeightBmi)}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
}
