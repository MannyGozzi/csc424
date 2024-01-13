"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_js_1 = __importDefault(require("./user.js"));
// uncomment the following line to view mongoose debug messages
mongoose_1.default.set("debug", true);
mongoose_1.default
    .connect("mongodb://127.0.0.1:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .catch((error) => console.log(error));
function getUsers(name, job) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        if (name === undefined && job === undefined) {
            result = yield user_js_1.default.find();
        }
        else if (name && !job) {
            result = yield findUserByName(name);
        }
        else if (job && !name) {
            result = yield findUserByJob(job);
        }
        return result;
    });
}
function findUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield user_js_1.default.findById(id);
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    });
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userToAdd = new user_js_1.default(user);
            const savedUser = yield userToAdd.save();
            return savedUser;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    });
}
function findUserByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_js_1.default.find({ name: name });
    });
}
function findUserByJob(job) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_js_1.default.find({ job: job });
    });
}
exports.default = {
    addUser,
    getUsers,
    findUserById,
    findUserByName,
    findUserByJob,
};
