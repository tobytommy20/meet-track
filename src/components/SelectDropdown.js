"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function SelectDropdown(_a) {
    var _b = _a.options, options = _b === void 0 ? [] : _b, value = _a.value, onChange = _a.onChange, placeholder = _a.placeholder;
    var safeOptions = Array.isArray(options) ? options : [];
    return (<select className="select-dropdown" value={value} onChange={function (e) { return onChange(e.target.value); }}>
      <option value="">{placeholder}</option>

      {safeOptions.map(function (opt) { return (<option key={opt.id} value={opt.id}>
          {opt.name}
        </option>); })}
    </select>);
}
exports.default = SelectDropdown;
