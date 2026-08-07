require("dotenv").config();

const express = require("express");
const db = require("./models");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "ResumeFlow v2 API is running 🚀"
    });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/resumes", require("./routes/resumes"));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

db.sequelize.authenticate()
    .then(() => {
        console.log("✅ Database connected successfully.");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Database connection failed:");
        console.error(error);
    });