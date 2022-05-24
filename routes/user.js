const express = require('express');
const router = express.Router();

const controller = require('../controllers/user')

router.get('/users', controller.getUsers);
router.get('/users', controller.getUsersName);
router.get('/users', controller.getUsersID);

router.post('/users', controller.addUsers);
router.put('/users/:id', controller.updateUsers);
router.patch('/users/:id', controller.modifyUsers);
router.delete('/users/:id', controller.removeUsers);


module.exports = router;