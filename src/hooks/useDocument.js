import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useDocument = (collectionName, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ref = doc(projectFirestore, collectionName, id);

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
            setError("The document doesn't exists")
        }
      },
      (error) => {
        console.log(error);
        setError("Failed to get document");
      }
    );
    return () => unsubscribe();
  }, [collectionName, id]);

  return { document, error };
};
