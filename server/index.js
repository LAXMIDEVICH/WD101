const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./db/connect");
const path = require("path");
const fs = require("fs");
app.use(express.json());
app.use(cors());
app.use("/api", require("./routes/User"));
app.use("/api/lost", require("./routes/Lost"));
app.use("/api/found", require("./routes/Found"));
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // specify the directory where you want to save the images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    // Save the image path to MongoDB
    console.log(req.file);
    const imagePath = req.file.path;

    res.status(200).json({ message: "Image uploaded successfully", imagePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/image/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "uploads/", imageName);

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(err);
      return res.status(404).send("Image not found");
    }

    res.sendFile(imagePath);
  });
});
const startServer = async () => {
  try {
    await connectDB(process.env.CONNECTION_STRING);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
