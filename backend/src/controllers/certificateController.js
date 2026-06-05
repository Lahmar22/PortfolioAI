const { pool } = require("../config/db");

const getMyCertificates = async (req, res) => {
    try {
        const profileId = req.params.profile_id;
        const result = await pool.query(
            `SELECT * FROM certifications WHERE profile_id = $1`,
            [profileId]
        );
        res.status(200).json({ certificates: result.rows });
    } catch (error) { 
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const createCertificate = async (req, res) => {
    try {
        const {profile_id, name, issuer, issue_date, expiration_date, credential_url, description } = req.body;
        const result = await pool.query(
            `INSERT INTO certifications (profile_id, name, issuer, issue_date, expiration_date, credential_url, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [profile_id, name, issuer, issue_date, expiration_date, credential_url, description]
        );
        res.status(201).json({ certificate: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteCertificate = async (req, res) => {
    try {
        const certificateId = req.params.id;
        const profileId = req.params.profile_id;
        await pool.query(
            `DELETE FROM certifications WHERE id = $1 AND profile_id = $2`,
            [certificateId, profileId]
        );
        res.status(200).json({ message: "Certificate deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getMyCertificates,
    createCertificate,
    deleteCertificate
};