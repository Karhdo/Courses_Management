const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.use('/stored/courses', meController.storedCourses);
router.use('/trash/courses', meController.trashCourses);

module.exports = router;
