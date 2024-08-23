const Habit = require('../models/habits');

module.exports.details = async function(req, res) {
    try {
        // Fetch habits from the database
        const habits = await Habit.find({}).exec();
        
        // Render the details page with the fetched habits
        return res.render('details', {
            title: "LoopBit Weekly",
            habit_list: habits
        });
    } catch (err) {
        console.error('Error in fetching the habits:', err);
        return res.status(500).send('Internal Server Error');
    }
};


module.exports.updateHabit = async function(req, res) {
    const id = req.query.id;
    const day = req.query.day;
    const val = req.query.val;

    try {
        // Find the habit by ID
        const habit = await Habit.findById(id).exec();

        if (!habit) {
            console.log("Habit not found");
            return res.status(404).send('Habit not found');
        }

        // Update the habit's days and streak
        if (habit.days.hasOwnProperty(day)) {
            if (val === "none") {
                habit.days[day] = "yes";
                habit.streak++;
            } else if (val === "yes") {
                habit.days[day] = "no";
                habit.streak--;
            } else {
                habit.days[day] = "none";
            }
        }

        // Save the updated habit
        await habit.save();

        // Redirect back after update
        return res.redirect('back');
    } catch (err) {
        console.error("Error in updating habit:", err);
        return res.status(500).send('Internal Server Error');
    }
};
