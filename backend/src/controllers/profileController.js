const { pool } = require("../config/db");

const getMyProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query(
            `SELECT
                p.*,
                u.fullname,
                u.email
            FROM profiles p
            JOIN users u
                ON p.user_id = u.id
            WHERE p.user_id = $1 `,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({ profile: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateProfile = async (req, res) => {
    try {
        const {
            title,
            bio,
            location,
            website,
            cv_url
        } = req.body;

        const result = await pool.query(
            `
            UPDATE profiles
            SET
                bio = $1,
                location = $2,
                website = $3,
                cv_url = $4,
                title = $5
            WHERE user_id = $6
            RETURNING *
            `,
            [ 
                bio,
                location,
                website,
                cv_url,
                title, 
                req.user.id
            ]
        );

        res.status(200).json({
            success: true,
            profile: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getMyProfile,
    updateProfile
};