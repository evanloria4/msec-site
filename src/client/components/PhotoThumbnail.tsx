import React from 'react';

type PhotoThumbnailProps = {
  file: File;
  onRemove: () => void;
};

export default function PhotoThumbnail({ file, onRemove }: PhotoThumbnailProps) {
  const [url, setUrl] = React.useState('');

  React.useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="relative h-16 w-16 shrink-0">
      <img
        src={url}
        alt={file.name}
        className="h-full w-full rounded-lg border border-slate-200 object-cover"
      />
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${file.name}`}
        className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow hover:bg-red-600"
      >
        ✕
      </button>
    </div>
  );
}
