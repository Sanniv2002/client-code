import React from 'react';
import './Table.css';

const SkeletonTable = () => {
    const rows = Array(5).fill(0); // You can adjust the number of skeleton rows

    return (
        <div className="relative overflow-hidden shadow-md sm:rounded-lg bg-white dark:bg-gray-900 p-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-400 mb-4">Loading Resources...</h3>

            <div className="flex items-center justify-between pb-4">
                <div className="inline-flex items-center text-gray-300 bg-gray-200 border border-gray-300 focus:outline-none font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-500 animate-pulse">
                    Loading Filter...
                </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Alias</th>
                            <th scope="col" className="px-6 py-3">Environment</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">PORT</th>
                            <th scope="col" className="px-6 py-3">DNS Record ID</th>
                            <th scope="col" className="px-6 py-3">Created At</th>
                            <th scope="col" className="px-6 py-3">Resumed At</th>
                            <th scope="col" className="px-6 py-3">Stopped At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((_, idx) => (
                            <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 animate-pulse">
                                <td className="px-6 py-4">
                                    <div className="h-3 bg-gray-300 rounded dark:bg-gray-600 w-24"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-3 bg-gray-300 rounded dark:bg-gray-600 w-20"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-3 bg-gray-300 rounded dark:bg-gray-600 w-16"></div>
                                </td>
                                <td className="px-6 py-4 flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-gray-600 me-2"></div>
                                    <div className="h-3 bg-gray-300 rounded dark:bg-gray-600 w-12"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-3 bg-gray-300 rounded dark:bg-gray-600 w-10"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-3 bg-gray-300 rounded dark:bg-gray-600 w-20"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-3 bg-gray-300 rounded dark:bg-gray-600 w-28"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-3 bg-gray-300 rounded dark:bg-gray-600 w-28"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-3 bg-gray-300 rounded dark:bg-gray-600 w-28"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SkeletonTable;
