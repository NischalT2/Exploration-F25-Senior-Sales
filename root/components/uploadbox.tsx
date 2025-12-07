"use client";

import React, { useRef, useState, useEffect } from "react";
import { Upload } from "lucide-react";

interface UploadBoxProps {
  onFileSelect?: (file: File) => void;
  accept?: string;
}

export default function UploadBox({ onFileSelect, accept = "image/*" }: UploadBoxProps) {
  // state and refs
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // handlers
  const handleClick = () => inputRef.current?.click();

  const handleFile = (file: File) => {
    if (preview) URL.revokeObjectURL(preview);
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFileName(file.name);
    if (onFileSelect) onFileSelect(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (f) handleFile(f);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
        }}
        style={{
          border: "2px dashed #ccc",
          borderRadius: 8,
          padding: 20,
          textAlign: "center",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {preview ? (
          <div>
            <img
              src={preview}
              alt={fileName ?? "preview"}
              style={{ maxWidth: "100%", maxHeight: 240, display: "block", margin: "0 auto" }}
            />
            {fileName && <div style={{ marginTop: 8 }}>{fileName}</div>}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Upload size={36} />
            <div style={{ fontWeight: 600 }}>Click or drag files here</div>
            <div style={{ color: "#666" }}>PNG, JPG, GIF — browser limits apply</div>
          </div>
        )}
      </div>

      <input ref={inputRef} type="file" accept={accept} style={{ display: "none" }} onChange={handleFileChange} />
    </div>
  );
}