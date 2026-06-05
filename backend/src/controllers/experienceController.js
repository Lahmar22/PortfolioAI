const { pool } = require("../config/db");

const getMyExperiences = async (req, res) => {
    try {
        const profileId = req.params.profile_id;
        const result = await pool.query(
            `SELECT * FROM experiences WHERE profile_id = $1`,
            [profileId]
        );
        res.status(200).json({ experiences: result.rows });
    } catch (error) { 
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const createExperience = async (req, res) => {
    try {
        const {profile_id, company, position, description, start_date, end_date } = req.body;
        const result = await pool.query(
            `INSERT INTO experiences (profile_id, company, position, description, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [profile_id, company, position, description, start_date, end_date]
        );
        res.status(201).json({ experience: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteExperience = async (req, res) => {
    try {
        const experienceId = req.params.id;
        const profileId = req.params.profile_id;
        await pool.query(
            `DELETE FROM experiences WHERE id = $1 AND profile_id = $2`,
            [experienceId, profileId]
        );
        res.status(200).json({ message: "Experience deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getMyExperiences,
    createExperience,
    deleteExperience
};