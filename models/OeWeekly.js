const mongoose = require('mongoose');

const OeWeeklySchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: null
    },
    comment: {
        type: String,
        required: true,
        default: null
    },
    week : {
        type: Boolean,
        default: true
    },
    week_no: {
        type : Number,
        required: true
    },
    year:{
        type: Number,
        required: true
    }
})
const oe_weekly = mongoose.model('oe_weekly', OeWeeklySchema);
module.exports = oe_weekly;