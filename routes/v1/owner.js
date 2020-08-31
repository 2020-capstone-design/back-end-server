const express = require('express');
const router = express.Router();

const Owner = require('../../models');

router.get('/ownerInfo/:id', async (req, res, next) => {
    Owner.findOne({
        where: {owner_id: req.params.id},
    })
        .then(user => {
            res.json(user);
        })
        .catch(error => {
            console.error(error);
            res.status(500).message('Internal Server Error');
            next(error);
        })
})

module.exports = router;
