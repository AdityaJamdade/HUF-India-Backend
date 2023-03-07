const express = require('express');
const oeWeeklyRouter = express.Router();
const DateTime = require('datetime-js')
const oe_weekly = require('../../models/OeWeekly');
const currentWeekNumber = require('current-week-number');

const getWeekNo = (date) => {
    return currentWeekNumber(date);
}

const getWeeklyData = async (req, res) => {
    const { year, month, date } = req.query
    const dateStr = `${month}-${date}-${year}`
    const week_no = getWeekNo(dateStr)
    try {
        const data = await oe_weekly.find({ week_no, year });
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            data: error
        })
    }
}

const postWeeklyData = async (req, res) => {
    const dateStr = DateTime(new Date(), '%d-%m-%Y')
    const date = new Date();
    let week_no = getWeekNo(date);
    const { status, comment } = req.body;
    const newObj = {
        date: dateStr,
        status,
        comment,
        week_no,
        year : DateTime(new Date(), '%Y')
    }
    try {
        const response = await oe_weekly(newObj).save();
        res.status(200).json({
            success: true,
            data: response
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            data: error
        });
    }
}

const updateWeeklyData = async (req, res) => {
    // update funcitonality
}

const deleteWeeklyData = async (req, res) => {
    const { year, month, date } = req.query
    const dateStr = `${month}-${date}-${year}`
    const week_no = getWeekNo(dateStr)
    
    try {
        const response = await oe_weekly.findOneAndDelete({week_no, year});
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

oeWeeklyRouter
    .route('/')
    .get(getWeeklyData)
    .post(postWeeklyData)
    .patch(updateWeeklyData)
    .delete(deleteWeeklyData)

module.exports = oeWeeklyRouter