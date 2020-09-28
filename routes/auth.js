const express = require('express');
const bcrypt = require('bcrypt');
const { newToken } = require('../../utils/auth');
const { Owner } = require('../../models');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/login', (req, res) => {

    Owner.findOne({
        where: {owner_id: req.body.username},
    })
        .then(user=> {
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
        });
});

router.post('/signup',async (req, res) => {

    try {
        const { owner_id, password, email, name, birthday, phonenumber } = req.body;
        if(owner_id === '' || password === '' || name === '' || email === '')
            return res.status(400).json('올바르지 않은 형식입니다.');

        const exUser = await Owner.findOne({where: { owner_id: owner_id }});
        if (exUser) {
            return res.status(409).send('이미 가입된 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        await Owner.create({
            owner_id: owner_id,
            owner_password: hashedPassword,
            owner_email: email,
            owner_name: name,
            owner_birth: birthday,
            owner_phone: phonenumber,
        });
        return res.status(201).json(owner_id);
    } catch (error) {
        console.error(error);
        res.status(500).json(
            'Internal Server Error'
        );
    }
});


router.post('/get_owner_id', (req, res) => {

    if (req.body.owner_name === '' || req.body.owner_phone === '') {
        return res.status(400).json('올바르지 않은 형식입니다.');
    }

    Owner.findOne({
        attributes: ['owner_id'],
        where: {owner_name: req.body.owner_name, owner_phone: req.body.owner_phone},
    })
        .then(ownerId => {
            if (!ownerId) {
                res.status(401).json('입력하신 정보에 대한 아이디가 없습니다.');
            }
            res.status(200).json( ownerId )
        })
        .catch(error => {
            console.error(error);
            res.status(500).json('Internal Server Error');
        })
});

router.patch('/update_random_password', async (req, res) => {

    try {
        const { owner_id, owner_email } = req.body;
        if (owner_id === '' || owner_email === '') {
            return res.status(400).json('올바르지 않은 형식입니다.');
        }
        const randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        const randomNum = Math.floor(Math.random() * 10000) + 1
        const specialCharacters = "!$%&()=?";
        const randomSC =  specialCharacters.substr(Math.floor(specialCharacters.length*Math.random()), 1);
        const randomPassword = randomSC + randomNum + randomString;

        const user = await Owner.findOne({ where: {owner_id: owner_id}});
        if(!user) {
            return res.status(401).json('입력하신 아이디에 대한 정보가 없습니다.');
        } else {
            if (user.owner_email !== owner_email) {
                return res.status(401).json('이메일 정보가 올바르지 않습니다.');
            }
            const randomHashedPassword = await bcrypt.hash(randomPassword, 12);
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ID,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_ID,
                to: owner_email ,
                subject: '오늘뭐먹지? 사장님 광장 새로운 비밀번호',
                text: randomPassword,
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                    return res.status(500).json('이메일 전송에 실패했습니다. 관리자에게 문의해주요.');
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
            await Owner.update({owner_password: randomHashedPassword,}, {where: {owner_id: owner_id}});
        }
        res.status(200).json('해당 이메일로 임시 비밀번호가 발송되었습니다.');
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }

})

module.exports = router;
