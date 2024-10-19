import mongoose, { Types } from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);
export const Application = mongoose.model("Application", applicationSchema);
