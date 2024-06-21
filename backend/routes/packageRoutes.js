// routes/packageRoutes.js
const express = require('express');
const { getPackages, createPackage, updatePackage, deletePackage } = require('../controllers/packageController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/', authMiddleware, getPackages);
router.post('/', authMiddleware, createPackage);
router.put('/:id', authMiddleware, updatePackage);
router.delete('/:id', authMiddleware, deletePackage);
module.exports = router;