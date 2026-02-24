import { useState, useEffect } from "react";

function Tailor() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("resumes");
    if (saved) setResumes(JSON.parse(saved));
  }, []);

  const handleGenerate = () => {
    const resume = resumes.find((r) => String(r.id) === String(resumeId));

    if (!resume || !jd) return;

    // mock AI output
    setResult(
      `Based on the job description, emphasize these skills from your resume:\n\n• ${resume.name} related skills\n• Add keywords from JD\n• Highlight relevant projects\n\n(This will be AI-generated later)`
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">AI Resume Tailor</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <select
          className="border p-2 w-full rounded"
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

        <textarea
          className="border p-2 w-full rounded h-40"
          placeholder="Paste Job Description"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Generate Suggestions
        </button>

        {result && (
          <div className="bg-gray-100 p-4 rounded whitespace-pre-line">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tailor;