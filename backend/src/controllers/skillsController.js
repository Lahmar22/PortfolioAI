const { pool } = require("../config/db");

const getMySkills = async (req, res) => {
    try {
        const profileId = req.params.profile_id;
        const result = await pool.query(
            `SELECT * FROM skills WHERE profile_id = $1`,
            [profileId]
        );
        res.status(200).json({ skills: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const createSkill = async (req, res) => {
    try {
        const {profile_id, name, level } = req.body;
        const result = await pool.query(
            `INSERT INTO skills (profile_id, name, level) VALUES ($1, $2, $3) RETURNING *`,
            [profile_id, name, level]
        );
        res.status(201).json({ skill: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteSkill = async (req, res) => {
    try {
        const skillId = req.params.id;
        const profileId = req.params.profile_id;
        await pool.query(
            `DELETE FROM skills WHERE id = $1 AND profile_id = $2`,
            [skillId, profileId]
        );
        res.status(200).json({ message: "Skill deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getMySkills,
    createSkill,
    deleteSkill
};