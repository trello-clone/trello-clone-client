"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var api_1 = require("./api");
exports.resolvers = {
    Query: {
        users: function (parent, args) { return api_1.API.get("/tc-user" + (args.max ? "?max=" + args.max : '')).then(function (res) { return res.data; }); },
        user: function (parent, args) { return api_1.API.get("/tc-user/" + args.id).then(function (res) { return res.data; }); }
    },
};
