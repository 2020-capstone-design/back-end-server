const express = require('express');
const router = express.Router();
const { Menu } = require('../../models');

router.post('/insert_menu', async (req, res) => {
    try {
        console.log(req.body);
        await Menu.create({
            menu_name: req.body.menu_name,
            menu_price: req.body.menu_price,
            menu_intro: req.body.menu_intro,
            fk_restaurant_num : req.body.fk_restaurant_num,
        });
        res.status(201).json('success');
    } catch (error) {
        
    }

});

router.get('/list_menu/:restaurant_num', async (req, res, next) => {
    try{
        console.log(req.params.restaurant_num);
        const menus = await Menu.findAll({
            where: {
                fk_restaurant_num: req.params.restaurant_num,
            }
        });
        res.status(200).json({
            menus
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/delete_menu/:menu_num', async (req, res, next) => {
    try {
        console.log(req.params.menu_num);
        await Menu.destroy({
            where: { menu_num: req.params.menu_num }
        })
        res.status(200).send('성공적으로 삭제하였습니다.')
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;
