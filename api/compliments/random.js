import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

const complimentSchema = new mongoose.Schema({ text: String });
const Compliment = mongoose.model("Compliment", complimentSchema);

app.get("/api/compliments/random", async (req, res) => {
  try {
    const count = await Compliment.countDocuments();
    const random = Math.floor(Math.random() * count);
    const compliment = await Compliment.findOne().skip(random);
    res.json(compliment || { text: "You're awesome!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vercel expects this:
export default app;