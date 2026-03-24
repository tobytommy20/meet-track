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
var SelectDropdown_1 = require("../components/SelectDropdown");
var axios_1 = require("axios");
var fi_1 = require("react-icons/fi");
var lucide_react_1 = require("lucide-react");
var react_2 = require("react");
function Staff() {
    var _this = this;
    var _a = (0, react_1.useState)([]), staffs = _a[0], setStaffs = _a[1];
    var _b = (0, react_1.useState)([]), departments = _b[0], setDepartments = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(""), error = _d[0], setError = _d[1];
    var _e = (0, react_1.useState)(false), showModal = _e[0], setShowModal = _e[1];
    var _f = (0, react_1.useState)(""), staffName = _f[0], setStaffName = _f[1];
    var _g = (0, react_1.useState)(""), email = _g[0], setEmail = _g[1];
    var _h = (0, react_1.useState)(""), department = _h[0], setDepartment = _h[1];
    var _j = (0, react_1.useState)(null), openMenuId = _j[0], setOpenMenuId = _j[1];
    var _k = (0, react_1.useState)(false), uploading = _k[0], setUploading = _k[1];
    var _l = (0, react_1.useState)(""), search = _l[0], setSearch = _l[1];
    var _m = (0, react_1.useState)(""), filterDepartment = _m[0], setFilterDepartment = _m[1];
    var _o = (0, react_1.useState)(""), filterStatus = _o[0], setFilterStatus = _o[1];
    var _p = (0, react_1.useState)(search), debouncedSearch = _p[0], setDebouncedSearch = _p[1];
    var _q = (0, react_1.useState)(1), page = _q[0], setPage = _q[1];
    var pageSize = (0, react_1.useState)(9)[0];
    var _r = (0, react_1.useState)(1), totalPages = _r[0], setTotalPages = _r[1];
    var menuRef = (0, react_2.useRef)(null);
    (0, react_1.useEffect)(function () {
        fetchStaffs(page, pageSize);
    }, [page, debouncedSearch, filterDepartment, filterStatus]);
    (0, react_1.useEffect)(function () {
        fetchDepartments();
    }, []);
    (0, react_1.useEffect)(function () {
        var timer = setTimeout(function () {
            setDebouncedSearch(search);
        }, 500);
        return function () { return clearTimeout(timer); };
    }, [search]);
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
    var fetchStaffs = function (pageNumber, size) { return __awaiter(_this, void 0, void 0, function () {
        var res, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    setLoading(true);
                    return [4 /*yield*/, fetch("http://207.180.246.69:7200/api/v1/staff?page=".concat(pageNumber, "&limit=").concat(size, "&search=").concat(debouncedSearch, "&departmentId=").concat(filterDepartment, "&status=").concat(filterStatus), {
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
                        throw new Error(data.message || "Failed to load staffs");
                    setTotalPages(data.data.totalPages);
                    setStaffs(data.data.data || []);
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    setError(err_1.message || "Something went wrong");
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var fetchDepartments = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, response, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://207.180.246.69:7200/api/v1/departments", {
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem("token")),
                            },
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    response = _a.sent();
                    console.log("Departments API", response);
                    setDepartments(Array.isArray(response.data) ? response.data : []);
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    console.error("Failed to load departments", err_2);
                    setDepartments([]);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    console.log("Departments state:", departments);
    var editStaff = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.put("http://207.180.246.69:7200/api/v1/staff?id=".concat(id), {}, {
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem("token")),
                            },
                        })];
                case 1:
                    _a.sent();
                    fetchStaffs(page, pageSize);
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    console.error("edit failed", err_3);
                    alert("failed to edit staff");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var res, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm("Delete this staff"))
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
                    err_4 = _a.sent();
                    console.error(err_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleCreateStaff = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!staffName || !email || !department) {
                        alert("Fill all fields");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("http://207.180.246.69:7200/api/v1/staff", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(localStorage.getItem("token")),
                            },
                            body: JSON.stringify({
                                name: staffName,
                                email: email,
                                departmentId: Number(department),
                            }),
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    if (!res.ok)
                        throw new Error(data.message || "Failed to create staff");
                    setShowModal(false);
                    setStaffName("");
                    setEmail("");
                    setDepartment("");
                    fetchStaffs(page, pageSize);
                    return [3 /*break*/, 5];
                case 4:
                    err_5 = _a.sent();
                    alert(err_5.message || "Failed to create staff");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleDownloadTemplate = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, blob, url, a, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://207.180.246.69:7200/api/v1/staff/upload-template", {
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem("token")),
                            }
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.blob()];
                case 2:
                    blob = _a.sent();
                    url = window.URL.createObjectURL(blob);
                    a = document.createElement("a");
                    a.href = url;
                    a.download = "staff_template.xlsx";
                    a.click();
                    window.URL.revokeObjectURL(url);
                    return [3 /*break*/, 4];
                case 3:
                    err_6 = _a.sent();
                    console.error("Download failed", err_6);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleFileUpload = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var file, formData, res, data, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    file = e.target.files[0];
                    if (!file)
                        return [2 /*return*/];
                    setUploading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    formData = new FormData();
                    formData.append("file", file);
                    return [4 /*yield*/, fetch("http://207.180.246.69:7200/api/v1/staff/bulk-upload", {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem("token")),
                            },
                            body: formData
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    if (!res.ok) {
                        throw new Error(data.message || "Upload failed");
                    }
                    alert("Staff uploaded successfully");
                    fetchStaffs(page, pageSize);
                    e.target.value = null;
                    return [3 /*break*/, 6];
                case 4:
                    err_7 = _a.sent();
                    console.error(err_7);
                    alert("Upload failed");
                    return [3 /*break*/, 6];
                case 5:
                    setUploading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    if (loading)
        return <p>Loading Staffs....</p>;
    if (error)
        return <p>{error}</p>;
    return (<div className="table-page">
      <div className="page-header">
        <h2 className="page-title">Staff Management</h2>

        <div className="table-filters">

          <div className="search-box">
            <lucide_react_1.Search size={16}/>
          <input type="text" className="search-input" placeholder="Search name or email" value={search} onChange={function (e) {
            setPage(1);
            setSearch(e.target.value);
        }}/>
             </div>

          <SelectDropdown_1.default options={departments} value={filterDepartment} onChange={function (val) {
            setPage(1);
            setFilterDepartment(val);
        }} placeholder="Filter by department"/>

          <select className="status-filter" value={filterStatus} onChange={function (e) {
            setPage(1);
            setFilterStatus(e.target.value);
        }}>
            <option value=""> All Status</option>
            <option value="active"> Active</option>
            <option value="inactive"> Inactive</option>
          </select>

          <button className="clear-btn" onClick={function () {
            setSearch("");
            setFilterDepartment("");
            setFilterStatus("");
        }}>
            Clear
          </button>
        </div>



        <div className="right-buttons">

           <button className="upload-btn download-btn" onClick={handleDownloadTemplate} title="Download Template">
             <fi_1.FiDownload className="menu-icon"/>
            </button>

            <label title="Bulk Upload Staff" className={"upload-btn ".concat(uploading ? "disabled" : "")}>
             <fi_1.FiUpload className="menu-icon"/>
             <input type="file" accept=".xlsx,.csv" hidden onChange={handleFileUpload}/>
            </label>

          <button className="primary-btn" onClick={function () { return setShowModal(true); }}>
            + Add Staff
          </button>
        </div>
      </div>

      <div className="table-card">
        <table className="table-card">
          <thead>
            <tr>
              <th>Name</th>
              <th>User Email</th>
              <th>Department</th>
              <th>Date Created</th>
              <th>Status-badge</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {staffs.map(function (staff) { return (<tr key={staff.id}>
                <td className="name">{staff.name}</td>
                <td className="email">{staff.email}</td>
                <td className="dept">{staff.departmentName}</td>
                <td className="date">{staff.createdAt}</td>
                <td>
                  <span className={staff.status === "active"
                ? "badge-active"
                : "badge-inactive"}>
                    {staff.status}
                  </span>
                </td>

                <td className="action-cell">
                  <button className="menu-btn" onClick={function (e) {
                e.stopPropagation();
                setOpenMenuId(openMenuId === staff.id ? null : staff.id);
            }}>
                    <fi_1.FiMoreVertical />
                  </button>

                  {openMenuId === staff.id && (<div className="action-menu" ref={menuRef}>
                      <button onClick={function () { return console.log("view", staff.id); }}>
                        <fi_1.FiEye className="menu-icon"/>
                        View
                      </button>
                      <button onClick={function () { return editStaff(staff.id); }}>
                        <fi_1.FiEdit className="menu-icon"/>
                        Edit
                      </button>
                      <button className="delete-button" onClick={function () { return handleDelete(staff.id); }}>
                        <fi_1.FiTrash2 className="menu-icon delete"/>
                        Delete
                      </button>
                    </div>)}
                </td>
              </tr>); })}
            {staffs.length === 0 && (<tr key="no data">
                <td colSpan={7}>No staff found</td>
              </tr>)}
          </tbody>
        </table>
      </div>

      {showModal && (<div className="modal-overlay">
          <div className="modal-card">
            <h3>Add Staff</h3>

            <input type="text" placeholder="FullName" value={staffName} onChange={function (e) { return setStaffName(e.target.value); }}/>

            <input placeholder="Email" value={email} onChange={function (e) { return setEmail(e.target.value); }}/>

            <SelectDropdown_1.default options={departments} value={department} onChange={setDepartment} placeholder="Select Department"/>

            <div className="modal-actions">
              <button onClick={function () { return setShowModal(false); }}>Cancel</button>
              <button className="primary-btn" onClick={handleCreateStaff}>
                Add
              </button>
            </div>
          </div>
        </div>)}

      <div className="pagination">
        <button disabled={page === 1} onClick={function () { return setPage(function (p) { return p - 1; }); }}>
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button disabled={page === totalPages} onClick={function () { return setPage(function (p) { return p + 1; }); }}>
          Next
        </button>
      </div>
    </div>);
}
exports.default = Staff;
