// models/Package.js
const mongoose = require('mongoose');
const PackageSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  number: { type: Number, required: true },
  description: { type: String, required: true },
  day: { type: String, required: true },
  dayNumber: { type: Number, required: true },
  expirationStatus: { type: String, required: true },
  clientName: { type: String, required: true }, 
  
});
module.exports = mongoose.model('Package', PackageSchema);