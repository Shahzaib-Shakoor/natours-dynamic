const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const { getAllUsers, getUser, createUser, updateUser, deleteUser } =
  userController;

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/update-password', authController.updatePassword);

router.get('/me', userController.getme, userController.getUser);

router.patch(
  '/update-me',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe,
);
router.delete('/delete-me', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
