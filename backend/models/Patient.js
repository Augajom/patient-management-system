const mongoose = require('mongoose');

const TreatmentSchema = new mongoose.Schema({
  name: String,
  amount: String,
  time: String,
});

const AdviceSchema = new mongoose.Schema({
  medUsage: String,
  diet: String,
});

const FollowUpSchema = new mongoose.Schema({
  status: String,
  date: Date,
  phone: String,
});

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  address: String,
  weight: Number,
  height: Number,
  temperature: Number,
  bp: String,
  p: Number,
  r: Number,
  chiefComplaint: String,
  currentIllness: String,
  pastIllness: String,
  allergies: String,
  regularMeds: String,
  physicalExam: String,
  diffSymptoms: String,
  diffDiseases: String,
  initialDiagnosis: [String],
  treatments: [TreatmentSchema],
  advice: AdviceSchema,
  followUp: FollowUpSchema,
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);
