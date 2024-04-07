const {
    addWasteEntry,
    deleteWasteEntry,
    getAllWasteEntries,
} = require("../controllers/listingController");

const router = require("express").Router();

router.post("/add", addWasteEntry);
router.delete("/:id", deleteWasteEntry);
router.get("/getAll", getAllWasteEntries);

module.exports = router;
