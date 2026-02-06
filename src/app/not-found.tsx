export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-blue-200">404</h1>
      <p className="text-xl text-slate-600 mt-4">
        The medical record or page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full"
      >
        Return Home
      </a>
    </div>
  );
}
