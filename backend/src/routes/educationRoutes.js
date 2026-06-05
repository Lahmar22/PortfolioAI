const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getMyEducation,
  createEducation,
  deleteEducation
} = require("../controllers/educationController");

/**
 * @swagger
 * tags:
 *   name: Education
 */

/**
 * @swagger
 * /education/me/{profile_id}:
 *   get:
 *     summary: Get authenticated user's education
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: profile_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of user's education
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 */
router.get("/me/:profile_id", auth, getMyEducation);

/**
 * @swagger
 * /education:
 *   post:
 *     summary: Create a new education
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - profile_id
 *               - school
 *             properties:
 *               profile_id:
 *                 type: integer
 *                 example: 1
 *               school:
 *                 type: string
 *                 example: Portfolio AI
 *               degree:
 *                 type: string
 *                 example: Bachelor of Science in Computer Science
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: 2020-09-01
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: 2024-06-01
 *     responses:
 *       201:
 *         description: Education created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 */ 
router.post("/", auth, createEducation);

/**
 * @swagger
 * /education/{id}/{profile_id}:
 *   delete:
 *     summary: Delete an education entry
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Education ID
 *       - in: path
 *         name: profile_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: Education deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Education not found
 */
router.delete("/:id/:profile_id", auth, deleteEducation);

module.exports = router;