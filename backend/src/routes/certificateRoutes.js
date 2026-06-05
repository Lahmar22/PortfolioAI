const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getMyCertificates,
  createCertificate,
  deleteCertificate
} = require("../controllers/certificateController");

/**
 * @swagger
 * tags:
 *   name: Certificates
 */

/**
 * @swagger
 * /certificates/me/{profile_id}:
 *   get:
 *     summary: Get authenticated user's certificates
 *     tags: [Certificates]
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
 *         description: List of user's certificates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 */
router.get("/me/:profile_id", auth, getMyCertificates);

/**
 * @swagger
 * /certificates:
 *   post:
 *     summary: Create a new certificate
 *     tags: [Certificates]
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
 *               - issuer
 *             properties:
 *               profile_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Certified JavaScript Developer
 *               issuer:
 *                 type: string
 *                 example: JavaScript Institute
 *               issue_date:
 *                 type: date
 *                 format: date
 *                 example: 2023-01-01
 *               expiration_date:
 *                 type: date
 *                 format: date
 *                 example: 2020-09-01
 *               credential_url:
 *                 type: text
 *                 example: https://www.example.com/certificates/12345
 *               description:
 *                 type: text
 *                 example: A certificate of completion for the Certified JavaScript Developer course.
 *     responses:
 *       201:
 *         description: Certificate created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 */ 
router.post("/", auth, createCertificate);

/**
 * @swagger
 * /certificates/{id}/{profile_id}:
 *   delete:
 *     summary: Delete a certificate
 *     tags: [Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Certificate ID
 *       - in: path
 *         name: profile_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: Certificate deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Certificate not found
 */
router.delete("/:id/:profile_id", auth, deleteCertificate);

module.exports = router;