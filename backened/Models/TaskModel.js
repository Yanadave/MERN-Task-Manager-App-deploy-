const mongoose = require('mongoose');

//schema ko require kra
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskname: {
        type: String,
        require:true
    },
    isDone: {
        type: Boolean,
        require:true
    },
})

const TaskModel = mongoose.model('todos',TaskSchema);

module.exports = TaskModel;
