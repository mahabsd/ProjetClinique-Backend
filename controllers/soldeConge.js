const cron = require('node-cron');
const User = require("../models/user");


// Sending emails every Wednesday.
cron.schedule(' 0 0 1 * *', function () {

    User.count(function (err, count) {
        console.dir(err);
        console.dir(count);
        if (count == 0) {
            return;
        }
        else {

            User.updateMany({}, { $inc: { 'work.soldeConge': 1.75 } }
            ).then().catch(err => console.log(err))
        }
    });
});

module.exports = cron;