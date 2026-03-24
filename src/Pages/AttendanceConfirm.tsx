import { useSearchParams } from "react-router-dom"
import {useState} from "react"
import "../style/attendance.css"

function AttendanceConfirm(){


  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")


    const [ searchParams ] = useSearchParams()
  const token = searchParams.get("token")
    console.log("Token:", token)


  const confirmAttendance = () => {

     if(!token){
        alert("Invalid attendance link")
        return
    }


    if(!navigator.geolocation){
        alert("Geolocation not supported")
        return
    }

    setLoading(true)

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const latitude= position.coords.latitude
        const longitude = position.coords.longitude

        console.log("Sending attendance confirmation:",{
            token,
            latitude,
            longitude
        })



    try{
        const res = await fetch(
          "http://207.180.246.69:7200/api/v1/meeting-invites/attendance/confirm",
          {
            method: "POST",
            headers: {
              "Content-Type":"application/json"
            },
            body: JSON.stringify({
              token,
              latitude,
              longitude
            })
          }
        )

        const data = await res.json()

        if(!res.ok) {
          throw new Error(data.message || "Request failed")
        }


        if(data.isSuccessful){
            setStatus("success")
        }else{
            setStatus("failed")
        }

      }catch(err: any){
        console.error(err)
        alert(err.message || "Something went wrong")
        setStatus("failed")
      }

        setLoading(false)
    },

      () => {
        alert("Location permission required")
        setLoading(false)
      }

    )
  }

  return (

    <div className="attendance-page">

            <div className="attendance-card">


      <h2>Meeting Attendance</h2>

      {status === "" && (
       
        <>
        <p>
            Click the button below to confirm your attendance at this meeting.
        </p>

      <button
      className="confirm-btn"
      onClick={confirmAttendance}
      disabled={loading || status === "success"}
      >
        {loading ? "Confirming..." : "Confirm Attendance"}
      </button>
      </>
      )}

      {status ==="success" && (
        <div className ="success-msg">
         Attendance Confirmed
        </div>
      )}


       {status ==="error" && (
        <div className ="error-msg">
             Attendance could not be confirmed
        </div>
      )}


     </div>

    </div>


  )

}

export default AttendanceConfirm