interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className = "h-4 w-full" }: LoadingSkeletonProps) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        <LoadingSkeleton className="h-6 w-3/4" />
        <LoadingSkeleton className="h-4 w-1/2" />
        <LoadingSkeleton className="h-4 w-1/3" />
        <div className="flex gap-2 pt-2">
          <LoadingSkeleton className="h-8 w-20" />
          <LoadingSkeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  );
}