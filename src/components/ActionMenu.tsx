import { FiMoreVertical, FiEdit, FiTrash2, FiEye } from "react-icons/fi";

interface Props {
  id: number;
  openId: number | null;
  setOpenId: (id: number | null) => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function ActionMenu({
  id,
  openId,
  setOpenId,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="action-cell">
      <button
        className="menu-btn"
        onClick={(e) => {
          e.stopPropagation();
          setOpenId(openId === id ? null : id);
        }}
      >
        <FiMoreVertical />
      </button>

      {openId === id && (
        <div className="action-menu">
          <button onClick={onView}>
            <FiEye className="menu-icon" />
            View
          </button>

          <button onClick={onEdit}>
            <FiEdit className="menu-icon" />
            Edit
          </button>

          <button className="delete-button" onClick={onDelete}>
            <FiTrash2 className="menu-icon delete" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ActionMenu;
