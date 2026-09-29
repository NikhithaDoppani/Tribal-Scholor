import type { SchemeId } from '@/types';
import { schemes } from '@/config/schemes';
import { Upload, FileText, CheckCircle, X } from 'lucide-react';

interface DocumentsStepProps {
  schemeId: SchemeId | null;
  data: Record<string, { uploaded: boolean; fileName: string }>;
  onUpload: (documentId: string, fileName: string) => void;
  onRemove: (documentId: string) => void;
  errors: Record<string, string>;
}

export function DocumentsStep({ schemeId, data, onUpload, onRemove, errors }: DocumentsStepProps) {
  const scheme = schemeId ? schemes[schemeId] : null;
  const documents = scheme?.requiredDocuments || [];

  return (
    <div>
      <h2 className="font-serif text-xl font-medium text-ink-950">Documents</h2>
      <p className="mt-1.5 text-sm text-ink-500">Upload all required documents in the specified formats.</p>

      <div className="mt-6 space-y-4">
        {documents.map((doc) => {
          const uploaded = data[doc.id]?.uploaded;
          return (
            <div key={doc.id} className="border border-ink-200 bg-white p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-ink-900">{doc.label}</h3>
                    {uploaded && (
                      <span className="inline-flex items-center gap-1 text-2xs font-medium text-forest-600">
                        <CheckCircle className="h-3 w-3" />
                        Uploaded
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-ink-500">{doc.description}</p>
                  <p className="mt-1 text-2xs text-ink-400">Format: {doc.format} · Max size: {doc.maxSize}</p>
                  {uploaded && data[doc.id]?.fileName && (
                    <div className="mt-2 flex items-center gap-2 border border-ink-100 bg-ink-50 px-3 py-1.5">
                      <FileText className="h-3.5 w-3.5 text-ink-400" />
                      <span className="text-xs text-ink-600">{data[doc.id].fileName}</span>
                      <button
                        onClick={() => onRemove(doc.id)}
                        className="ml-auto text-ink-400 hover:text-clay-600"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                  {errors[doc.id] && <p className="mt-1.5 text-xs text-clay-600">{errors[doc.id]}</p>}
                </div>
                {!uploaded && (
                  <label className="shrink-0 cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onUpload(doc.id, file.name);
                      }}
                    />
                    <span className="inline-flex items-center gap-2 border border-ink-300 bg-white px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50">
                      <Upload className="h-4 w-4" />
                      Upload
                    </span>
                  </label>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
