const {
    addWasteEntry,
    deleteWasteEntry,
    getAllWasteEntries,
    // updateWasteEntry
} = require("../controllers/listingController");

const router = require("express").Router();

router.post("/add", addWasteEntry);
router.delete("/:id", deleteWasteEntry);
router.get("/getAll", getAllWasteEntries);
// router.get("/update", updateWasteEntry);

module.exports = router;
