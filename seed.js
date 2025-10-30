import mongoose from "mongoose";

await mongoose.connect("mongodb+srv://krishsinha2406_db_user:tOJfY0r32a3r1ln6@cluster0.xlrygjn.mongodb.net/?appName=Cluster0");

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