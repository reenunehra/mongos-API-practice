const express = require('express');
const router = express.Router();

const controller = require('../controllers/user')

router.get('/users', controller.getUsers);
router.post('/users', controller.addUsers);
// router.put('/users', controller.updateUsers);
// router.patch('/users', controller.modifyUsers);
// router.delete('/users', controller.removeUsers);
// router.get('user', );
// router.get('username', );
// router.post('',) 

module.exports = router;