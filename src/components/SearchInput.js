"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lucide_react_1 = require("lucide-react");
function SearchInput(_a) {
    var value = _a.value, onChange = _a.onChange, placeholder = _a.placeholder;
    return (<div className="search-wrapper">
      <lucide_react_1.Search className="search-icon" size={18}/>

      <input type="text" className="search-input" placeholder={placeholder || "Search"} value={value} onChange={function (e) { return onChange(e.target.value); }}/>
    </div>);
}
exports.default = SearchInput;
