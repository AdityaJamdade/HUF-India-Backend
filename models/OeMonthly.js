const mongoose = require('mongoose');

const OeMonthlySchema = new mongoose.Schema({
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
    month : {
        type: Boolean,
        default: true
    },
    month_no :{
        type: Number,
        required: true,
    },
    year : {
        type: Number,
        required: true,
    }
})
const oe_monthly = mongoose.model('oe_monthly', OeMonthlySchema);
module.exports = oe_monthly;