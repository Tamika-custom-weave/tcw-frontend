export default function ShopLoading() {
  return (
    <div className="w-full flex-grow flex flex-col bg-pure-white min-h-screen">
      {/* Header Skeleton */}
      <div className="w-full border-b border-[#a89d7e]/30 bg-pure-white py-12 md:py-20 flex flex-col items-center justify-center">
        <div className="h-4 w-24 bg-mist-gray mb-6 animate-pulse" />
        <div className="h-12 md:h-16 w-64 md:w-96 bg-mist-gray animate-pulse" />
      </div>

      <div className="w-full flex flex-grow relative">
        <div className="w-[16px] md:w-[24px] border-r border-[#a89d7e]/30 flex-shrink-0 bg-pure-white z-10" />

        <div className="flex-grow flex flex-col min-w-0">
          {/* Controls Skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 md:p-8 border-b border-[#a89d7e]/30 gap-4">
            <div className="h-6 w-32 bg-mist-gray animate-pulse" />
            <div className="h-6 w-48 bg-mist-gray animate-pulse" />
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-pure-white">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="group relative flex flex-col bg-pure-white border-b border-[#a89d7e]/30 sm:[&:not(:nth-child(2n))]:border-r lg:[&:not(:nth-child(2n))]:border-r-0 lg:[&:not(:nth-child(3n))]:border-r xl:[&:not(:nth-child(3n))]:border-r-0 xl:[&:not(:nth-child(4n))]:border-r"
              >
                {/* Image Skeleton */}
                <div className="relative w-full aspect-[4/5] bg-mist-gray animate-pulse" />
                
                {/* Content Skeleton */}
                <div className="p-6 flex flex-col items-center text-center space-y-3 border-t border-[#a89d7e]/30">
                  <div className="h-3 w-16 bg-mist-gray animate-pulse" />
                  <div className="h-5 w-40 bg-mist-gray animate-pulse" />
                  <div className="h-4 w-20 bg-mist-gray animate-pulse mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[16px] md:w-[24px] border-l border-[#a89d7e]/30 flex-shrink-0 bg-pure-white z-10" />
      </div>
    </div>
  );
}
