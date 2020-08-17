const express = require('express');
const bcrypt = require('bcrypt');
const { newToken } = require('../../utils/auth');
const { Owner } = require('../../models')

const router = express.Router();

router.post('/login', (req, res) => {
    Owner.findOne({
        where: {owner_id: req.body.username},
    })
        .then(user=> {
            console.log(user);
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
                    console.log(result);
                    res.status(401).json('비밀번호가 올바르지 않습니다.');
                }
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json('Internal Server Error');
            throw error;
        });
});

router.post('/signup',async (req, res) => {
    const { owner_id, password, name, birthday, phonenumber } = req.body;
    console.log(req.body);
    // encrypt password
    // NOTE: 10 is saltround which is a cost factor;

    try {
        const exUser = await Owner.findOne({where: { owner_id }});
        if (exUser) {
            res.status(409);
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        await Owner.create({
            owner_id: owner_id,
            owner_password: hashedPassword,
            owner_name: name,
            owner_birth: birthday,
            owner_phone: phonenumber,
        });
        return res.status(200).send('success');
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error,
        });
    }

});

module.exports = router;
