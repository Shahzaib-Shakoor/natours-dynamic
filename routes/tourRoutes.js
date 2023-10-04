const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const { getAllTours, createTour, getTour, updateTour, deleteTour } =
  tourController;

const router = express.Router();

// router.param('id', tourController.checkID);

router.use('/:tourId/reviews', reviewRouter);

router.route('/top-5-cheap').get(tourController.aliasTopTours, getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan,
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .get(getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    createTour,
  );

router
  .route('/:id')
  .get(getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    deleteTour,
  );

module.exports = router;
