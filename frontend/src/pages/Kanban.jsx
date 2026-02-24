import { useEffect, useState } from "react";

const stages = ["Applied", "OA", "Interview", "HR", "Offer", "Rejected"];

function Kanban() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("applications");
    if (saved) setApplications(JSON.parse(saved));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Kanban Board</h1>

      <div className="flex gap-4 overflow-x-auto">
        {stages.map((stage) => (
          <div key={stage} className="bg-gray-100 p-4 rounded w-64 flex-shrink-0">
            <h2 className="font-bold mb-3">{stage}</h2>

            <div className="space-y-2">
              {applications
                .filter((a) => a.status === stage)
                .map((app) => (
                  <div key={app.id} className="bg-white p-3 rounded shadow">
                    <div className="font-semibold">{app.company}</div>
                    <div className="text-xs text-gray-500">{app.role}</div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kanban;