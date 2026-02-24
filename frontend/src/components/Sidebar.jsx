import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className="w-60 bg-white shadow min-h-screen p-6">
      <h2 className="text-xl font-bold mb-6">Menu</h2>

      <ul className="space-y-4">
        <li>
            <Link className="hover:text-blue-600" to="/">Dashboard</Link>
        </li>

        <li>
           <Link className="hover:text-blue-600" to="/applications">Applications</Link>
        </li>

        <li>
            <Link className="hover:text-blue-600" to="/resumes">Resumes</Link>
        </li>

       <li>
           <Link className="hover:text-blue-600" to="/tailor">AI Tailor</Link>
       </li>
       <li>
            <Link className="hover:text-blue-600" to="/kanban">Kanban</Link>
       </li>
     </ul>
    </div>
  );
}

export default Sidebar;