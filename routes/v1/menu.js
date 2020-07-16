const express = require('express');
const router = express.Router();
const { Restaurant, Menu } = require('../../models');

router.post('/insert_menu', (req, res) => {
    console.log(req.body);
    Menu.create({
        menu_num : req.body.menu_num,
        menu_name: req.body.menu_name,
        menu_price: req.body.menu_price,
        fk_rest_num : req.body.fk_rest_num,
    });
    res.status(200).json({
        menu_name: req.body.menu_name,
        menu_price: req.body.menu_price,
    });
});

router.post('/list_menu', async (req, res) => {
    try{
        console.log(req.body.rest_num);
        const menus = await Menu.findAll({
            include: [{
                model: Restaurant,
                where: req.rest_num,
            }],
            attributes: ['menu_num', 'menu_name', 'menu_price'],
        });
        console.log(menus);
        res.status(200).json({
            menus
        });
    } catch (error) {
        console.err(error);
        next(error);
    }
});

module.exports = router;
