import Review from "../models/Review.js"
import Booking from "../models/Booking.js"
import Car from "../models/Car.js"

// API to Create Review (after booking completion)
export const createReview = async (req, res) => {
    try {
        const { _id } = req.user;
        const { bookingId, rating, reviewText } = req.body;

        // Validate input
        if (!bookingId || !rating || !reviewText) {
            return res.json({ success: false, message: 'All fields are required' });
        }

        if (rating < 1 || rating > 5) {
            return res.json({ success: false, message: 'Rating must be between 1 and 5' });
        }

        if (reviewText.length < 10 || reviewText.length > 500) {
            return res.json({ success: false, message: 'Review must be between 10 and 500 characters' });
        }

        // Check if booking exists and belongs to user
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.json({ success: false, message: 'Booking not found' });
        }

        if (booking.user.toString() !== _id.toString()) {
            return res.json({ success: false, message: 'Unauthorized' });
        }

        if (booking.status !== 'completed') {
            return res.json({ success: false, message: 'Can only review completed bookings' });
        }

        // Check if review already exists for this booking
        const existingReview = await Review.findOne({ booking: bookingId });
        if (existingReview) {
            return res.json({ success: false, message: 'Review already exists for this booking' });
        }

        // Create review
        const review = await Review.create({
            booking: bookingId,
            car: booking.car,
            user: _id,
            rating,
            reviewText
        });

        res.json({ success: true, message: 'Review submitted successfully', review });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// API to Get Reviews for a Car
export const getCarReviews = async (req, res) => {
    try {
        const { carId } = req.params;

        const reviews = await Review.find({ car: carId })
            .populate('user', 'name image')
            .populate('booking', 'pickupDate returnDate')
            .sort({ createdAt: -1 });

        // Calculate average rating
        const totalReviews = reviews.length;
        const avgRating = totalReviews > 0 
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
            : 0;

        res.json({ 
            success: true, 
            reviews,
            avgRating: Math.round(avgRating * 10) / 10, // Round to 1 decimal
            totalReviews
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// API to Get User's Reviews
export const getUserReviews = async (req, res) => {
    try {
        const { _id } = req.user;

        const reviews = await Review.find({ user: _id })
            .populate('car', 'brand model image')
            .populate('booking', 'pickupDate returnDate')
            .sort({ createdAt: -1 });

        res.json({ success: true, reviews });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// API to Check if user can review a booking
export const canReviewBooking = async (req, res) => {
    try {
        const { _id } = req.user;
        const { bookingId } = req.params;

        const booking = await Booking.findById(bookingId);
        if (!booking || booking.user.toString() !== _id.toString()) {
            return res.json({ success: false, message: 'Booking not found or unauthorized' });
        }

        if (booking.status !== 'completed') {
            return res.json({ success: false, canReview: false, message: 'Booking not completed yet' });
        }

        const existingReview = await Review.findOne({ booking: bookingId });
        if (existingReview) {
            return res.json({ success: true, canReview: false, message: 'Already reviewed', existingReview });
        }

        res.json({ success: true, canReview: true, booking });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// API to Update Review
export const updateReview = async (req, res) => {
    try {
        const { _id } = req.user;
        const { reviewId } = req.params;
        const { rating, reviewText } = req.body;

        const review = await Review.findById(reviewId);
        if (!review || review.user.toString() !== _id.toString()) {
            return res.json({ success: false, message: 'Review not found or unauthorized' });
        }

        if (rating) review.rating = rating;
        if (reviewText) review.reviewText = reviewText;

        await review.save();

        res.json({ success: true, message: 'Review updated successfully', review });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// API to Delete Review
export const deleteReview = async (req, res) => {
    try {
        const { _id } = req.user;
        const { reviewId } = req.params;

        const review = await Review.findById(reviewId);
        if (!review || review.user.toString() !== _id.toString()) {
            return res.json({ success: false, message: 'Review not found or unauthorized' });
        }

        await Review.findByIdAndDelete(reviewId);

        res.json({ success: true, message: 'Review deleted successfully' });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
