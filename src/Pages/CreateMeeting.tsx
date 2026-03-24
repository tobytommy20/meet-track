import "../style/form.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Department {
  id: number;
  name: string;   
}

interface staff{
  id: string;
  name:string;
}

function CreateMeeting() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("");

  const [title, setTitle] = useState("");
  const [audienceType, setAudienceType] = useState("");

  const [startDatetime, setStartDatetime] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(60);

  const [location, setLocation] = useState("");

  const [departmentIds, setDepartmentIds] = useState<number[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [staff, setStaff] = useState<staff[]>([]);
  const [virtualStaffIds, setVirtualStaffIds] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
  const fetchStaff = async () => {
    try {
      const res = await fetch(
        "http://207.180.246.69:7200/api/v1/staff",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )

      const data = await res.json()
      console.log("STAFF RESPONSE:", data);

      const list = data?.data?.data || data?.data?.items || data?.data || [];

      setStaff(Array.isArray(list) ? list : [])

    } catch (err) {
      console.error("Failed to load staff", err)
    }
  }

  fetchStaff()
}, [])


  useEffect(() => {
    const fetchDepartments = async () => {
      try { 
        const res = await fetch(
          "http://207.180.246.69:7200/api/v1/departments",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json()
        console.log(data)

        const list = data.data || [];

        setDepartments(list);
      } catch (err) {
        console.error("Failed to load departments", err);
      }
    };

    fetchDepartments();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if(loading) return

    setLoading(true)

    try {
      const res = await fetch("http://207.180.246.69:7200/api/v1/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          mode,
          audienceType,
          startDatetime,
          durationMinutes,
          location,
          departmentIds,
          virtualStaffIds
        }),
      });


      const data = await res.json()
      console.log(data)

      if (!res.ok){
        const errorData = await res.json();
        console.log("Audience Type Sent:", audienceType);

        console.log("SERVER ERROR:", errorData);
        throw new Error(errorData.message || "Failed");
      }

      setShowSuccessModal(true)

    } catch (err) {
      console.error(err);
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="form-page">
      <div className="form-header">
        <button
          className="back-btn"
          onClick={() => navigate("/admin/meetings")}
        >
          <span className="back">← </span>Back
        </button>

        <h2>Create Meeting</h2>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Choose Meeting Type *</label>

            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              required
            >
              <option value="">Select Meeting Type</option>
              <option value="physical">Physical</option>
              <option value="virtual">Virtual</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {mode && (
            <>
              <div className="form-section">
                <h3 className="section-title">Meeting Information</h3>

                <div className="form-grid">
                  <div>
                    <label>Meeting Title *</label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Audience</h3>
                <div className="form-grid">
                  <div>
                    <label>Audience Type *</label>
                    <select
                      value={audienceType}
                      onChange={(e) => setAudienceType(e.target.value)}
                      required
                    >
                      <option value=""> Select audience</option>
                      <option value="all_staff"> All Staff</option>
                      <option value="departments"> Departments</option>
                    </select>
                  </div>
                </div>

                {audienceType === "departments" && (
                  <div className="form-group">
                    <label>Select Department(s)</label>

                    <div className="department-chips">
                      {departments.map((dept) => {
                        const selected = departmentIds.includes(dept.id);

                        return (
                          <div
                            key={dept.id}
                            className={`chip ${
                              selected ? "chip-selected" : ""
                            }`}
                            onClick={() => {
                              if (selected) {
                                setDepartmentIds(
                                  departmentIds.filter((id) => id !== dept.id)
                                );
                              } else {
                                setDepartmentIds([...departmentIds, dept.id]);
                              }
                            }}
                          >
                            {dept.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="form-section">
                <h3 className="section-title">Scheduling</h3>

                <div className="form-grid">
                  <div>
                    <label>Start Time *</label>
                    <input
                      type="datetime-local"
                      value={startDatetime}
                      onChange={(e) => setStartDatetime(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label>Duration (minutes)</label>
                    <input
                      type="number"
                      value={durationMinutes}
                      onChange={(e) =>
                        setDurationMinutes(Number(e.target.value))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
               <h3 className="section-title">Meeting Access</h3>

                <div className="form-grid">
                  {(mode === "physical" || mode === "hybrid") && (
                    <div>

                      <label>Location *</label>
                      <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  </div>

                  {(mode === "virtual" || mode === "hybrid") && (
                    <div className="form-group">
                      <label>Select Virtual Staff</label>

                      <div className="department-chips">
                        {staff.map((person) => {

                          const selected = virtualStaffIds.includes(person.id)

                          return (
                            <div
                              key={person.id}
                              className={`chip ${selected ? "chip-selected" : ""}`}
                              onClick={() => {

                                if (selected) {
                                  setVirtualStaffIds(
                                    virtualStaffIds.filter((id) => id !== person.id)
                                  )
                                } else {
                                  setVirtualStaffIds([...virtualStaffIds, person.id])
                                }

                              }}
                            >
                              {person.name}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => navigate("/admin/meetings")}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-btn"
                onClick={()=> navigate("/admin/meetings") }
                disabled={loading}
              >
                  {loading ? "Creating..." : "Create Meeting"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>

  {showSuccessModal && (
  <div className="modal-overlay">
    <div className="modal-card">
      <h3>✅ Meeting Created</h3>
      <p>Your meeting has been successfully created.</p>

      <div className="modal-actions">
        <button
          className="primary-btn"
          onClick={() => {
            setShowSuccessModal(false)
            navigate("/admin/meetings")
          }}
        >
          Go to Meetings
        </button>
      </div>
    </div>
  </div>
)}

</div>
  );
}

export default CreateMeeting;
