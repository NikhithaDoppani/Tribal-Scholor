import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message = 'Something went wrong. Please try again.' }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center border border-clay-200 bg-clay-50 px-6 py-16 text-center">
      <AlertTriangle className="mb-4 h-8 w-8 text-clay-500" />
      <h3 className="font-serif text-lg font-medium text-clay-800">Unable to load</h3>
      <p className="mt-1.5 max-w-sm text-sm text-clay-600">{message}</p>
    </div>
  );
}
