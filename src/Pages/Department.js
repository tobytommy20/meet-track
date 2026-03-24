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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../style/staff.css");
var react_1 = require("react");
var CreateDepartment_1 = require("./CreateDepartment");
var EditDepartmentModal_1 = require("../components/EditDepartmentModal");
var SearchInput_1 = require("../components/SearchInput");
var Pagination_1 = require("../components/Pagination");
var fi_1 = require("react-icons/fi");
var react_2 = require("react");
function Departments() {
    var _this = this;
    var _a = (0, react_1.useState)([]), departments = _a[0], setDepartments = _a[1];
    var _b = (0, react_1.useState)(false), showCreateDepartment = _b[0], setShowCreateDepartment = _b[1];
    var _c = (0, react_1.useState)(null), viewDepartment = _c[0], setViewDepartment = _c[1];
    var _d = (0, react_1.useState)(null), editDepartment = _d[0], setEditDepartment = _d[1];
    var _e = (0, react_1.useState)(""), search = _e[0], setSearch = _e[1];
    var _f = (0, react_1.useState)(1), page = _f[0], setPage = _f[1];
    var _g = (0, react_1.useState)(1), totalPages = _g[0], setTotalPages = _g[1];
    var _h = (0, react_1.useState)(null), openMenuId = _h[0], setOpenMenuId = _h[1];
    var menuRef = (0, react_2.useRef)(null);
    var pageSize = 8;
    (0, react_1.useEffect)(function () {
        var handleClickOutside = function (event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return function () {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    (0, react_1.useEffect)(function () {
        fetchDepartments(page, pageSize);
    }, [page, search]);
    var handleView = function (dept) {
        setViewDepartment(dept);
    };
    var handleEdit = function (dept) {
        setEditDepartment(dept);
    };
    var handleDelete = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm("Delete this department"))
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("http://207.180.246.69:7200/api/v1/staff/".concat(id), {
                            method: "DELETE",
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem("token"))
                            }
                        })];
                case 2:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("Delete failed");
                    setDepartments(function (prev) {
                        return prev.filter(function (d) { return d.id !== id; });
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var fetchDepartments = function (pageNumber, size) { return __awaiter(_this, void 0, void 0, function () {
        var res, data, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://207.180.246.69:7200/api/v1/departments?page=".concat(pageNumber, "&limit=").concat(size, "&search=").concat(search), {
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem("token")),
                            },
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (!res.ok)
                        throw new Error(data.message);
                    setDepartments(data.data || []);
                    setTotalPages(data.totalPages || 1);
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    console.error("Failed to load departments", err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="table-page">
      <div className="page-header">
        <h2>Departments</h2>

        <div className="table-filters">
          <SearchInput_1.default value={search} onChange={setSearch} placeholder="Search department"/>

          <button className="primary-btn" onClick={function () { return setShowCreateDepartment(true); }}>
            + Add
          </button>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Staff Count</th>
              <th>Meeting Count</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {departments.map(function (dept) { return (<tr key={dept.id}>
                <td className="name">{dept.name}</td>
                <td>{dept.staffCount}</td>
                <td>{dept.meetingCount}</td>
                <td className="date">
                  {new Date(dept.createdAt).toLocaleDateString()}
                </td>
                <td className="date">
                  {new Date(dept.updatedAt).toLocaleDateString()}
                </td>

                <td className="action-cell">
                  <button className="menu-btn" onClick={function (e) {
                e.stopPropagation();
                setOpenMenuId(openMenuId === dept.id ? null : dept.id);
            }}>
                    <fi_1.FiMoreVertical />
                  </button>

                  {openMenuId === dept.id && (<div className="action-menu" ref={menuRef}>
                      <button onClick={function () { return handleView(dept); }}>
                        <fi_1.FiEye className="menu-icon"/>
                        View
                      </button>

                      <button onClick={function () { return handleEdit(dept); }}>
                        <fi_1.FiEdit className="menu-icon"/>
                        Edit
                      </button>

                      <button className="delete-button" onClick={function () { return handleDelete(dept.id); }}>
                        <fi_1.FiTrash2 className="menu-icon delete"/>
                        Delete
                      </button>
                    </div>)}
                </td>
              </tr>); })}

            {departments.length === 0 && (<tr>
                <td colSpan={6}>No departments found</td>
              </tr>)}
          </tbody>
        </table>

            {viewDepartment && (<div className="modal-overlay">

    <div className="modal">

      <h3>Department Details</h3>

      <div className="modal-content">

        <p><strong>Name:</strong> {viewDepartment.name}</p>
        <p><strong>Staff Count:</strong> {viewDepartment.staffCount}</p>
        <p><strong>Meetings:</strong> {viewDepartment.meetingCount}</p>
        <p><strong>Created:</strong> {viewDepartment.createdAt}</p>

      </div>

      <div className="modal-actions">

        <button className="secondary-btn" onClick={function () { return setViewDepartment(null); }}>
          Close
        </button>

      </div>

    </div>

  </div>)}


    {editDepartment && (<EditDepartmentModal_1.default department={editDepartment} onClose={function () { return setEditDepartment(null); }} onUpdated={function (updatedDept) {
                setDepartments(function (prev) {
                    return prev.map(function (d) {
                        return d.id === updatedDept.id ? updatedDept : d;
                    });
                });
                setEditDepartment(null);
            }}/>)}

      

      </div>

      <Pagination_1.default page={page} totalPages={totalPages} setPage={setPage}/>
      {showCreateDepartment && (<CreateDepartment_1.default onClose={function () { return setShowCreateDepartment(false); }} onSuccess={function () { return fetchDepartments(page, pageSize); }}/>)}
    </div>);
}
exports.default = Departments;
