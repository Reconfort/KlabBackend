import express from 'express';
import { registerParent, addChild } from '../controllers/parentController';
import StudentMiddleware from '../middleware/StudentMiddleware';
// import auth from '../middleware/auth';

const router = express.Router();

// Register a new parent
router.post('/register', StudentMiddleware,(req,res)=>{

    console.log(req.loggedParent);
    return  res.status(201).json({
        status:"success",
        message:"Student added success"
    })
});

// Add child for parent
router.post('/child', addChild);

export default router;