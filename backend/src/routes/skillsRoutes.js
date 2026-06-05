const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getMySkills,
  createSkill,
  deleteSkill
} = require("../controllers/skillsController");

/**
 * @swagger
 * tags:
 *   name: Skills
 */

/**
 * @swagger
 * /skills/me/{profile_id}:
 *   get:
 *     summary: Get authenticated user's skills
 *     tags: [Skills]
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
 *         description: List of user's skills
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 */
router.get("/me/:profile_id", auth, getMySkills);

/**
 * @swagger
 * /skills:
 *   post:
 *     summary: Create a new skill
 *     tags: [Skills]
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
 *               - name
 *             properties:
 *               profile_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Portfolio AI
 *               level:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Skill created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 */
router.post("/", auth, createSkill);

/**
 * @swagger
 * /skills/{id}/{profile_id}:
 *   delete:
 *     summary: Delete a skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Skill ID
 *       - in: path
 *         name: profile_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: Skill deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Skill not found
 */
router.delete("/:id/:profile_id", auth, deleteSkill);

module.exports = router;