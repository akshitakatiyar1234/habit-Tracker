const Habit = require('../models/habits');


module.exports.home = async function(req, res) {
    try {
        // Fetch habits from the database
        const habits = await Habit.find({}).exec();
        
        // Render the view with the fetched habits
        return res.render('home', {
            title: "LoopBit",
            habit_list: habits
        });
    } catch (err) {
        console.error('Error in fetching the habits:', err);
        // Handle the error appropriately
        return res.status(500).send('Internal Server Error');
    }
};
// controller to create a habit

module.exports.createHabit = async function(req, res) {
    // Define the days object
    let days = {
        one: "none",
        two: "none",
        three: "none",
        four: "none",
        five: "none",
        six: "none",
        seven: "none",
    };

    try {
        // Create a new habit
        const newHabit = await Habit.create({
            habit: req.body.habit,
            end: req.body.end,
            description: req.body.description,
            frequency: req.body.frequency,
            date: new Date(), // Use new Date() to get the current date and time
            time: req.body.time,
            days: days
        });

        console.log(newHabit);
        return res.redirect('back');
    } catch (err) {
        console.log('Error in creating habit:', err);
        return res.status(500).send('Internal Server Error');
    }
};

//DELETE A HABIT

module.exports.deleteHabit = async function(req, res) {
    let id = req.query.id;

    try {
        // Find and delete the habit by ID
        await Habit.findByIdAndDelete(id);
        return res.redirect('back');
    } catch (err) {
        console.log("Error in deleting Habit:", err);
        return res.status(500).send('Internal Server Error');
    }
};
