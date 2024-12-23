"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponModel = exports.CouponSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CouponSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
});
exports.CouponModel = (0, mongoose_1.model)('CouponSchema', exports.CouponSchema);
//# sourceMappingURL=coupon.model.js.map