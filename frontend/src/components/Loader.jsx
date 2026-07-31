function Loader() {
  return (
    <div className="text-center mt-6">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>

      <p className="mt-3 text-gray-600">
        Azure AI is analyzing...
      </p>
    </div>
  );
}

export default Loader;