import React from "react";
import { useState } from "react";

function Records({ stats }) {
  const newArr = [...stats];
  const [sortBy, setSortBy] = useState(newArr);
  const [sortOrder, setSortOrder] = useState(true);

  function sortByTrials() {
    setSortBy([
      ...sortBy.sort((a, b) => {
        setSortOrder(pre=>!pre);
         return sortOrder ?  a.trials - b.trials :  b.trials - a.trials;
      }),
    ]);
  }
  function sortByTime() {
    setSortBy([
      ...sortBy.sort((a, b) => {
        setSortOrder(pre=>!pre);
        return sortOrder ? a.time - b.time : b.time - a.time;
      }),
    ]);
  }

  return (
    <div className="relative overflow-y-scroll w-[400px] shadow-md sm:rounded-lg mt-8 h-[200px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption className="font-bold bg-gray-500 text-white">Last results</caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">
                Trials
                <span className="cursor-pointer" onClick={sortByTrials}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512">
                    <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                  </svg>
                </span>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 ">
              <div className="flex items-center">
                Time
                <span className="cursor-pointer" onClick={sortByTime}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512">
                    <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                  </svg>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortBy.map((user) => {
            return (
              <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.username}
                </th>
                <td className="px-6 py-4">{user.trials}</td>
                <td className="px-6 py-4">{user.time} S</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Records;
