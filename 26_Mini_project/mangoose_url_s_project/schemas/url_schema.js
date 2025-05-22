// Step 4️⃣. Create Schema
import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
  id: { type: Number },
  url: { type: String },
  shortCode: { type: String },
});


// Step 5️⃣. Create model (create collection or table)
export const urls = mongoose.model("url", urlSchema);