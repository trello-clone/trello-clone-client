"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
var axios_1 = __importDefault(require("axios"));
var _a = process.env, API_BASE_URL = _a.API_BASE_URL, API_KEY = _a.API_KEY;
exports.API = {
    get: function (endpoint) { return axios_1.default({
        method: 'GET',
        url: "" + API_BASE_URL + endpoint,
        headers: {
            'x-apikey': API_KEY
        },
    }); },
    post: function (endpoint, payload) { return axios_1.default({
        method: 'POST',
        url: "" + API_BASE_URL + endpoint,
        headers: {
            'x-apikey': API_KEY
        },
        data: payload,
    }); }
};
