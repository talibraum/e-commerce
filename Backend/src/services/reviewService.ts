import { getRepository } from 'typeorm';
import { Review } from '../models/reviewEntity';

const getReviews = async (): Promise<Review[]> => {
    const reviewRepository = getRepository(Review);
    return reviewRepository.find();
};

const addReview = async (review: Review): Promise<Review> => {
    const reviewRepository = getRepository(Review);
    return reviewRepository.save(review);
};

const getReviewById = async (id: number): Promise<Review | undefined> => {
    const reviewRepository = getRepository(Review);
    return reviewRepository.findOne({where: {
        id: id,
      },});
};

const deleteReviewById = async (id: number): Promise<Review | undefined> => {
    const review = await getReviewById(id);
    if (review) {
        const reviewRepository = getRepository(Review);
        await reviewRepository.remove(review);
    }
    return review;
};



export { getReviews, addReview, getReviewById, deleteReviewById };
