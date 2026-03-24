"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var PrivateRoute = function (_a) {
    var children = _a.children;
    var token = localStorage.getItem("token");
    return token ? children : <react_router_dom_1.Navigate to="/login" replace/>;
};
exports.default = PrivateRoute;
