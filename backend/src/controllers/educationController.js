const { pool } = require("../config/db");

const getMyEducation = async (req, res) => {
    try {
        const profileId = req.params.profile_id;
        const result = await pool.query(
            `SELECT * FROM educations WHERE profile_id = $1`,
            [profileId]
        );
        res.status(200).json({ education: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const createEducation = async (req, res) => {
    try {
        const {profile_id, school, degree, start_date, end_date } = req.body;
        const result = await pool.query(
            `INSERT INTO educations (profile_id, school, degree, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [profile_id, school, degree, start_date, end_date]
        );
        res.status(201).json({ education: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteEducation = async (req, res) => {
    try {
        const educationId = req.params.id;
        const profileId = req.params.profile_id;
        await pool.query(
            `DELETE FROM educations WHERE id = $1 AND profile_id = $2`,
            [educationId, profileId]
        );
        res.status(200).json({ message: "Education deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getMyEducation,
    createEducation,
    deleteEducation
};