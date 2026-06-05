const { pool } = require("../config/db");

const getAllTemplates = async (req, res) => {
    try {

        const result = await pool.query("SELECT * FROM templates");
        res.status(200).json({ templates: result.rows });

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Server error" });

    }
};

const createTemplate = async (req, res) => {
    try {
        const { name, description, thumbnail_url } = req.body;

        const result = await pool.query(
            "INSERT INTO templates (name, description, thumbnail_url) VALUES ($1, $2, $3) RETURNING *",
            [name, description, thumbnail_url]
        );

        res.status(201).json({ template: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM templates WHERE id = $1", [id]);
        res.status(200).json({ message: "Template deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getAllTemplates,
    createTemplate,
    deleteTemplate
};