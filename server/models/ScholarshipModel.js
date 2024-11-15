import mongoose from "mongoose";

const ScholarshipSchema = new mongoose.Schema(
  {
    scholarshipName: { type: String, required: true },
    eligibility: { type: String, required: true },
    amount: { type: String },
    applicationDeadline: { type: Date, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Scholarship", ScholarshipSchema);
