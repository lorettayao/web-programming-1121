import { useState,useEffect } from "react";

import { useParams ,useRouter} from "next/navigation";

import type { Document } from "@/lib/types/db";
import { useDebounce } from "use-debounce";


export const useDocument = () => {
    const { docId } = useParams();
    const documentId = Array.isArray(docId) ? docId[0] : docId;
  const [document, setDocument] = useState<Document | null>(null);
  const [debouncedDocument] = useDebounce(document, 1000);
  const router = useRouter();
  const title = document?.title || "";
  const setTitle = (newTitle: string) => {
    if (document === null) return;
    setDocument({
      ...document,
      title: newTitle,
    });
  };

  const content = document?.content || "";
  const setContent = (newContent: string) => {
    if (document === null) return;
    setDocument({
      ...document,
      content: newContent,
    });
  };
  useEffect(() => {
    console.log("=======");
  }, [document]);
  useEffect(() => {
    console.log("*******");
  }, [debouncedDocument]);
  useEffect(() => {
    if (!documentId) return;
    const fetchDocument = async () => {
      const res = await fetch(`/api/documents/${documentId}`);
      if (!res.ok) {
        setDocument(null);
        router.push("/docs");
        return;
      }
      const data = await res.json();
      setDocument(data);
    };
    fetchDocument();
  }, [documentId, router]);

  return {
    documentId,
    document,
    // setDocument,
    title,
    setTitle,
    content,
    setContent,
  };
};
