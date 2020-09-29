const express = require('express');
const router = express.Router();
const { Menu } = require('../models');
const { authenticateUser } = require('../utils/auth.js');


router.post('/insert_menu', authenticateUser, async (req, res) => {
    try {
        await Menu.create({
            menu_name: req.body.menu_name,
            menu_category: req.body.menu_category,
            menu_price: req.body.menu_price,
            menu_intro: req.body.menu_intro,
            fk_restaurant_num : req.body.fk_restaurant_num,
        });
        res.status(201).json('success');
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }

});

router.get('/list_menus/:restaurant_num', async (req, res) => {
    try{
        const menus = await Menu.findAll({
            where: {
                fk_restaurant_num: req.params.restaurant_num,
            },
            order: [['menu_category'], ['menu_price']],
        });
        res.status(200).json({
            menus
        });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
});

router.get('/list_menu/:menu_num', async (req, res, next) => {
    try {
        const menu = await Menu.findOne({
            where: {
                menu_num: req.params.menu_num,
            },
        });
        res.status(200).json({
            menu
        });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
})

router.put('/update_menu', authenticateUser, async (req, res) => {
    try {
        const {menuNum, newMenuName, newMenuCategory, newMenuIntro, newMenuPrice} = req.body;
        await Menu.update({
            menu_name: newMenuName,
            menu_category: newMenuCategory,
            menu_intro: newMenuIntro,
            menu_price: newMenuPrice,
        },{
            where: {
                menu_num: menuNum,
            },
        })
        res.status(200).json('메뉴 성공적으로 수정하였습니다.');
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
})

router.delete('/delete_menu/:menu_num', authenticateUser, async (req, res) => {
    try {
        await Menu.destroy({
            where: { menu_num: req.params.menu_num }
        })
        res.status(200).send('성공적으로 삭제하였습니다.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error!');
    }
})

module.exports = router;
