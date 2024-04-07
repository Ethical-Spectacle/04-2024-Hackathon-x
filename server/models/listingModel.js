const mongoose = require("mongoose");

const wasteEntrySchema = new mongoose.Schema({
    companyID: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    meatType: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const WasteEntry = mongoose.model("WasteEntry", wasteEntrySchema);

module.exports = WasteEntry;
