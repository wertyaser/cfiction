"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function DownloadPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const url = searchParams.get("url");

  useEffect(() => {
    if (title && url) {
      console.log(`User clicked: ${title}`);
      window.location.href = url;
    }
  }, [title, url]);

  return (
    <div className="text-center p-6">
      <p>Redirecting to download...</p>
    </div>
  );
}
