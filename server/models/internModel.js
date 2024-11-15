import mongoose from "mongoose";

const InternshipSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    position: { type: String, required: true },
    duration: { type: String, required: true },
    stipend: { type: String },
    applicationDeadline: { type: Date },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Internship", InternshipSchema);
