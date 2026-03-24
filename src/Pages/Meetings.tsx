import "../style/meetings.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import { FiMoreVertical, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import Pagination from "../components/Pagination";
import { useRef } from "react";


interface Meeting {
  id: number;
  title: string;
  mode: string;
  audienceType: string;
  startDatetime: string;
  status: string;
  durationMinutes?: number;
  zoomStartUrl?: string;
}

function Meetings() {

  const navigate = useNavigate();

  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [zoomStartMeetingUrl, setZoomStartMeetingUrl] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);


  const PageSize = 8;

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setOpenMenuId(null);
        }
      };

      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);


  useEffect(() => {
    fetchMeetings(page, PageSize);
  }, [page, search]);

  const fetchMeetings = async (pageNumber: number, size: number) => {
    try {

      const res = await fetch(
        `http://207.180.246.69:7200/api/v1/meetings?page=${pageNumber}&limit=${size}&search=${search}&`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMeetings(data.data.data || []);
      setTotalPages(data.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch meetings", err);
    }
  };

  const deleteMeeting = async (id: number) => {
    if (!window.confirm("Delete this meeting?")) return;

    try {
      await fetch(`http://207.180.246.69:7200/api/v1/meetings?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchMeetings(page, PageSize);
    } catch (err) {
      console.error("Delete failed", err);
    } 
  };

  const handleStartMeeting = (url:string) =>{
    if(!url){
      alert("Meeting start link not available")
      return;
    }
  
    setZoomStartMeetingUrl(url);
    setOpenMenuId(null)
  };

  const getMeetingStatus =(startDatetime: string, durationMinutes: number) => {

    const start = new Date(startDatetime).getTime()
    const end = start + durationMinutes * 60000
    const now = Date.now()

    if(now < start) return "scheduled"
    if(now >= start && now <= end) return "live"

    return "ended"
  };
  
  const [, forceUpdate] = useState(0)

useEffect(() => {

  const timer = setInterval(() => {
    forceUpdate(n => n + 1)
  }, 60000)

  return () => clearInterval(timer)

}, []);

  return (
    <div className="table-page">
      <div className="page-header">
        <h2>Meetings</h2>

        <div className="table-filters">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search meeting"
          />

          <button 
          className="primary-btn"
            onClick={() => navigate("/admin/create-meeting")}
          >
            + Create</button>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th className="id-header">ID</th>
              <th>Title</th>
              <th>Start Time</th>
              <th>Mode</th>
              <th>Audience</th>
              <th>Status</th>
              <th>Start Meeting</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting.id}>
                <td className="id">{meeting.id}</td>
                <td className="name">{meeting.title}</td>
                <td className="date">
                  {new Date(meeting.startDatetime).toLocaleString()}
                </td>
                <td>{meeting.mode}</td>
                <td>{meeting.audienceType.replace("_", " ")}</td>
                <td>
                  {(() =>{
                      const status = getMeetingStatus(
                        meeting.startDatetime,
                        meeting.durationMinutes
                      )

                      return(
                        <span className={`status-badge ${status}`}>
                          {status}
                          </span>
                      )

                  })()}
                
                </td>
                <td>
                  
                  <button
                   className="start-meeting-btn"
                   disabled={
                    getMeetingStatus(
                      meeting.startDatetime,
                      meeting.durationMinutes
                    ) === "ended"
                   }
                   onClick={() => handleStartMeeting(meeting.zoomStartUrl)}
                   >
                    Start
                   </button>

                   </td> 
        
                <td className="action-cell">
                  <button
                    className="menu-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(
                        openMenuId === meeting.id ? null : meeting.id
                      );
                    }}
                  >
                    <FiMoreVertical />
                  </button>
                  {openMenuId === meeting.id && (
                    <div className="action-menu" ref={menuRef}>
                      <button onClick={() => console.log("view", meeting.id)}>
                        <FiEye className="menu-icon" />
                        View
                      </button>

                      <button>
                        <FiEdit className="menu-icon" /> 
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => deleteMeeting(meeting.id)}
                      >
                        <FiTrash2 className="menu-icon delete" />
                        Delete
                      </button>
                    </div>
                  )}
                </td>

                    
              </tr>
            ))}

            {meetings.length === 0 && (
              <tr>
                <td colSpan={7}>No meetings found</td>
              </tr>
            )}
          </tbody>
        </table>

            {zoomStartMeetingUrl && (

  <div className="modal-overlay">

    <div className="modal">

      <h3>Start Meeting</h3>

      <p>
        Are you sure you want to start this meeting now?
      </p>

      <div className="modal-actions">

        <button
          className="secondary-btn"
          onClick={() => setZoomStartMeetingUrl(null)}
        >
          Cancel
        </button>

        <button
          className="primary-btn"
          onClick={() => {
            window.open(zoomStartMeetingUrl, "_blank");
            setZoomStartMeetingUrl(null);
          }}
        >
          Start Meeting
        </button>

      </div>

    </div>

  </div>

)}


      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}

export default Meetings;
