'use client';

import { useRef } from 'react';

interface UploadAreaProps {
  onUpload: (file: File) => void;
}

export const UploadArea = ({ onUpload, children }: React.PropsWithChildren<UploadAreaProps>) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openExplorer = () => {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  };

  return (
    <div onClick={openExplorer} className="inline-flex w-fit gap-6 center vertical">
      {children}

      <input
        ref={fileInputRef}
        type="file"
        // accept=""
        onChange={event => {
          const { target } = event;
          const files = target?.files;

          if (!target || !files?.length) return;

          onUpload(files[0]);

          target.value = '';
        }}
        hidden
      />
    </div>
  );
};
