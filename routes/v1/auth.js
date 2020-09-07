const express = require('express');
const bcrypt = require('bcrypt');
const { newToken } = require('../../utils/auth');
const { Owner } = require('../../models')

const router = express.Router();

router.post('/login', (req, res, next) => {
    console.log(req.body);
    Owner.findOne({
        where: {owner_id: req.body.username},
    })
        .then(user=> {
            console.log('user', user);
            if (!user) {
                res.status(401).send('입력하신 아이디에 대한 정보가 없습니다.');
            }
            bcrypt.compare(req.body.password, user.owner_password, (error, result) => {
                if (error) {
                    res.status(500).send('Internal Server Error');
                }

                if (result) {
                    const token = newToken(user);

                    const loggedInUser = {
                        username: user.owner_id,
                    };

                    res.status(200).json({
                        success: true,
                        user: loggedInUser,
                        message: 'Login Success',
                        token: token,
                    });
                } else {
                    console.log('result', result);
                    res.status(401).json('비밀번호가 올바르지 않습니다.');
                }
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json('Internal Server Error');
            next(error);
        });
});

router.post('/signup',async (req, res) => {
    const { owner_id, password, name, birthday, phonenumber } = req.body;
    console.log('body', req.body);

    try {
        const exUser = await Owner.findOne({where: { owner_id: owner_id }});
        console.log('exUser', exUser);
        if (exUser) {
            res.status(409).send('이미 가입된 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        await Owner.create({
            owner_id: owner_id,
            owner_password: hashedPassword,
            owner_name: name,
            owner_birth: birthday,
            owner_phone: phonenumber,
        });
        return res.status(201).json(owner_id);
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            'Internal Server Error'
        );
    }
});

module.exports = router;
