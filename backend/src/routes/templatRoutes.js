const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");

const {
    getAllTemplates,
    createTemplate,
    deleteTemplate
} = require("../controllers/templetController");

/**
 * @swagger
 * tags:
 *   name: Templates
 */

/**
 * @swagger
 * /templates:
 *   get:
 *     summary: Get all templates
 *     tags: [Templates]
 *     responses:
 *       200:
 *         description: List of templates retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   slug:
 *                     type: string
 *                   category:
 *                     type: string
 *                   description:
 *                     type: string
 *                   thumbnail_url:
 *                     type: string
 *                   preview_url:
 *                     type: string
 */
router.get("/", getAllTemplates);

/**
 * @swagger
 * /templates:
 *   post:
 *     summary: Create a new template
 *     tags: [Templates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *             properties:
 *               name:
 *                 type: string
 *                 example: Modern Developer
 *               slug:
 *                 type: string
 *                 example: modern-developer
 *               category:
 *                 type: string
 *                 example: Developer
 *               description:
 *                 type: string
 *                 example: Modern portfolio template for developers
 *               thumbnail_url:
 *                 type: string
 *                 example: https://example.com/thumb.jpg
 *               preview_url:
 *                 type: string
 *                 example: https://example.com/demo
 *     responses:
 *       201:
 *         description: Template created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", auth, checkRole, createTemplate);

/**
 * @swagger
 * /templates/{id}:
 *   delete:
 *     summary: Delete a template
 *     tags: [Templates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Template ID
 *     responses:
 *       200:
 *         description: Template deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Template not found
 */
router.delete("/:id", auth, checkRole, deleteTemplate);

module.exports = router;