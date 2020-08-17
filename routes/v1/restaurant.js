const express = require('express');
const router = express.Router();
const { Restaurant, Menu } = require('../../models');
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
    limits: {fileSize: 5 * 300 * 300},
});

router.post('/list_rest', async (req, res, next) => {
    try {
        console.log(req.body.restaurant_university);
        const restaurants = await Restaurant.findAll({
            where: {
                restaurant_university: req.body.restaurant_university,
                restaurant_category: req.body.restaurant_category,
            },
        });
        res.status(200).json({
            restaurants
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// router.post('/list_rest', async (req, res, next) => {
//     try {
//         const restaurants = await Restaurant.findAll({
//             where: {
//                 fk_owner_id: req.body.username
//             }
//         });
//         res.status(200).json({
//             restaurants
//         });
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// });

router.post('/insert_restaurant', upload.single('img'), (req, res) => {
    try{
        console.log(req.body);
        const logo = '/img/' + req.body.restaurant_logo;
        console.log('데이터', logo);
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
            fk_owner_id : req.body.fk_owner_id,
        })
        res.status(200).json({
            restaurant_num: req.body.restaurant_num,
            restaurant_name: req.body.restaurant_name,
            restaurant_university : req.body.restaurant_university,
            restaurant_category : req.body.restaurant_category,
            restaurant_main_menu1 : req.body.restaurant_main_menu1,
            restaurant_main_menu2 : req.body.restaurant_main_menu2,
            fk_owner_id : req.body.fk_owner_id,
            url: `/img/${req.filename}`
        });
    } catch (error) {
        console.log(error);
        next(error);
    }

});

module.exports = router;

