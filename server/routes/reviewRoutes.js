import express from "express";
import { 
    createReview, 
    getCarReviews, 
    getUserReviews, 
    canReviewBooking,
    updateReview,
    deleteReview 
} from "../controllers/reviewController.js";
import { protect } from "../middleware/auth.js";

const reviewRouter = express.Router();

reviewRouter.post('/create', protect, createReview)
reviewRouter.get('/car/:carId', getCarReviews)
reviewRouter.get('/user', protect, getUserReviews)
reviewRouter.get('/can-review/:bookingId', protect, canReviewBooking)
reviewRouter.put('/update/:reviewId', protect, updateReview)
reviewRouter.delete('/delete/:reviewId', protect, deleteReview)

export default reviewRouter;
