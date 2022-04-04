import React from "react";

function Jumbutron() {
  return (
    <section>
      <div className="flex justify-center mx-auto py-12 px12 sm:700">
        <div className="p-4 w-6/12 text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            Work fast from anywhere
          </h5>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            Stay up to date and move work forward with Flowbite on iOS &
            Android. Download the app today.
          </p>
          <div className="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 grid-cols-2">
            <a
              href="#"
              className="group block w-full sm:w-auto  rounded-lg p-2 bg-white ring-1 ring-slate-900/5 shadow-lg hover:bg-sky-500 hover:ring-sky-500"
            >
              <div className="flex items-center space-x-3">
                <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">
                  Telpon yang punya
                </h3>
              </div>
              <p className="text-slate-500 group-hover:text-white text-sm">
                kilk disini
              </p>
            </a>
            <a
              href="#"
              className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <div className="text-left">
                <div className="mb-1 text-xs">contract sekarang</div>
                <div className="-mt-1 font-sans text-sm font-semibold">
                  klik disini
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Jumbutron;
