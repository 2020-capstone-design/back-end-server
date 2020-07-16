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
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {fileSize: 5 * 300 * 300},
});

router.post('/list_rest', async (req, res, next) => {
    try {
        console.log(req.body.rest_university);
        const restaurants = await Restaurant.findAll({
            where: {
                rest_university: req.body.rest_university,
                rest_category: req.body.rest_category,
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

router.post('/insert_restaurant', upload.single('img'), (req, res) => {
    console.log(req.file);
    const logo = '/img/' + req.file.filename;
    Restaurant.create({
        rest_num : req.body.rest_num,
        rest_name : req.body.rest_name,
        rest_university : req.body.rest_university,
        rest_category : req.body.rest_category,
        rest_logo : logo,
        // rest_main_menu1 : req.body.rest_main_menu1,
        // rest_main_menu2 : req.body.rest_main_menu2,
        fk_m_id : req.body.fk_m_id,
    })
    res.status(200).json({
        // rest_num: req.body.rest_num,
        // rest_name: req.body.rest_name,
        // rest_university : req.body.rest_university,
        // rest_category : req.body.rest_category,
        // rest_main_menu1 : req.body.rest_main_menu1,
        // rest_main_menu2 : req.body.rest_main_menu2,
        // fk_m_id : req.body.fk_m_id,
        url: `/img/${req.file.filename}`
    });
});

module.exports = router;

