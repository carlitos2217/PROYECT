// packageController.js

const Package = require('../models/Package');
const { validationResult } = require('express-validator');

exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.find(); // Obtiene todos los paquetes de la base de datos
    res.status(200).json(packages);// Responde con un estado 200 y la lista de paquetes
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPackage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { date, name, status, number, description, day, dayNumber, expirationStatus, clientName } = req.body;
  const profileImage = req.file ? req.file.path : '';

  try {
    // Verificar si el número de paquete ya existe
    const existingPackage = await Package.findOne({ number });
    if (existingPackage) {
      return res.status(400).json({ message: 'Ya existe un paquete con este número' });
    }

    const newPackage = new Package({
      date,
      name,
      status,
      number,
      description,
      day,
      dayNumber,
      expirationStatus,
      clientName,
      profileImage,
    });
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePackage = async (req, res) => {
  const { id } = req.params;
  const { date, name, status, number, description, day, dayNumber, expirationStatus, clientName } = req.body;
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { date, name, status, number, description, day, dayNumber, expirationStatus, clientName },
      { new: true }
    );
    if (!updatedPackage) return res.status(404).json({ message: 'Package not found' });
    res.status(200).json(updatedPackage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePackage = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPackage = await Package.findByIdAndDelete(id);  // Intenta eliminar el paquete por ID
    if (!deletedPackage) return res.status(404).json({ message: 'Package not found' });
    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
