import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { projectAuth, projectFirestore, projectStorage } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // signup

      const res = await createUserWithEmailAndPassword(
        projectAuth,
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete signup");
      }
      //upload user thumbnail to bucket
      const uploadPath = `thumbnail/${res.user.uid}/${thumbnail.name}`;
      const thumbnailRef = ref(projectStorage, uploadPath);

      try {
        await uploadBytes(thumbnailRef, thumbnail);
      } catch (error) {
        console.log(error.message);
      }
      // get the url from the bucket 
      const photoURL= await getDownloadURL(thumbnailRef)

      // add display name to user
      await updateProfile(res.user, { displayName, photoURL });

      //save user to db 
      await setDoc(doc(projectFirestore, 'users', res.user.uid), {
        online:true,
        displayName,
        photoURL,
      })

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

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

  return { signup, error, isPending };
};
