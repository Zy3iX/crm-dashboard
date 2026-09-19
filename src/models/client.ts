import mongoose, { Model } from "mongoose";

const clientSchema = new mongoose.Schema<ClientType>(
  {
    firstName: { type: String, required: true },
    secondName: { type: String, required: false },
    lastName: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: true },
    preferredLanguage: {
      type: String,
      required: true,
      enum: ["English", "Russian", "Chinese"],
    },
    fromCountry: { type: String, required: false },
    notes: { type: String, required: false },
    birthDate: { type: Date, required: false },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    status: {
      type: String,
      enum: ["New", "Contacted", "Customer", "Lost", "Qualified"],
      required: true,
      default: "New",
    },
    source: {
      type: String,
      enum: [
        "Instagram",
        "Facebook",
        "Whatsapp",
        "Website",
        "Referral",
        "Other",
      ],
      required: true,
      default: "Website",
    },
    activeManager: { type: String, required: false, default: null },
  },
  { timestamps: true },
);

export const Client: Model<ClientType> =
  mongoose.models.Client || mongoose.model("Client", clientSchema);
