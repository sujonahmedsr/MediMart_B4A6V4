"use client";

type ErrorProps = {
  error: Error & { digest?: string }; // Error object with optional digest property
  reset: () => void; // Function to retry the page load
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-red-600">Something went wrong!</h1>
        <p className="text-gray-700 mt-2">{error?.message || "An unexpected error occurred."}</p>
        <button
          onClick={() => reset()} // Retry the page load
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}