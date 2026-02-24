import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <div className="p-6 text-2xl font-bold">AI Job Tracker</div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;