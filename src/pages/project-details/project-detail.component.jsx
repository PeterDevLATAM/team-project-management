import "./project-details.styles.css";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import ProjectSummary from "../../components/project-summary/project-summary.component";
import ProjectComents from "../../components/project-comments/project-comment.component";

export default function ProjectDetails() {
  const { id } = useParams();
  const { document, error } = useDocument("projects", id);

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="project-details">
      <ProjectSummary project={document} />
      <ProjectComents project={document} />
    </div>
  );
}
