import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    API.get("/api/applications")
      .then((res) => setApplications(res.data))
      .catch(() => {});
  }, []);

  // ===== Metrics =====
  const total = applications.length;
  const offers = applications.filter((a) => a.status === "Offer").length;
  const interviews = applications.filter(
    (a) => a.status === "Interview" || a.status === "HR"
  ).length;
  const rejected = applications.filter((a) => a.status === "Rejected").length;
  const offerRate = total === 0 ? 0 : Math.round((offers / total) * 100);

  // ===== Stage distribution =====
  const stageCounts = {
    Applied: applications.filter((a) => a.status === "Applied").length,
    OA: applications.filter((a) => a.status === "OA").length,
    Interview: applications.filter((a) => a.status === "Interview").length,
    HR: applications.filter((a) => a.status === "HR").length,
    Offer: applications.filter((a) => a.status === "Offer").length,
    Rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  // ===== Card component =====
  const Card = ({ title, value }) => (
    <div className="bg-white rounded shadow p-6">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* ===== Analytics Cards ===== */}
      <div className="grid grid-cols-5 gap-4">
        <Card title="Total Applications" value={total} />
        <Card title="Interviews" value={interviews} />
        <Card title="Offers" value={offers} />
        <Card title="Rejected" value={rejected} />
        <Card title="Offer Rate %" value={`${offerRate}%`} />
      </div>

      {/* ===== Timeline Chart ===== */}
      <div className="mt-8 bg-white p-6 rounded shadow">
        <h2 className="font-bold mb-4">Application Stage Distribution</h2>

        <div className="space-y-3">
          {Object.entries(stageCounts).map(([stage, count]) => (
            <div key={stage}>
              <div className="flex justify-between text-sm mb-1">
                <span>{stage}</span>
                <span>{count}</span>
              </div>

              <div className="w-full bg-gray-200 rounded h-2">
                <div
                  className="bg-blue-500 h-2 rounded"
                  style={{ width: `${total ? (count / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;