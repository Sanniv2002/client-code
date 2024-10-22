import React, { useState, useEffect } from 'react';
import './Table.css'

export const Table = ({ resources }: { resources: any }) => {
    const [filteredResources, setFilteredResources] = useState(resources);
    const [status, setStatus] = useState('ALL');

    useEffect(() => {
        if (status === 'ALL') {
            setFilteredResources(resources);
        } else {
            //@ts-ignore
            setFilteredResources(resources.filter(resource => resource.status === status));
        }
    }, [resources, status]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'RUNNING':
                return 'bg-green-500'; // Green for running
            case 'STOPPED':
                return 'bg-orange-500'; // Orange for stopped
            case 'TERMINATED':
                return 'bg-red-500'; // Red for terminated
            default:
                return 'bg-gray-500'; // Default color
        }
    };

    return (
        <div className="relative overflow-hidden shadow-md sm:rounded-lg bg-white dark:bg-gray-900 p-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-400 mb-4">Resources</h3>

            <div className="flex items-center justify-between pb-4">
                <select
                    className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="ALL">All</option>
                    <option value="RUNNING">Running</option>
                    <option value="STOPPED">Stopped</option>
                    <option value="TERMINATED">Terminated</option>
                </select>
            </div>
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {/* <th scope="col" className="px-6 py-3">ID</th> */}
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
                        {filteredResources.map((resource: any) => (
                            <tr key={resource.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                {/* <td className="px-6 py-4">{resource.id}</td> */}
                                <td className="px-6 py-4">{resource.name}</td>
                                <td className="px-6 py-4">{resource.alias}</td>
                                <td className="px-6 py-4">{resource.environment}</td>
                                <td className="px-6 py-4 flex items-center">
                                    <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(resource.status)} me-2`}></div>
                                    {resource.status}
                                </td>
                                <td className="px-6 py-4">{resource.PORT ?? 'N/A'}</td>
                                <td className="px-6 py-4">{resource.dns_record_id}</td>
                                <td className="px-6 py-4">{new Date(resource.createdAt).toLocaleString()}</td>
                                <td className="px-6 py-4">{resource.resumedAt ? new Date(resource.resumedAt).toLocaleString() : 'N/A'}</td>
                                <td className="px-6 py-4">{resource.stoppedAt ? new Date(resource.stoppedAt).toLocaleString() : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
