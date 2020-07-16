const express = require('express');
const router = express.Router();
const { Member, Menu, Restaurant } = require('../../models');

router.get('/test', (req, res) => {
  console.log(req.query.id);
  res.send(
    "/v1/test 라우터에 GET 요청이 정상적으로 전송되었습니다."
  )
});

router.post('/create_member', (req, res) => {
  Member.create({
    m_id : req.body.m_id,
    m_password : req.body.m_password,
    m_name: req.body.m_name,
    m_birth: req.body.m_birth,
    m_phone: req.body.m_phone,
  });
  res.status(200).json({
    m_id : req.body.m_id,
    m_password : req.body.m_password,
    m_name: req.body.m_name,
    m_birth: req.body.m_birth,
    m_phone: req.body.m_phone,
  });
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

router.post('/listall', async (req, res, next) => {
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
