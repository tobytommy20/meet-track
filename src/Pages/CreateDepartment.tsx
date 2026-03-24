import { useState } from "react";



interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

function CreateDepartment({ onClose, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://207.180.246.69:7200/api/v1/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name
        }),
      });

      if (!res.ok) throw new Error("Failed to add department");

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Create Department</h3>

        <form onSubmit={handleSubmit}>
          <label>Department Name</label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="modal-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="secondary-btn" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDepartment;
