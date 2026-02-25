import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import API from "../api";

function Resumes() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [resumes, setResumes] = useState([]);

  // load from API
  useEffect(() => {
    API.get("/api/resumes")
      .then((res) => setResumes(res.data))
      .catch(() => {});
  }, []);

  const handleSave = () => {
    if (!name || !text) return;

    API.post("/api/resumes", { name, text })
      .then((res) => {
        setResumes([...resumes, res.data]);
        setName("");
        setText("");
        setOpen(false);
      })
      .catch(() => {});
  };

  const handleDelete = (id) => {
    API.delete(`/api/resumes/${id}`)
      .then(() => {
        setResumes(resumes.filter((r) => r.id !== id));
      })
      .catch(() => {});
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resumes</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Resume
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded shadow p-6 space-y-3">
        {resumes.length === 0 && <p>No resumes yet</p>}

        {resumes.map((r) => (
          <div
            key={r.id}
            className="border p-3 rounded flex justify-between"
          >
            <span>{r.name}</span>

            <button
              onClick={() => handleDelete(r.id)}
              className="text-red-500 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Add Resume</h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Resume Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-3 rounded h-40"
          placeholder="Paste resume text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

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

export default Resumes;