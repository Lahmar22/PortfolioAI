const { pool } = require("../config/db");

const getMySocialLinks = async (req, res) => {
    try {
        const profileId = req.params.profile_id;
        const result = await pool.query(
            `SELECT * FROM social_links WHERE profile_id = $1`,
            [profileId]
        );
        res.status(200).json({ socialLinks: result.rows });
    } catch (error) { 
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const createSocialLink = async (req, res) => {
    try {
        const {profile_id, platform, url } = req.body;
        const result = await pool.query(
            `INSERT INTO social_links (profile_id, platform, url) VALUES ($1, $2, $3) RETURNING *`,
            [profile_id, platform, url]
        );
        res.status(201).json({ socialLink: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteSocialLink = async (req, res) => {
    try {
        const socialLinkId = req.params.id;
        const profileId = req.params.profile_id;
        await pool.query(
            `DELETE FROM social_links WHERE id = $1 AND profile_id = $2`,
            [socialLinkId, profileId]
        );
        res.status(200).json({ message: "Social link deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getMySocialLinks,
    createSocialLink,
    deleteSocialLink
};