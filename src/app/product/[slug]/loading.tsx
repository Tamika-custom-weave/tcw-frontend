export default function ProductLoading() {
  return (
    <div className="w-full flex-grow flex flex-col bg-pure-white min-h-screen">
      <div className="w-full flex flex-grow relative">
        <div className="w-[16px] md:w-[24px] border-r border-[#a89d7e]/30 flex-shrink-0 bg-pure-white z-10" />

        <div className="flex-grow flex flex-col lg:flex-row min-w-0">
          {/* Left Column: Image Gallery Skeleton */}
          <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-[#a89d7e]/30 flex flex-col">
            <div className="relative w-full aspect-[4/5] bg-mist-gray animate-pulse" />
            
            {/* Thumbnails Skeleton */}
            <div className="flex border-t border-[#a89d7e]/30 overflow-x-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative w-24 sm:w-32 aspect-square flex-shrink-0 border-r border-[#a89d7e]/30 bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Right Column: Product Info Skeleton */}
          <div className="w-full lg:w-1/2 flex flex-col relative bg-pure-white">
            <div className="flex-grow p-8 md:p-12 lg:p-16 flex flex-col">
              {/* Breadcrumbs Skeleton */}
              <div className="flex gap-2 mb-8">
                <div className="h-3 w-12 bg-mist-gray animate-pulse" />
                <div className="h-3 w-4 bg-mist-gray animate-pulse" />
                <div className="h-3 w-16 bg-mist-gray animate-pulse" />
              </div>
              
              {/* Title & Price Skeleton */}
              <div className="h-8 md:h-10 w-3/4 bg-mist-gray animate-pulse mb-6" />
              <div className="h-6 w-24 bg-mist-gray animate-pulse mb-8" />
              
              {/* Options Skeletons */}
              <div className="space-y-8 mb-12">
                <div>
                  <div className="h-4 w-20 bg-mist-gray animate-pulse mb-4" />
                  <div className="flex gap-3">
                    <div className="h-10 w-16 bg-mist-gray animate-pulse" />
                    <div className="h-10 w-16 bg-mist-gray animate-pulse" />
                    <div className="h-10 w-16 bg-mist-gray animate-pulse" />
                  </div>
                </div>
                
                <div>
                  <div className="h-4 w-20 bg-mist-gray animate-pulse mb-4" />
                  <div className="flex gap-3">
                    <div className="h-10 w-24 bg-mist-gray animate-pulse" />
                    <div className="h-10 w-24 bg-mist-gray animate-pulse" />
                  </div>
                </div>
              </div>
              
              {/* Description Skeleton */}
              <div className="space-y-3 mt-auto">
                <div className="h-4 w-full bg-mist-gray animate-pulse" />
                <div className="h-4 w-full bg-mist-gray animate-pulse" />
                <div className="h-4 w-5/6 bg-mist-gray animate-pulse" />
              </div>
            </div>
            
            {/* Action Bar Skeleton */}
            <div className="sticky bottom-0 left-0 w-full bg-pure-white border-t border-[#a89d7e]/30 flex p-6 md:px-12 md:py-8 gap-4 shadow-lg z-20">
              <div className="h-12 w-24 border border-concrete-gray animate-pulse" />
              <div className="h-12 flex-grow bg-mist-gray animate-pulse" />
            </div>
          </div>
        </div>

        <div className="w-[16px] md:w-[24px] border-l border-[#a89d7e]/30 flex-shrink-0 bg-pure-white z-10" />
      </div>
    </div>
  );
}
