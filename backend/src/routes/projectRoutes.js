const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getMyProjects,
  createProject,
  deleteProject
} = require("../controllers/projectController");

/**
 * @swagger
 * tags:
 *   name: Projects
 */

/**
 * @swagger
 * /projects/me/{profile_id}:
 *   get:
 *     summary: Get authenticated user's projects
 *     tags: [Projects]
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
 *         description: List of user's projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 */
router.get("/me/:profile_id", auth, getMyProjects);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
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
 *               - title
 *             properties:
 *               profile_id:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: Portfolio AI
 *               description:
 *                 type: text
 *                 example: AI-powered portfolio builder
 *               github_url:
 *                 type: string
 *                 example: https://github.com/user/project
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 */
router.post("/", auth, createProject);

/**
 * @swagger
 * /projects/{id}/{profile_id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *       - in: path
 *         name: profile_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 */
router.delete("/:id/:profile_id", auth, deleteProject);

module.exports = router;