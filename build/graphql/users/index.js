"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const typedef_1 = require("./typedef");
const queries_1 = require("./queries");
const mutation_1 = require("./mutation");
const resolver_1 = require("./resolver");
exports.user = {
    typedef: typedef_1.typedef,
    queries: queries_1.queries,
    mutation: mutation_1.mutation,
    resolver: resolver_1.resolver
};
