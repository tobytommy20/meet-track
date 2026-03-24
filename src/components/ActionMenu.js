"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fi_1 = require("react-icons/fi");
function ActionMenu(_a) {
    var id = _a.id, openId = _a.openId, setOpenId = _a.setOpenId, onView = _a.onView, onEdit = _a.onEdit, onDelete = _a.onDelete;
    return (<div className="action-cell">
      <button className="menu-btn" onClick={function (e) {
            e.stopPropagation();
            setOpenId(openId === id ? null : id);
        }}>
        <fi_1.FiMoreVertical />
      </button>

      {openId === id && (<div className="action-menu">
          <button onClick={onView}>
            <fi_1.FiEye className="menu-icon"/>
            View
          </button>

          <button onClick={onEdit}>
            <fi_1.FiEdit className="menu-icon"/>
            Edit
          </button>

          <button className="delete-button" onClick={onDelete}>
            <fi_1.FiTrash2 className="menu-icon delete"/>
            Delete
          </button>
        </div>)}
    </div>);
}
exports.default = ActionMenu;
