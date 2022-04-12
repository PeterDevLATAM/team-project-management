import "./project-summary.styles.css";
import Avatar from "../avatar/avatar.component";

export default function ProjectSummary({ project }) {
  return (
    <div className="project-summary">
      <h2 className="page-title">{project.name}</h2>
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
  );
}
