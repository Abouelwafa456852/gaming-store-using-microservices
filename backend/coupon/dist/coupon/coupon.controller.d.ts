import { CouponService } from './coupon.service';
import { Coupon } from './coupon.model';
export declare class CouponController {
    private readonly couponService;
    constructor(couponService: CouponService);
    create(createCouponDto: Coupon): Promise<Coupon>;
    findAll(): Promise<Coupon[]>;
    findOne(id: string): Promise<Coupon>;
    update(id: string, updateCouponDto: Coupon): Promise<Coupon>;
    remove(id: string): Promise<any>;
}
