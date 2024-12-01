import React, { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ALLOWED_FILE_MIME_TYPES } from "@/domains/file";
import { validateFile } from "@/lib/utils";
import { JSX, SVGProps } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  className?: string;
  onUpload: (file: File) => void;
}

export const Upload: React.FC<Props> = ({ onUpload }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file: File | null = event.target.files?.[0] || null;

    if (file && validateFile(file)) {
      onUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file: File | null = event.dataTransfer.files?.[0] || null;

    if (file && validateFile(file)) {
      onUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div
          className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <FileIcon className="w-12 h-12" />
          <span className="text-sm font-medium text-gray-500">
            Drag and drop a file or click to browse
          </span>
          <span className="text-xs text-gray-500">
            PDF, image, video, or audio
          </span>
        </div>
        <div className="space-y-2 text-sm">
          <Label htmlFor="file" className="text-sm font-medium">
            File
          </Label>
          <Input
            id="file"
            type="file"
            placeholder="File"
            accept={ALLOWED_FILE_MIME_TYPES.join(", ")}
            onChange={handleFileChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

function FileIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}
