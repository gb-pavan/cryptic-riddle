export default function Loading() {
  return (
    <div className="p-6 max-w-lg mx-auto animate-pulse space-y-4">
      <div className="h-10 bg-gray-300 rounded w-1/3" /> 
      <div className="h-20 bg-gray-200 rounded" />     
      <div className="h-10 bg-gray-300 rounded w-1/4" />
    </div>
  );
}
