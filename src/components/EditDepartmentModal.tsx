import { useState } from "react"

function EditDepartmentModal({ department, onClose, onUpdated }: any) {

  const [name,setName] = useState(department.name)

  const handleUpdate = async (e:any) => {
    e.preventDefault()

    try {

      const res = await fetch(
        `http://207.180.246.69:7200/api/v1/departments/${department.id}`,
        {
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            name
          })
        }
      )

      const data = await res.json()

      if(!res.ok) throw new Error(data.message)

      onUpdated({
        ...department,
        name
      })

    } catch(err){
      console.error(err)
    }

  }

  return(

    <div className="modal-overlay">

      <div className="modal">

        <h3>Edit Department</h3>

        <form onSubmit={handleUpdate}>

          <label>Department Name</label>

          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <div className="modal-actions">

            <button
              type="button"
              className="secondary-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-btn"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>

  )
}

export default EditDepartmentModal