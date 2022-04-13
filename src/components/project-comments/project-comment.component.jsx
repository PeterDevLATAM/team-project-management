import "./project-comment.styles.css";

import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Timestamp } from "firebase/firestore";
import { useFirestore } from "../../hooks/useFirestore";

//generate an unique(extremely close to unique) id
function uid() {
    return (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,"");
  };

export default function ProjectComents({project}) {
  const [newComment, setNewComment] = useState("");
  const {user} = useAuthContext()

  const {updateDocument}= useFirestore('projects')

  const handleSubmit=(e)=>{
    e.preventDefault()
    const commentToAdd={
        displayName: user.displayName,
        photoURL: user.photoURL, 
        content: newComment, 
        createdAt: Timestamp.fromDate(new Date()), 
        id: uid()
    }
    let comments = []
    comments = project.comments
    comments.push(commentToAdd)
    updateDocument(project.id, {comments:comments})
  }

  return (
    <div className="project-comments">
      <h4>Project Comments </h4>
      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add a new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add comment</button>
      </form>
    </div>
  );
}
