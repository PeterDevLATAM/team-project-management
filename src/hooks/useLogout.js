import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { projectAuth, projectFirestore } from "../firebase/config";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      //getting user ref befor loggin him out
      const userRef = doc(projectFirestore, "users", projectAuth.currentUser.uid);
      // update state of user in db still logged in
      await updateDoc(userRef, {
        online: false,
      });

      // sign the user out
      await signOut(projectAuth);

      // dispatch logout action
      dispatch({ type: "LOGOUT" });
      setIsPending(false);

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
