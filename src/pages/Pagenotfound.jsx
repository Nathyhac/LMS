export default function Pagenotfound() {
  return (
    <>
      <div className="min-h-screen flex">
        <main className="flex h-screen w-screen items-center justify-center bg-white px-6 py-24 sm:py-32 lg:px-8">

        <div className="text-center">
          <p className="text-base font-semibold text-red-600">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Page not found!!
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 ">
            <a
              href="dashboard"
              className="rounded-md bg-blue-500 px-3.5 py-2.5 text-lg font-semibold text-white  hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 "
            >
              Go back home
            </a>
          </div>
        </div>
      </main>
      </div>
    </>
  )
}
