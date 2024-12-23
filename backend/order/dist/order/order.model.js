"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.OrderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.OrderSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    productIds: {
        type: [String],
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Completed', 'Cancelled'],
    },
});
exports.OrderModel = (0, mongoose_1.model)('OrderSchema', exports.OrderSchema);
//# sourceMappingURL=order.model.js.map