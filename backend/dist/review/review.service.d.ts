import { Model } from 'mongoose';
import { Review } from './review.model';
export declare class ReviewService {
    private readonly reviewModel;
    constructor(reviewModel: Model<Review>);
    create(review: Review): Promise<Review>;
    findAll(): Promise<Review[]>;
    findOne(id: string): Promise<Review>;
    update(id: string, review: Review): Promise<Review>;
    delete(id: string): Promise<any>;
}
