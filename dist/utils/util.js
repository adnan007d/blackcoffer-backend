"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilter = void 0;
function getFilter(filter) {
    Object.keys(filter).forEach((key) => {
        if (Array.isArray(filter[key])) {
            filter[key] = { $in: filter[key] };
        }
        else if (filter[key]) {
            filter[key] = { $in: [filter[key]] };
        }
        else {
            delete filter[key];
        }
    });
    return filter;
}
exports.getFilter = getFilter;
