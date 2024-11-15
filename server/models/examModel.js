import mongoose from "mongoose";

const ExamTimetableSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true },
    subjectName: { type: String, required: true },
    examDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("ExamTimetable", ExamTimetableSchema);
