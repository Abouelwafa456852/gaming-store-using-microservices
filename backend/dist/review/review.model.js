"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = exports.ReviewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ReviewSchema = new mongoose_1.Schema({
    productId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.ReviewModel = (0, mongoose_1.model)('ReviewSchema', exports.ReviewSchema);
//# sourceMappingURL=review.model.js.map