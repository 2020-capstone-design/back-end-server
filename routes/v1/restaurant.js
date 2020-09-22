const express = require('express');
const router = express.Router();
const { Restaurant, Menu } = require('../../models');
const { Op } = require('sequelize');
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
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
            console.log();
        },
    }),
    limits: {fileSize: 3 * 1024 * 1024},
});

router.get('/list_restaurants/:restaurant_university&:restaurant_category', async (req, res, next) => {
    try {
        //console.log(req.params.restaurant_university);
        const restaurants = await Restaurant.findAll( {
            where: {
                restaurant_university: req.params.restaurant_university,
                restaurant_category: req.params.restaurant_category,
            },
            order: [['restaurant_isOpen', 'DESC']],
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
    const hashtag = req.params.hashtag;
    try{
        const result = await Restaurant.findAll({
            include: [{
              model: Menu,
              where: {menu_name: {[Op.like]: '%' + hashtag + '%'}},
            }],
            where: {
                restaurant_university: req.params.restaurant_university,
            },
        })
        res.status(200).json({
            result
        })
    } catch (error) {
        console.error(error);
        res.status(500).message('Internal Server Error');
        next(error);
    }
})

router.post('/insert_restaurant', upload.fields([{name: 'restaurant_logo'}, {name: 'restaurant_outside_image'}, {name: 'restaurant_menu_image1'},
    {name: 'restaurant_menu_image2'}]), async (req, res, next) => {
    try{
        console.log(req.body);
        let logo, outside_image, menu_image1, menu_image2;
        if(req.body.restaurant_name === '' || req.body.restaurant_university === '' || req.body.restaurant_category === '') {
            return res.status(401).json('필수 입력사항을 입력하세요.');
        }

        try{
            if (req.files['restaurant_logo'][0] !== undefined) {
                logo = '/img/' + req.files['restaurant_logo'][0].filename;
                console.log(logo);
            }
        } catch (error) {
            logo = 'noImage';
        }
        try {
            if (req.files['restaurant_outside_image'][0] !== undefined) {
                outside_image = '/img/' + req.files['restaurant_outside_image'][0].filename;
                console.log(outside_image);
            }
        } catch (error) {
            outside_image = 'noImage';
        }
        try{
            if (req.files['restaurant_menu_image1'][0] !== undefined) {
                menu_image1 = '/img/' + req.files['restaurant_menu_image1'][0].filename;
                console.log(menu_image1);
            }
        } catch (error) {
            menu_image1 = 'noImage';
        }
        try{
            if (req.files['restaurant_menu_image2'][0] !== undefined) {
                menu_image2 = '/img/' + req.files['restaurant_menu_image2'][0].filename;
                console.log(menu_image2);
            }
        } catch (error) {
            menu_image2 = 'noImage';
        }

        await Restaurant.create({
            restaurant_name : req.body.restaurant_name,
            restaurant_phone : req.body.restaurant_phone,
            restaurant_loc : req.body.restaurant_loc,
            restaurant_university : req.body.restaurant_university,
            restaurant_intro : req.body.restaurant_intro,
            restaurant_category : req.body.restaurant_category,
            restaurant_logo : logo,
            restaurant_outside_image : outside_image,
            restaurant_menu_image1: menu_image1,
            restaurant_menu_image2: menu_image2,
            restaurant_main_menu : req.body.restaurant_main_menu,
            restaurant_operating_time : req.body.restaurant_operating_time,
            restaurant_closed_days : req.body.restaurant_closed_days,
            restaurant_food_origin : req.body.restaurant_food_origin,
            fk_owner_id : req.body.fk_owner_id,
        })
        res.status(200).send('success!');
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal Server Error');
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
            restaurant_main_menu : req.body.restaurant_main_menu,
            restaurant_operating_time : req.body.restaurant_operating_time,
            restaurant_closed_days : req.body.restaurant_closed_days,
            restaurant_food_origin : req.body.restaurant_food_origin,
            restaurant_break_time: req.body.restaurant_break_time,
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
            restaurant_isOpen: req.body.isOpen
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

router.patch('/update_restaurant_outside_image', upload.single('outside_image'), async(req, res) => {
    try {
        console.log(req.file, req.body.restaurant_num);
        let outside_image;
        if (req.file !== undefined) {
            outside_image = '/img/' + req.file.filename;
        } else {
            outside_image = 'noImage'
        }
        await Restaurant.update({
            restaurant_outside_image: outside_image,
        }, {
            where: { restaurant_num: req.body.restaurant_num }
        });
        res.status(200).json('Success!');
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
})

router.patch('/update_restaurant_menu_image1', upload.single('menu_image1'), async (req, res) => {
    try {
        console.log(req.file, req.body.restaurant_num);
        let menu_image1;
        if (req.file !== undefined) {
            menu_image1 = '/img/' + req.file.filename;
        } else {
            menu_image1 = 'noImage'
        }
        await Restaurant.update({
            restaurant_menu_image1: menu_image1,
        }, {
            where: { restaurant_num: req.body.restaurant_num }
        });
        res.status(200).json('Success!');
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
})

router.patch('/update_restaurant_menu_image2', upload.single('menu_image2'), async (req, res) => {
    try {
        console.log(req.file, req.body.restaurant_num);
        let menu_image2;
        if (req.file !== undefined) {
            menu_image2 = '/img/' + req.file.filename;
        } else {
            menu_image2 = 'noImage'
        }
        await Restaurant.update({
            restaurant_menu_image2: menu_image2,
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

