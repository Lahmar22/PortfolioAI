const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getMySocialLinks,
  createSocialLink,
  deleteSocialLink
} = require("../controllers/socialController");

/**
 * @swagger
 * tags:
 *   name: Social Links
 */

/**
 * @swagger
 * /social-links/me/{profile_id}:
 *   get:
 *     summary: Get authenticated user's social links
 *     tags: [Social Links]
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
 *         description: List of user's social links
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 */
router.get("/me/:profile_id", auth, getMySocialLinks);

/**
 * @swagger
 * /social-links:
 *   post:
 *     summary: Create a new social link
 *     tags: [Social Links]
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
 *               - platform
 *               - url
 *             properties:
 *               profile_id:
 *                 type: integer
 *                 example: 1
 *               platform:
 *                 type: string
 *                 example: Twitter
 *               url:
 *                 type: text
 *                 example: https://twitter.com/johndoe
 *     responses:
 *       201:
 *         description: Social link created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 */ 
router.post("/", auth, createSocialLink);

/**
 * @swagger
 * /social-links/{id}/{profile_id}:
 *   delete:
 *     summary: Delete a social link
 *     tags: [Social Links]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Social Link ID
 *       - in: path
 *         name: profile_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: Social link deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Social link not found
 */
router.delete("/:id/:profile_id", auth, deleteSocialLink);

module.exports = router;