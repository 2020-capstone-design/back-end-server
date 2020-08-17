const express = require('express');
const router = express.Router();
const { Member, Menu, Restaurant } = require('../../models');

router.get('/test', (req, res) => {
  console.log(req.query.id);
  res.send(
    "/v1/test 라우터에 GET 요청이 정상적으로 전송되었습니다."
  )
});

router.post('/insert_owner', async(req, res) => {
  try{
    await Member.create({
      owner_id : req.body.owner_id,
      owner_password : req.body.owner_password,
      owner_name: req.body.owner_name,
      owner_birth: req.body.owner_birth,
      owner_phone: req.body.owner_phone,
    });
    res.status(200);
  } catch (err) {
    console.err(err);
    next(err);
  }
});

router.post('/list', async (req, res, next) => {
  try{
    console.log(req.body.m_name);
    const meember = await Member.findOne({
      where: { m_name: req.body.m_name },
    });
    res.status(200).json({
      m_id: meember.m_id,
      m_password : meember.m_password,
      m_name: meember.m_name,
      m_birth: meember.m_birth,
      m_phone: meember.m_phone,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/list_owner', async (req, res, next) => {
  try {
    console.log(req.body.m_name);
    const members = await Member.findAll({
      where: {
        m_name: req.body.m_name
      },
    });
    res.status(200).json({
      members
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
