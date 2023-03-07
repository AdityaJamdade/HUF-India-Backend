const express = require('express');
const oeDailyRouter = express.Router();
const DateTime = require('datetime-js')
const currentDayNumber = require('current-day-number');

const getDayNumber = (date) => {
    return currentDayNumber(date); 
}

const oe_daily = require('../../models/OeDaily');

const fetchAllData = async (req, res) => {
    const data = await oe_daily.find();
    res.status(200).json({
        success: true,
        data: data
    });
}
oeDailyRouter
    .route('/all')
    .get(fetchAllData);

const getDataForParticularDay = async (req, res) => {
    try {
        const { date, month, year } = req.query;
        const query = { date: `${date}-${month}-${year}`}

        const resp = await oe_daily.find(query)
        res.status(200).json({
            success: true,
            data: resp
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            data: error
        });
    }
}
const postDailyData = async (req, res) => {
    const dateStr = DateTime(new Date(), '%d-%m-%Y')
    const reverseDateStr = DateTime(new Date(), '%m-%d-%Y')

    const { status, comment } = req.body;
    const newObj = {
        status, comment, date: dateStr, day_no: getDayNumber(reverseDateStr)
    }
    try {
        const response = await oe_daily(newObj).save();
        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            data: error
        });
    }
}
const deleteData = async (req, res) => {
    const { year, month, date } = req.query
    const dateStr = `${date}-${month}-${year}`
    try {
        const response = await oe_daily.findOneAndDelete({date:dateStr});
        res.status(200).json({
            success: true,
            data: response
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            data: error
        })
    }
}

oeDailyRouter
    .route('/')
    .get(getDataForParticularDay)
    .post(postDailyData)
    .delete(deleteData)

module.exports = oeDailyRouter