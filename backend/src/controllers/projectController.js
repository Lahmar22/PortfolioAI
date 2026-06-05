const { pool } = require("../config/db");

const getMyProjects = async (req, res) => {
    try {
        const profileId = req.params.profile_id;
        const result = await pool.query(
            `SELECT * FROM projects WHERE profile_id = $1`,
            [profileId]
        );
        res.status(200).json({ projects: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const createProject = async (req, res) => {
    try {
        const {profile_id, title, description, github_url } = req.body;
        const result = await pool.query(
            `INSERT INTO projects (profile_id, title, description, github_url) VALUES ($1, $2, $3, $4) RETURNING *`,
            [profile_id, title, description, github_url]
        );
        res.status(201).json({ project: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const profileId = req.params.profile_id;
        await pool.query(
            `DELETE FROM projects WHERE id = $1 AND profile_id = $2`,
            [projectId, profileId]
        );
        res.status(200).json({ message: "Project deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getMyProjects,
    createProject,
    deleteProject
};