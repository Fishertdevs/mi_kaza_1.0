import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16 border-b">
        <Skeleton className="h-full w-full" />
      </div>

      <main className="flex-grow">
        <div className="bg-[#e6f4f9] py-12">
          <div className="container mx-auto px-4 text-center">
            <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
        </div>

        <div className="container mx-auto py-12 px-4">
          <Skeleton className="h-10 w-40 mb-6" />

          <div className="border rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <Skeleton className="h-12 w-12 rounded-full mr-3" />
              <Skeleton className="h-8 w-64" />
            </div>

            <Skeleton className="h-4 w-48 mb-6" />

            <div className="space-y-8">
              {[...Array(10)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-6 w-64 mb-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 space-x-4">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-64" />
            </div>
          </div>
        </div>
      </main>

      <div className="h-64 bg-gray-100">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  )
}
