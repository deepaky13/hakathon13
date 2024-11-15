import mongoose from "mongoose";

const onDutySchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    studentId: { type: String, required: true },
    course: { type: String, required: true },
    semester: { type: Number, required: true },
    reason: { type: String, required: true },
    dateFrom: { type: Date, required: true },
    dateTo: { type: Date, required: true },
    contactNumber: { type: String, required: true },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Processing", "Approved", "Rejected"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("OnDutyForm", onDutySchema);
