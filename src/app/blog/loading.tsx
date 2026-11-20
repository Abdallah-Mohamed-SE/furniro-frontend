import { Card } from "@/components/ui/Card";

export default function BlogLoading() {
  return (
    <main className="flex-1 py-12 sm:py-16 lg:py-20" aria-busy="true">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Pulsing Skeleton Header */}
        <header className="flex flex-col items-center space-y-4 text-center animate-pulse">
          <div className="h-6 w-28 rounded-full bg-slate-200" />
          <div className="h-10 w-64 rounded-xl bg-slate-200 sm:w-96" />
          <div className="h-4 w-72 rounded-md bg-slate-200 sm:w-96" />
        </header>

        {/* Skeleton Grid of 6 Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={index}
              className="flex h-full flex-col justify-between border-slate-200/90 p-6 animate-pulse"
            >
              <div className="space-y-4">
                {/* Simulated Badge and Read Time */}
                <div className="flex items-center justify-between">
                  <div className="h-5 w-16 rounded-full bg-slate-200" />
                  <div className="h-4 w-20 rounded-md bg-slate-200" />
                </div>

                {/* Simulated Title (2 lines) */}
                <div className="space-y-2 pt-1">
                  <div className="h-5 w-5/6 rounded-md bg-slate-200" />
                  <div className="h-5 w-3/5 rounded-md bg-slate-200" />
                </div>

                {/* Simulated Body (3 lines) */}
                <div className="space-y-2 pt-2">
                  <div className="h-4 w-full rounded bg-slate-200/80" />
                  <div className="h-4 w-full rounded bg-slate-200/80" />
                  <div className="h-4 w-3/4 rounded bg-slate-200/80" />
                </div>
              </div>

              {/* Simulated Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="h-4 w-24 rounded bg-slate-200" />
                <div className="h-4 w-14 rounded bg-slate-200" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
