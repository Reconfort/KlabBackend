import express  from "express";
import fileUpload from "../helper/multer";
const router = express.Router();
import {
    createPartner,
    getAllPartners,
    getPartnerById,
    updatePartnerById,
    deletePartnerById
} from "../controllers/patnerController";


// Get all Partners
router.get('/partners', getAllPartners);

// Get partner by id
router.get('/partner/:id', getPartnerById);

// Create new partner
router.post('/partner', fileUpload.single("profile"), createPartner);

// Update partner by id
router.put('/partner/:id', fileUpload.single("profile"), updatePartnerById);

// Delete partner by id
router.delete('/partner/:id', deletePartnerById);


export default router;