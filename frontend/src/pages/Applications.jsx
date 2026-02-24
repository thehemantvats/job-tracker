import { useState, useEffect } from "react";
import Modal from "../components/Modal";

function Applications() {
  const [open, setOpen] = useState(false);

  // form state
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  // applications list
  const [applications, setApplications] = useState([]);

  // resumes list
const [resumes, setResumes] = useState([]);
const [resumeId, setResumeId] = useState("");

  useEffect(() => {
  const saved = localStorage.getItem("applications");
  if (saved) {
    setApplications(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  localStorage.setItem("applications", JSON.stringify(applications));
}, [applications]);

useEffect(() => {
  const savedResumes = localStorage.getItem("resumes");
  if (savedResumes) {
    setResumes(JSON.parse(savedResumes));
  }
}, []);

  const handleSave = () => {
    if (!company || !role) return;

    const newApp = {
      id: Date.now(),
      company,
      role,
      status,
      resumeId,
    };

    setApplications([...applications, newApp]);

    // reset
    setCompany("");
    setRole("");
    setStatus("Applied");
    setOpen(false);
    setResumeId("");
  };

  const getStatusColor = (status) => {
  switch (status) {
    case "Applied":
      return "bg-gray-200 text-gray-700";
    case "OA":
      return "bg-yellow-200 text-yellow-800";
    case "Interview":
      return "bg-blue-200 text-blue-800";
    case "HR":
      return "bg-purple-200 text-purple-800";
    case "Offer":
      return "bg-green-200 text-green-800";
    case "Rejected":
      return "bg-red-200 text-red-800";
    default:
      return "bg-gray-200";
  }
};

const handleDelete = (id) => {
  setApplications(applications.filter((app) => app.id !== id));
};

const handleStatusChange = (id, newStatus) => {
  setApplications(
    applications.map((app) =>
      app.id === id ? { ...app, status: newStatus } : app
    )
  );
};

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Applications</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Application
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded shadow p-6 space-y-3">
        {applications.length === 0 && <p>No applications yet</p>}

        {applications.map((app) => (
  <div key={app.id} className="border p-3 rounded flex justify-between items-center">
    {/* Left info */}
    <div>
      <div className="font-semibold">{app.company}</div>
      <div className="text-sm text-gray-500">{app.role}</div>
    </div>

    <div className="text-xs text-gray-400">
        {
            resumes.find((r) => String(r.id) === String(app.resumeId))?.name ||
            "No resume"
        }
    </div>

    {/* Right side */}
    <div className="flex items-center gap-3">
      <select value={app.status} onChange={(e) => handleStatusChange(app.id, e.target.value)} className={`px-3 py-1 rounded-full text-sm font-medium border-none ${getStatusColor( app.status )}`} >
        <option>Applied</option>
        <option>OA</option>
        <option>Interview</option>
        <option>HR</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <button onClick={() => handleDelete(app.id)} className="text-red-500 text-sm" >
        Delete
      </button>
    </div>
  </div>
))}
      </div>

      {/* Modal */}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Add Application</h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-3 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>OA</option>
          <option>Interview</option>
          <option>HR</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <select
            className="border p-2 w-full mb-3 rounded"
            value={resumeId}
            onChange={(e) => setResumeId(e.target.value)}
            >
            <option value="">Select Resume</option>
            {resumes.map((r) => (
                <option key={r.id} value={r.id}>
                {r.name}
                </option>
            ))}
        </select>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Save
        </button>
      </Modal>
    </div>
  );
}

export default Applications;