const mongoose = require('mongoose')


async function connect () {
    try {
        await mongoose.connect(process.env.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfuly')
    } catch(err) {
        console.log('err connect DB')
    }
}

module.exports = { connect }