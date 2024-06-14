import { Request, Response } from 'express';
import { Review } from '../models/reviewEntity';
import {
    getReviews,
    addReview,
    getReviewById,
    deleteReviewById,
} from '../services/reviewService';
import Logger from '../lib/logger';

const getReviewsHandler = async (req: Request, res: Response) => {
    try {
        const reviews = await getReviews();
        res.status(200).json(reviews);
        Logger.info(`${reviews.length} reviews were found`);
    } catch (error) {
        res.status(500).json({ error: error.message });
        Logger.error(`${error}: ${error.message}`);
    }
};

const addReviewHandler = async (req: Request, res: Response) => {
    try {
        const addedReview = await addReview(req.body);
        res.status(201).json(addedReview);
        Logger.info(`Review was added`);
    } catch (error) {
        res.status(500).json({ error: error.message });
        Logger.error(`${error}: ${error.message}`);
    }
};

const getReviewByIdHandler = async (req: Request, res: Response) => {
    try {
        const review = await getReviewById(Number(req.params.id));
        if (review) {
            res.status(200).json(review);
            Logger.info(`Review with ID ${Number(req.params.id)} was found`);
        } else {
            res.status(404).json({ message: `Review with ID ${Number(req.params.id)} not found` });
            Logger.info(`Review with ID ${Number(req.params.id)} not found`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        Logger.error(`${error}: ${error.message}`);
    }
};

const deleteReviewByIdHandler = async (req: Request, res: Response) => {
    try{
        const deletedReview = await deleteReviewById(Number(req.params.id));
        if (deletedReview) {
            res.status(200).json({ message: `Review with ID ${Number(req.params.id)} was deleted` });
            Logger.info(`Review with ID ${Number(req.params.id)} was deleted`);
        } else {
            res.status(404).json({ message: `Review with ID ${Number(req.params.id)} not found` });
            Logger.info(`Review with ID ${Number(req.params.id)} not found`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        Logger.error(`${error}: ${error.message}`);
    }
};



export {
    getReviewsHandler,
    addReviewHandler,
    getReviewByIdHandler,
    deleteReviewByIdHandler,
};
