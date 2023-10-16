export default function Error({ errorMessage = "" }) {
  return (
    <div className="text-center space-y-2">
      <p className="text-3xl">Something&apos;s Wrong!</p>
      <p className="text-xl">Please Refresh</p>
      <pre className="bg-gray-200 text-red-500">{errorMessage}</pre>
    </div>
  );
}
