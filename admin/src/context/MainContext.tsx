import {
  useState,
  ReactNode,
  useEffect,
  useContext,
  createContext,
} from "react";
import {
  getDownloadURL,
  ref as storeRef,
  uploadBytesResumable,
} from "firebase/storage";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { firestore, storage } from "../firebase";

type MainContextValue = {
  createNewDriverToFirestore: any;
  admins: QueryDocumentSnapshot<DocumentData>[];
  uploadDriverImg: (imageFile: File) => Promise<string>;
};

const MainContext = createContext<MainContextValue>({} as MainContextValue);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [admins, setAdmins] = useState<QueryDocumentSnapshot<DocumentData>[]>(
    []
  );

  /* Storage */
  const uploadDriverImg = async (imageFile: File) => {
    const storageRef = storeRef(storage, `images/${imageFile.name}`);
    const uploadImg = uploadBytesResumable(storageRef, imageFile);
    await uploadImg;
    return await getDownloadURL(uploadImg.snapshot.ref);
  };

  const createNewDriverToFirestore = async (
    userData: EmployArg,
    userId: string,
    imgUrl: string
  ) => {
    await setDoc(doc(firestore, "drivers/", userId), {
      ...userData,
      role: "driver",
      avatar: imgUrl,
    });
  };

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(firestore, "admin"));
      querySnapshot.forEach((doc) => {
        setAdmins((pre: any) => [...pre, doc.data()]);
      });
    })();
  }, []);

  return (
    <MainContext.Provider
      value={{
        admins,
        uploadDriverImg,
        createNewDriverToFirestore,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
