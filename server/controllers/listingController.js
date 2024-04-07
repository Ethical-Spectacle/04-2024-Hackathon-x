const WasteEntry = require("../models/listingModel");
const bcrypt = require("bcrypt");

module.exports.addWasteEntry = async (req, res, next) => {
    try {
        const { companyID, meatType, type, amount, quantity } = req.body;
        const wasteEntry = new WasteEntry({
            companyID,
            type,
            meatType,
            amount,
            quantity,
        });
        await wasteEntry.save();
        res.status(201).json({
            message: "Waste entry added successfully",
            wasteEntry,
        });
    } catch (error) {
        console.error("Error adding waste entry:", error);
        res.status(500).json({ error: "Error adding waste entry" });
    }
};

module.exports.deleteWasteEntry = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedEntry = await WasteEntry.findByIdAndDelete(id);
        if (!deletedEntry) {
            return res.status(404).json({ error: "Waste entry not found" });
        }
        res.status(200).json({ message: "Waste entry deleted successfully" });
    } catch (error) {
        console.error("Error deleting waste entry:", error);
        res.status(500).json({ error: "Error deleting waste entry" });
    }
};

module.exports.getAllWasteEntries = async (req, res, next) => {
    try {
        const { companyID } = req.query;
        if (!companyID) {
            return res.status(400).json({ error: "Company ID is required" });
        }
        const wasteEntries = await WasteEntry.find({ companyID });
        res.status(200).json(wasteEntries);
    } catch (error) {
        console.error("Error fetching waste entries:", error);
        res.status(500).json({ error: "Error fetching waste entries" });
    }
};
