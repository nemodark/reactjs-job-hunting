const SkeletonLoader = ({ loaderCount }) => {
  let loader = [];
  for (let i = 0; i < loaderCount; i++) {
    loader.push(
      <div key={i} className="flex flex-col">
        <div className="bg-white shadow-md rounded-md p-4">
          <div className="flex items-start justify-between space-x-4">
            <div className="h-full lg:h-24 w-1/6 bg-gray-300 animate-pulse mb-0"></div>
            <div className="flex flex-col w-full space-y-4">
              <div className="w-1/4 h-4 animate-pulse bg-gray-300"></div>
              <h2 className="w-2/4 h-4 animate-pulse bg-gray-300"></h2>
              <h2 className="w-3/4 h-4 animate-pulse bg-gray-300"></h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="grid mt-8 mb-4 gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
      {loader}
    </div>
  );
};

export default SkeletonLoader;
