import "../style/staff.css";
import { useEffect, useState } from "react";
import CreateDepartment from "./CreateDepartment";
import EditDepartmentModal from "../components/EditDepartmentModal"
import SearchInput from "../components/SearchInput";
import Pagination from "../components/Pagination";
import { FiMoreVertical, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { useRef } from "react";


interface Department {
  id: number;
  name: string;
  staffCount: number;
  meetingCount: number;
  createdAt: string;
  updatedAt: string;
}

function Departments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showCreateDepartment, setShowCreateDepartment] = useState(false);
  const [viewDepartment, setViewDepartment] = useState<Department | null>(null)
  const [editDepartment, setEditDepartment] = useState<Department | null>(null)
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const pageSize = 8;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchDepartments(page, pageSize);
  }, [page, search]);



  const handleView = (dept: Department) => {
    setViewDepartment(dept)
  };

  const handleEdit = (dept:Departmnent) => {
    setEditDepartment(dept)
  }


  const handleDelete =async (id:number) => {
    if(!confirm("Delete this department")) return;
     
    try{

      const res = await fetch(
        `http://207.180.246.69:7200/api/v1/staff/${id}`,
        {
          method:"DELETE",
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }

        }
      )

      if(!res.ok) throw new Error("Delete failed");

      setDepartments(prev =>
        prev.filter(d => d.id !== id)
      );

    } catch(err){
      console.error(err)
    }
  
  };



  const fetchDepartments = async (pageNumber: number, size: number) => {
    try {
      const res = await fetch(
        `http://207.180.246.69:7200/api/v1/departments?page=${pageNumber}&limit=${size}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setDepartments(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Failed to load departments", err);
    }
  };

 

  return (
    <div className="table-page">
      <div className="page-header">
        <h2>Departments</h2>

        <div className="table-filters">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search department"
          />

          <button
            className="primary-btn"
            onClick={() => setShowCreateDepartment(true)}
          >
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
            {departments.map((dept) => (
              <tr key={dept.id}>
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
                  <button
                    className="menu-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === dept.id ? null : dept.id);
                    }}
                  >
                    <FiMoreVertical />
                  </button>

                  {openMenuId === dept.id && (
                    <div className="action-menu" ref={menuRef}>
                      <button onClick={() => handleView(dept)}>
                        <FiEye className="menu-icon" />
                        View
                      </button>

                      <button onClick={() => handleEdit(dept)}>
                        <FiEdit className="menu-icon" />
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => handleDelete(dept.id)}
                      >
                        <FiTrash2 className="menu-icon delete" />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {departments.length === 0 && (
              <tr>
                <td colSpan={6}>No departments found</td>
              </tr>
            )}
          </tbody>
        </table>

            {viewDepartment && (
  <div className="modal-overlay">

    <div className="modal">

      <h3>Department Details</h3>

      <div className="modal-content">

        <p><strong>Name:</strong> {viewDepartment.name}</p>
        <p><strong>Staff Count:</strong> {viewDepartment.staffCount}</p>
        <p><strong>Meetings:</strong> {viewDepartment.meetingCount}</p>
        <p><strong>Created:</strong> {viewDepartment.createdAt}</p>

      </div>

      <div className="modal-actions">

        <button
          className="secondary-btn"
          onClick={()=>setViewDepartment(null)}
        >
          Close
        </button>

      </div>

    </div>

  </div>
)}


    {editDepartment && (
  <EditDepartmentModal
    department={editDepartment}
    onClose={() => setEditDepartment(null)}
    onUpdated={(updatedDept:Department) => {

      setDepartments(prev =>
        prev.map(d =>
          d.id === updatedDept.id ? updatedDept : d
        )
      )

      setEditDepartment(null)

    }}
  />
)}

      

      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      {showCreateDepartment && (
        <CreateDepartment
          onClose={() => setShowCreateDepartment(false)}
          onSuccess={() => fetchDepartments(page, pageSize)}
        />
      )}
    </div>
  );
}

export default Departments;
