const express = require('express');
const router = express.Router();
const {Search} = require('../models');
const schedule = require('node-schedule');

router.get('/:restaurant_university', async (req, res) => {
    try {
        const searchResult = await Search.findAll({
            attributes: ['search_word'],
            where: {university: req.params.restaurant_university},
            order: [['search_count', 'DESC']],
            limit: 5
        });
        res.status(200).json({searchResult});
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal Server Error');
    }

})

schedule.scheduleJob('0 8 0 * * *', function(){
    Search.destroy({
        where: {},
        truncate: true
    });
});

module.exports = router;
