import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../firebase/config";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export const useCollection = (collectionName, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const queryParam = useRef(_query).current;
  const orderByParam = useRef(_orderBy).current;

  useEffect(() => {
    let collectionRef = collection(projectFirestore, collectionName);

    if (queryParam) {
      collectionRef = query(collectionRef, where(queryParam));
    }
    if (orderByParam) {
      collectionRef = query(collectionRef, orderBy(orderByParam));
    }
    const unsubscribe = onSnapshot(
      collectionRef,
      (documentSnapshot) => {
        let documents = [];
        documentSnapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(documents);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
      }
    );

    return () => unsubscribe();
  }, [collectionName, queryParam, orderByParam]);

  return { documents, error };
};
