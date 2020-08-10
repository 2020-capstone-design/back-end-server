const express = require('express');
const bcrypt = require('bcrypt');
const { Owner } = require('../../models')

const router = express.Router();

router.post('/login', (req, res) => {
    Owner.findOne({
        owner_id: req.body.username,
    })
        .then(user=> {
            if (!user) {
                res.status(401).send('Authentication failed. User not found.');
            }
            bcrypt.compare(req.body.passwod, user.password, (error, result) => {
                if (error) {
                    res.status(500).send('Internal Server Error');
                }
                if (result) {
                    const token = newToken(user);

                    const loggedInUser = {
                        owner_id: user.owner_id,
                    };

                    res.status(200).json({
                        success: true,
                        user: loggedInUser,
                        message: 'Login Success',
                        token: token,
                    });
                } else {
                    res.status(401).json('Authentication failed. Wrong password.');
                }
            });
        })
        .catch(error => {
            res.status(500).json('Internal Server Error');
            throw error;
        });
});

router.post('/signup',async (req, res) => {
    const { username, password, name, birthday, phonenumber } = req.body;
    console.log(req.body);
    // encrypt password
    // NOTE: 10 is saltround which is a cost factor;

    await bcrypt.hash(password, 10,  async (error, hashedPassword) => {
        if (error) {
            console.log('실패');
            console.log(error);
            return res.status(500).json({
                error,
            });
        } else {
            console.log('들어옴');
            await Owner.create({
                owner_id: username,
                owner_password: hashedPassword,
                owner_name: name,
                owner_birth: birthday,
                owner_phone: phonenumber,
            })
                .then((error, user) => {
                    if (error) {
                        console.log(error);
                        res.status(409).send(error);
                    } else {
                        console.log(user);
                        res.send(user);
                    }
                })
        }
    });
});

module.exports = router;
