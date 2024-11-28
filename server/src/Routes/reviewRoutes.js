import express from 'express';
import { addReview,editReview,getGameReviews,getLatestReviews,getAllGameReviews,getMyReviews } from '../Controllers/reviewController.js';
import upload from '../middleware/uploadMiddleware.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/addReview', isAuthenticated, upload.single('audio'), addReview);
router.put("/edit-review", isAuthenticated, upload.single("audio"), editReview);


router.get("/gameReview/:id", getGameReviews);
router.get("/latestReviews", getLatestReviews);


router.get("/allGameReviews/:id", getAllGameReviews);
router.get("/myReviews", getMyReviews);


export default router;