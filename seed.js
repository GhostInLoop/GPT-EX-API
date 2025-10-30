import mongoose from "mongoose";

// Use MONGO_URI from environment for safety. Make sure to set it before running `npm run seed`.
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("MONGO_URI environment variable is not set. Aborting seed.");
  process.exit(1);
}

await mongoose.connect(uri);

const complimentSchema = new mongoose.Schema({ text: String });
const Compliment = mongoose.model("Compliment", complimentSchema);

const compliments = [
  "You’re a masterpiece in motion 🎨",
  "You make coffee nervous ☕",
  "You radiate good code and good vibes 💻✨",
  "Someone call NASA, you’re a star 🌟",
  "You’re proof that charm can be compiled 😎",
  "You make the terminal blush 💚",
  "Confidence looks natural on you 🌈",
  "You’re absolutely magnetic ⚡"
];

await Compliment.insertMany(compliments.map(text => ({ text })));
console.log("✅ Compliments seeded successfully");
await mongoose.disconnect();