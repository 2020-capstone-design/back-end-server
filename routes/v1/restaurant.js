const express = require('express');
const router = express.Router();
const { Restaurant } = require('../../models');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

fs.readdir('uploads', (error) => {
    if (error) {
        console.log('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
        fs.mkdirSync('uploads');
    }
});

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            console.log(file.originalname);
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024},
});

router.get('/list_restaurants/:restaurant_university&:restaurant_category', async (req, res, next) => {
    try {
        //console.log(req.params.restaurant_university);
        const restaurants = await Restaurant.findAll( {
            where: {
                restaurant_university: req.params.restaurant_university,
                restaurant_category: req.params.restaurant_category,
            },
            order: [['restaurant_on_off', 'DESC']],
        });
        console.log(req.params.restaurant_university, req.params.restaurant_category);
        res.status(200).json({
            restaurants
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/list_restaurant/:restaurant_num', async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findOne({
            where: {
                restaurant_num: req.params.restaurant_num,
            },
        });
        res.status(200).json({
            restaurant
        });
    } catch (error) {
        console.log(error);
        next(error);
   }
});

router.get('/list_restaurants/:username', async (req, res, next) => {
    console.log('username:', req.params.username);
    try {
        const restaurants = await Restaurant.findAll({
            where: {
                fk_owner_id: req.params.username,
            },
            order: ['created_at'],
        });
        res.status(200).json({
            restaurants
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/list_recommended_restaurants/:restaurant_university&:hashtag', async (req, res, next) => {
    console.log(req.params.restaurant_university, req.params.hashtag)
    try{
        const restaurants = await Restaurant.findAll({
            where: {
                restaurant_university: req.params.restaurant_university,
                restaurant_main_menu1: req.params.hashtag,
            },
        })
        res.status(200).json({
            restaurants
        })
    } catch (error) {
        console.error(error);
        res.status(500).message('Internal Server Error');
        next(error);
    }
})

router.post('/insert_restaurant', upload.single('logo'), (req, res, next) => {
    try{
        console.log('req.file', req.file);
        console.log(req.body);
        let logo;
        if (req.file !== undefined) {
            logo = '/img/' + req.file.filename;
        } else {
            logo = 'noImage'
        }
        Restaurant.create({
            restaurant_name : req.body.restaurant_name,
            restaurant_phone : req.body.restaurant_phone,
            restaurant_loc : req.body.restaurant_loc,
            restaurant_university : req.body.restaurant_university,
            restaurant_intro : req.body.restaurant_intro,
            restaurant_category : req.body.restaurant_category,
            restaurant_logo : logo,
            restaurant_main_menu1 : req.body.restaurant_main_menu1,
            restaurant_main_menu2 : req.body.restaurant_main_menu2,
            restaurant_operating_time : req.body.restaurant_operating_time,
            restaurant_closed_days : req.body.restaurant_closed_days,
            restaurant_on_off : req.body.restaurant_on_off,
            fk_owner_id : req.body.fk_owner_id,
        })
        res.status(200).send('success!');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.put('/update_restaurant/:restaurant_num', async(req, res, next) => {
    try {
        await Restaurant.update({
            restaurant_name : req.body.restaurant_name,
            restaurant_phone : req.body.restaurant_phone,
            restaurant_loc : req.body.restaurant_loc,
            restaurant_university : req.body.restaurant_university,
            restaurant_intro : req.body.restaurant_intro,
            restaurant_category : req.body.restaurant_category,
            restaurant_main_menu1 : req.body.restaurant_main_menu1,
            restaurant_main_menu2 : req.body.restaurant_main_menu2,
            restaurant_operating_time : req.body.restaurant_operating_time,
            restaurant_closed_days : req.body.restaurant_closed_days,
        }, {
            where: {restaurant_num: req.params.restaurant_num}
        });
        res.status(200).send('성공적으로 수정하였습니다.');
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.patch('/update_restaurant_isOpen', async (req, res, next) => {
    try {
        console.log(req.body);
        await Restaurant.update({
            restaurant_on_off: req.body.isOpen
        }, {
            where: {restaurant_num: req.body.restaurant_num}
        });
        res.status(200).json('변경되었습니다.');
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
        next(error);
    }
});

router.patch('/update_restaurant_logo', upload.single('logo'), async (req, res, next) => {
    try {
        console.log(req.file, req.body.restaurant_num);
        let logo;
        if (req.file !== undefined) {
            logo = '/img/' + req.file.filename;
        } else {
            logo = 'noImage'
        }
        await Restaurant.update({
            restaurant_logo: logo,
        }, {
            where: { restaurant_num: req.body.restaurant_num }
        });
        res.status(200).json('Success!');
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
})



router.delete('/delete_restaurant/:restaurant_num', async (req, res, next) => {
    try {
        console.log(req.params.restaurant_num);
        await Restaurant.destroy({
            where: { restaurant_num: req.params.restaurant_num }
        })
        res.status(200).send('성공적으로 삭제하였습니다.')
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;

