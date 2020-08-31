const express = require('express');
const router = express.Router();
const { Restaurant, Menu } = require('../../models');

router.post('/insert_menu', async (req, res) => {
    console.log(req.body);
    await Menu.create({
        menu_name: req.body.menu_name,
        menu_price: req.body.menu_price,
        fk_restaurant_num : req.body.fk_restaurant_num,
    });
    res.status(200).json({
        menu_name: req.body.menu_name,
        menu_price: req.body.menu_price,
        fk_restaurant_num : req.body.fk_restaurant_num,

    });
});

router.get('/list_menu/:restaurant_num', async (req, res, next) => {
    try{
        console.log(req.params.restaurant_num);
        const menus = await Menu.findAll({
            where: {
                fk_restaurant_num: req.params.restaurant_num,
            },
            attributes: ['menu_num', 'menu_name', 'menu_price'],
        });
        res.status(200).json({
            menus
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
