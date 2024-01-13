"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    job: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 2)
                throw new Error("Invalid job, must be at least 2 characters.");
        },
    },
}, { collection: "users_list" });
exports.UserSchema = UserSchema;
exports.default = mongoose_1.default.model("User", UserSchema);
