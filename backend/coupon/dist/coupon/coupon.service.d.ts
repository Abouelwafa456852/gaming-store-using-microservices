import { Model } from 'mongoose';
import { Coupon } from './coupon.model';
export declare class CouponService {
    private readonly couponModel;
    constructor(couponModel: Model<Coupon>);
    create(coupon: Coupon): Promise<Coupon>;
    findAll(): Promise<Coupon[]>;
    findOne(id: string): Promise<Coupon>;
    update(id: string, coupon: Coupon): Promise<Coupon>;
    delete(id: string): Promise<any>;
}
