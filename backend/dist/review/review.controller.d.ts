import { ReviewService } from './review.service';
import { Review } from './review.model';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    create(createReviewDto: Review): Promise<Review>;
    findAll(): Promise<Review[]>;
    findOne(id: string): Promise<Review>;
    update(id: string, updateReviewDto: Review): Promise<Review>;
    remove(id: string): Promise<any>;
}
