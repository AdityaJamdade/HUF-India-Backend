const mongoose = require('mongoose');

const OeDailySchema = new mongoose.Schema({
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
    day : {
        type: Boolean,
        default: true
    },
    day_no: {
        type: Number,
        required:true
    }
})
const oe_daily = mongoose.model('oe_daily', OeDailySchema);
module.exports = oe_daily;