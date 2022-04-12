import "./dashboard.stye.css";
import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/project-list/project-list.component";

export default function Dashboard() {
  const { documents, error } = useCollection("projects");
  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectList projects={documents} />}
    </div>
  );
}
