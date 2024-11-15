import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true },
    courseDuration: { type: String, required: true },
    subjects: [
      {
        subjectName: { type: String, required: true },
        subjectCode: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Course", CourseSchema);
