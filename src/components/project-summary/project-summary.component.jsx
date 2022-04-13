import "./project-summary.styles.css";
import Avatar from "../avatar/avatar.component";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHistory } from "react-router-dom";

export default function ProjectSummary({ project }) {
  const { deleteDocument } = useFirestore("projects");
  const { user } = useAuthContext();
  const history = useHistory();

  const handleClick = (e) => {
    deleteDocument(project.id);
    history.push("/");
  };
  return (
    <>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>
        <p className="due-date">
          Project due by: {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>The project is assigned to: </h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <Avatar photoURL={user.photoURL} key={user.id} />
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={handleClick}>
          Mark as complete
        </button>
      )}
    </>
  );
}
