import mongoose from "mongoose";

let isConnected = false;

// MongoDB connection
async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI not configured");
  }

  // Connect with a short timeout for serverless environments
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000
  });
  isConnected = true;
}
// Mongoose model
const complimentSchema = new mongoose.Schema({ text: String });
const Compliment = mongoose.models.Compliment || mongoose.model("Compliment", complimentSchema);

// API handler
export default async function handler(req, res) {
  try {
    // Validate env early so deployed function returns an actionable message
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI environment variable is not set.");
      return res.status(500).json({ error: "MONGO_URI not configured on server" });
    }

    await connectDB();

    const count = await Compliment.countDocuments();
    if (count === 0) {
      return res.json({ text: "You're awesome, even without a database! 🐼" });
    }

    const random = Math.floor(Math.random() * count);
    const compliment = await Compliment.findOne().skip(random);
    res.status(200).json(compliment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}