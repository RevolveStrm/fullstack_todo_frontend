import { Button } from "@/components/ui/button";
import {
  TaskFile,
  downloadTaskFile,
  useDownloadTaskFile,
} from "@/domains/file";
import { formatFileSize } from "@/lib/utils";
import { Download, FileIcon, LoaderIcon, Trash2 } from "lucide-react";
import React from "react";

interface FileCardProps {
  file: TaskFile;
  onDelete?: (fileId: string) => void;
}

export const FileCard: React.FC<FileCardProps> = ({ file, onDelete }) => {
  const { download, downloading } = useDownloadTaskFile(
    file.id,
    file.originalName
  );

  return (
    <div className="bg-card text-card-foreground rounded-lg p-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <FileIcon className="w-6 h-6 text-primary" />
        <div>
          <p className="font-medium truncate w-40 lg:w-[640px]">
            {file.originalName}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatFileSize(file.size)}
          </p>
        </div>
      </div>
      <div className="flex space-x-3">
        <Button variant="outline" size="icon" onClick={download}>
          {downloading ? (
            <LoaderIcon className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
        </Button>
        {onDelete && (
          <Button
            variant="outline"
            size="icon"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              onDelete(file.id);
            }}
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
};
