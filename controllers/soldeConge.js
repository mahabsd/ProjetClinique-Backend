const cron = require('node-cron');
const User = require("../models/user");


// Sending emails every Wednesday.
cron.schedule(' 0 0 1 * *', function () {
    console.log('---------------------');
    console.log('Running Cron Job');
    User.count(function (err, count) {
        console.dir(err);
        console.dir(count);
        if (count == 0) {
            console.log("no records found: " + count);
        }
        else {
            // User.find().then((user) => {
            //     user.forEach(element => {
            //         // let solde = element.work.soldeConge;
            //         // solde += 1.75;
            //         // console.log(solde);
            //         let id = element._id
            //         User.findByIdAndUpdate({ _id: id },
            //             { $inc: { 'work.soldeConge': 1.75 } }
            //         )
            //     });
            // });
            User.updateMany({}, { $inc: { 'work.soldeConge': 1.75 } }
            ).then(() => {
                console.log("users days off updated successfully");
            }).catch(err => console.log(err))
        }
    });
});

module.exports = cron;