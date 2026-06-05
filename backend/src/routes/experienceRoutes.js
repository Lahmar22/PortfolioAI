const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getMyExperiences,
  createExperience,
  deleteExperience
} = require("../controllers/experienceController");

/**
 * @swagger
 * tags:
 *   name: Experiences
 */

/**
 * @swagger
 * /experiences/me/{profile_id}:
 *   get:
 *     summary: Get authenticated user's experiences
 *     tags: [Experiences]
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
 *         description: List of user's experiences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 */
router.get("/me/:profile_id", auth, getMyExperiences);

/**
 * @swagger
 * /experiences:
 *   post:
 *     summary: Create a new experience
 *     tags: [Experiences]
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
 *               - company
 *               - position
 *             properties:
 *               profile_id:
 *                 type: integer
 *                 example: 1
 *               company:
 *                 type: string
 *                 example: Certified JavaScript Developer
 *               position:
 *                 type: string
 *                 example: Software Engineer
 *               description:
 *                 type: text
 *                 example: Worked on various projects using JavaScript and related technologies.
 *               start_date:
 *                 type: date
 *                 format: date
 *                 example: 2020-01-01
 *               end_date:
 *                 type: date
 *                 format: date
 *                 example: 2023-01-01
 *     responses:
 *       201:
 *         description: Experience created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 */ 
router.post("/", auth, createExperience);

/**
 * @swagger
 * /experiences/{id}/{profile_id}:
 *   delete:
 *     summary: Delete an experience
 *     tags: [Experiences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Experience ID
 *       - in: path
 *         name: profile_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: Experience deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Experience not found
 */
router.delete("/:id/:profile_id", auth, deleteExperience);

module.exports = router;