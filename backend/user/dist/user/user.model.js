"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'User'],
        default: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.UserModel = (0, mongoose_1.model)('UserSchema', exports.UserSchema);
//# sourceMappingURL=user.model.js.map