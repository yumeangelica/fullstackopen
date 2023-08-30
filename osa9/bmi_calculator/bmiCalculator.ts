
interface BmiValues { // interface for the return value
    height: number;
    weight: number;
}




const parseBmiArguments = (args: string[]): BmiValues => { // function to parse the arguments from the command line
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]), // changing type to number
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};


const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) * (height / 100));
    let bmiCategory = '';

    if (bmi < 15) {
        bmiCategory = 'Very severely underweight';
    } else if (bmi < 16) {
        bmiCategory = 'Severely underweight';
    } else if (bmi < 18.5) {
        bmiCategory = 'Underweight';
    } else if (bmi < 25) {
        bmiCategory = 'Normal (healthy weight)';
    } else if (bmi < 30) {
        bmiCategory = 'Overweight';
    } else if (bmi < 35) {
        bmiCategory = 'Obese';
    }
    else {
        bmiCategory = 'Very obese';
    }
    

    return bmiCategory;
};



export { calculateBmi, parseBmiArguments };