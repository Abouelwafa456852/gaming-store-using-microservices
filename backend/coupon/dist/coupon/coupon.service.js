"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let CouponService = class CouponService {
    constructor(couponModel) {
        this.couponModel = couponModel;
    }
    async create(coupon) {
        const newCoupon = new this.couponModel(coupon);
        return await newCoupon.save();
    }
    async findAll() {
        return await this.couponModel.find().exec();
    }
    async findOne(id) {
        return await this.couponModel.findById(id).exec();
    }
    async update(id, coupon) {
        return await this.couponModel.findByIdAndUpdate(id, coupon, { new: true }).exec();
    }
    async delete(id) {
        return await this.couponModel.deleteOne({ _id: id }).exec();
    }
};
exports.CouponService = CouponService;
exports.CouponService = CouponService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CouponModel')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CouponService);
//# sourceMappingURL=coupon.service.js.map