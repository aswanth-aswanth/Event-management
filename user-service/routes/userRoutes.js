const express = require('express');
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers
} = require('../controllers/userController');
const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
