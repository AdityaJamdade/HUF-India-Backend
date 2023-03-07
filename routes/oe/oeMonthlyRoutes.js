const express = require('express');
const oeMonthlyRouter = express.Router();
const DateTime = require('datetime-js')

const oe_monthly = require('../../models/OeMonthly');

const getMonthlyData = async (req, res) => {
    const { year, month } = req.query
    try {
        const response = await oe_monthly.find({year, month_no:month})
        res.status(200).json({
            success: true,
            data : response
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            data : error
        })
    }
}

const postMonthlyData = async (req, res) => {
    const dateStr = DateTime(new Date(), '%d-%m-%Y')
    const { status, comment } = req.body;
    const newObj = {
        date: dateStr,
        status,
        comment,
        month_no: DateTime(new Date(), '%m'),
        year : DateTime(new Date(), '%Y')
    }
    try {
        const response = await oe_monthly(newObj).save();
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

const deleteMonthlyData = async (req, res) => {
    const { year, month } = req.query
    try {
        const response = await oe_monthly.findOneAndDelete({month_no: month, year});
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

oeMonthlyRouter
    .route('/')
    .get(getMonthlyData)
    .post(postMonthlyData)
    .delete(deleteMonthlyData)

module.exports = oeMonthlyRouter