const Router = require("express");
import {
    getReviewsHandler,
    addReviewHandler,
    getReviewByIdHandler,
    deleteReviewByIdHandler,
} from '../controllers/reviewController';

const router = Router();

router.get('/', getReviewsHandler);

router.post('/', addReviewHandler);

router.get('/:id', getReviewByIdHandler);

router.delete('/:id', deleteReviewByIdHandler);

module.exports = router;
