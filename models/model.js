const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    age: {
        type: Number
    }
});

const Person = mongoose.model('person', mySchema);

module.exports = Person;