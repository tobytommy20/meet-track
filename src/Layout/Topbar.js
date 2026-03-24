"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../style/dashboard.css");
var logo_png_1 = require("../style/logo.png");
function Topbar() {
    return (<div className="topbar">
        <div className="logo">
          <img src={logo_png_1.default} alt=""/>
        </div>
        <span> HR Admin</span>
      </div>);
}
exports.default = Topbar;
