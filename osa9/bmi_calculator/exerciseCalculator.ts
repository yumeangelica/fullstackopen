
interface Result { // interface for the return value of the function
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ExerResult { // interface for the return value
    targetHours: number;
    dailyHoursList: number[];
}

const parseExerArguments = (args: string[]): ExerResult => { // function to parse the arguments from the command line
    if (args.length > 12) throw new Error('Too many arguments');
    if (args.length < 4) throw new Error('Not enough arguments');

    const targetHours = Number(args[2]);
    const dailyHoursList = args.slice(3).map(hours => hours);

    if (!isNaN(targetHours) && dailyHoursList.every(hours => !isNaN(Number(hours)))) {
        return {
            targetHours: Number(targetHours), // changing type to number
            dailyHoursList: dailyHoursList.map(hours => Number(hours))
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

const calculateExercises = (targetHours: number, dailyHoursList: number[]): Result => {

    const periodLength = dailyHoursList.length; // number of days
    const trainingDays = dailyHoursList.filter(hours => hours > 0).length; // number of days with training
    const average = dailyHoursList.reduce((a, b) => a + b, 0) / periodLength; // average of daily hours
    const success = average >= targetHours; // true if average is greater than target
    let rating = 0;
    let ratingDescription = '';

    if (average >= targetHours) {
        rating = 3;
        ratingDescription = 'Well done!';
    }
    else if (average === targetHours) {
        rating = 2;
        ratingDescription = 'You reached your target!';
    } else {
        rating = 1;
        ratingDescription = 'You should train more!';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target: targetHours,
        average
    };

};




export { calculateExercises, parseExerArguments };