import React from 'react';
import { Head, usePage, Link, router } from '@inertiajs/react';

export default function Index({ jobs }) {
    const { flash } = usePage().props;

    function handleDelete(id) {
        if (confirm('Delete this job?')) {
            router.delete(route('jobs.destroy', id));
        }
    }

    return (
        <>
            <Head title="Provisioning Jobs" />

            {flash.success && (
                <div className="bg-green-500 text-white px-4 py-2 mb-4 rounded shadow">
                    {flash.success}
                </div>
            )}

            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Provisioning Jobs</h1>
                    <Link href={route('jobs.create')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        New Job
                    </Link>
                </div>

                <table className="w-full bg-white border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border">ID</th>
                            <th className="p-3 border">Device</th>
                            <th className="p-3 border">Status</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map(job => (
                            <tr key={job.id} className="hover:bg-gray-50">
                                <td className="p-3 border">{job.id}</td>
                                <td className="p-3 border">{job.device?.mac_address}</td>
                                <td className="p-3 border">{job.status}</td>
                                <td className="p-3 border space-x-4">
                                    <Link href={route('jobs.edit', job.id)} className="text-blue-600 hover:underline">Edit</Link>
                                    <button onClick={() => handleDelete(job.id)} className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
