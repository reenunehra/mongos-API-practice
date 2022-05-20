const express = require('express');
const router = express.Router();

const controller = require('../controllers/user')

router.get('/users', controller.getUsers);
// router.get('user', );
// router.get('username', );
// router.post('',) 

module.exports = router;