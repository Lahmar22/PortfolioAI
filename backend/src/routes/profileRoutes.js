const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getMyProfile,
  updateProfile
} = require("../controllers/profileController");

/**
 * @swagger
 * /profile/me:
 *   get:
 *     summary: Get authenticated user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 */
router.get("/me", auth, getMyProfile);

/**
 * @swagger
 * /profile/me:
 *   put:
 *     summary: Update authenticated user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Full Stack Developer
 *               bio:
 *                 type: string
 *                 example: Full Stack Developer passionate about React and Node.js
 *               location:
 *                 type: string
 *                 example: Casablanca, Morocco
 *               website:
 *                 type: string
 *                 example: https://portfolio.com
 *               cv_url:
 *                 type: string
 *                 example: https://example.com/cv.pdf
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 */
router.put("/me", auth, updateProfile);

module.exports = router;