import "../style/staff.css";
import { useEffect, useState } from "react";
import SelectDropdown from "../components/SelectDropdown";
import axios from "axios";
import { FiEdit, FiTrash2, FiEye, FiMoreVertical, FiUpload, FiDownload } from "react-icons/fi";
import { Search } from "lucide-react";
import {useRef} from "react"

interface Department {
  id: number;
  name: string;
}
interface Staff {
  id: number;
  email: string;
  name: string;
  departmentName: string;
  status: string;
  createdAt: string;
}

function Staff() {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [staffName, setStaffName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [uploading, setUploading] = useState(false)

  const [search, setSearch] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  const [page, setPage] = useState(1);
  const [pageSize] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const menuRef= useRef<HTMLDivElement| null>(null);


  useEffect(() => {
    fetchStaffs(page, pageSize);
  }, [page, debouncedSearch, filterDepartment, filterStatus]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 500);

  return() => clearTimeout(timer);
}, [search]);


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

  const fetchStaffs = async (pageNumber: number, size: number) => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://207.180.246.69:7200/api/v1/staff?page=${pageNumber}&limit=${size}&search=${debouncedSearch}&departmentId=${filterDepartment}&status=${filterStatus}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load staffs");

      setTotalPages(data.data.totalPages);
      setStaffs(data.data.data || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await fetch("http://207.180.246.69:7200/api/v1/departments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const response = await res.json();
      console.log("Departments API", response);

      setDepartments(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Failed to load departments", err);
      setDepartments([]);
    }
  };
  console.log("Departments state:", departments);

  const editStaff = async (id: number) => {
    try {
      await axios.put(
        `http://207.180.246.69:7200/api/v1/staff?id=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchStaffs(page, pageSize);
    } catch (err) {
      console.error("edit failed", err);
      alert("failed to edit staff");
    }
  };

  const handleDelete =async (id:number) => {
    if(!confirm("Delete this staff")) return;
     
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

  const handleCreateStaff = async () => {
    if (!staffName || !email || !department) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch("http://207.180.246.69:7200/api/v1/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: staffName,
          email: email,
          departmentId: Number(department),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create staff");

      setShowModal(false);
      setStaffName("");
      setEmail("");
      setDepartment("");

      fetchStaffs(page, pageSize);
    } catch (err: any) {
      alert(err.message || "Failed to create staff");
    }
  };



  const handleDownloadTemplate = async () => {
    try{
      const res = await fetch (
        "http://207.180.246.69:7200/api/v1/staff/upload-template",
        {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
      )

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = "staff_template.xlsx"
      a.click()

      window.URL.revokeObjectURL(url)

    } catch (err){
      console.error("Download failed", err)
    }
  }

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0]

    if(!file) return

    setUploading(true)

    try{
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch(
        "http://207.180.246.69:7200/api/v1/staff/bulk-upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData
        }
      )

      const data = await res.json()

      if(!res.ok){
        throw new Error(data.message || "Upload failed")
      }

      alert("Staff uploaded successfully")

      fetchStaffs(page, pageSize)

      e.target.value =null

    } catch(err){
      console.error(err)
      alert("Upload failed")
    } finally{
      setUploading(false)
    }

  }

  if (loading) return <p>Loading Staffs....</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="table-page">
      <div className="page-header">
        <h2 className="page-title">Staff Management</h2>

        <div className="table-filters">

          <div className="search-box">
            <Search size={16}/>
          <input
            type="text"
            className="search-input"
            placeholder="Search name or email"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
             </div>

          <SelectDropdown
            options={departments}
            value={filterDepartment}
            onChange={(val) => {
              setPage(1);
              setFilterDepartment(val);
            }}
            placeholder="Filter by department"
          />

          <select
            className="status-filter"
            value={filterStatus}
            onChange={(e) => {
              setPage(1);
              setFilterStatus(e.target.value);
            }}
          >
            <option value=""> All Status</option>
            <option value="active"> Active</option>
            <option value="inactive"> Inactive</option>
          </select>

          <button
          className="clear-btn"
            onClick={() => {
              setSearch("");
              setFilterDepartment("");
              setFilterStatus("");
            }}
          >
            Clear
          </button>
        </div>



        <div className="right-buttons">

           <button 
          className="upload-btn download-btn"
          onClick={handleDownloadTemplate}
          title="Download Template"
          >
             <FiDownload className="menu-icon" />
            </button>

            <label 
            title="Bulk Upload Staff"
          className={`upload-btn ${uploading ? "disabled" : ""}`}
          >
             <FiUpload className="menu-icon" />
             <input
             type="file"
             accept=".xlsx,.csv"
             hidden
             onChange={handleFileUpload}
             />
            </label>

          <button className="primary-btn" onClick={() => setShowModal(true)}>
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
            {staffs.map((staff) => (
              <tr key={staff.id}>
                <td className="name">{staff.name}</td>
                <td className="email">{staff.email}</td>
                <td className="dept">{staff.departmentName}</td>
                <td className="date">{staff.createdAt}</td>
                <td>
                  <span
                    className={
                      staff.status === "active"
                        ? "badge-active"
                        : "badge-inactive"
                    }
                  >
                    {staff.status}
                  </span>
                </td>

                <td className="action-cell">
                  <button
                    className="menu-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === staff.id ? null : staff.id);
                    }}
                  >
                    <FiMoreVertical />
                  </button>

                  {openMenuId === staff.id && (
                    <div className="action-menu" ref={menuRef}>
                      <button onClick={() => console.log("view", staff.id)}>
                        <FiEye className="menu-icon" />
                        View
                      </button>
                      <button onClick={() => editStaff(staff.id)}>
                        <FiEdit className="menu-icon" />
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(staff.id)}
                      >
                        <FiTrash2 className="menu-icon delete" />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {staffs.length === 0 && (
              <tr key="no data">
                <td colSpan={7}>No staff found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Add Staff</h3>

            <input
              type="text"
              placeholder="FullName"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <SelectDropdown
              options={departments}
              value={department}
              onChange={setDepartment}
              placeholder="Select Department"
            />

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="primary-btn" onClick={handleCreateStaff}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Staff;
