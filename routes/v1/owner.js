const express = require('express');
const router = express.Router();

const {Owner} = require('../../models');

router.get('/owner_info/:id', (req, res, next) => {
    Owner.findOne({
        where: {owner_id: req.params.id},
    })
        .then(user => {
            res.json({ user });
        })
        .catch(error => {
            console.error(error);
            res.status(500).message('Internal Server Error');
            next(error);
        })
});

router.patch('/update_owner_info', async (req, res, next) => {
    try {
        await Owner.update({
            owner_name: req.body.name,
            owner_birth: req.body.birth,
            owner_phone: req.body.phone,
        }, {
            where: {owner_id: req.body.username},
        })
        res.status(200).json('success');
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
        next(error);
    }
})


router.delete('/delete_owner/:id', async (req, res, next) => {

    console.log(req.params.id);
    try {
        const owner = await Owner.findOne({where: {owner_id: req.params.id}});
        if (!owner) {
            return res.status(409).send('해당 아이디가 없습니다.');
        }
        await Owner.destroy({where: {owner_id: req.params.id}});
        res.status(200).send('해당 계정이 삭제되었습니다.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
        next(error);
    }
});

module.exports = router;
