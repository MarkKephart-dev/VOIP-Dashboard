import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import React from 'react';

export default function Devices({ devices, auth }) {
    function handleDelete(id) {
        if (confirm('Are you sure you want to delete this device?')) {
            router.delete(`/devices/${id}`);
        }
    }
    return (
        <>
            <Head title="Devices" />

            <div className="p-8">
                <h1 className="text-3xl font-bold mb-6">Devices</h1>

                <table className="w-full border-collapse border border-gray-300 bg-white">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3 border border-gray-300">MAC Address</th>
                            <th className="p-3 border border-gray-300">Model</th>
                            <th className="p-3 border border-gray-300">Status</th>
                            <th className="p-3 border border-gray-300">User</th>
                            <th className="p-3 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map((device) => (
                            <tr key={device.id} className="hover:bg-gray-50">
                                <td className="p-3 border border-gray-300 font-mono">{device.mac_address}</td>
                                <td className="p-3 border border-gray-300">{device.model}</td>
                                <td className="p-3 border border-gray-300">{device.status}</td>
                                <td className="p-3 border border-gray-300">{device.user?.name || 'Unassigned'}</td>
                                <td className="p-3 border border-gray-300 space-x-4">
                                    <a href={`/devices/${device.id}/edit`} className="text-blue-600 hover:underline">
                                        Edit
                                    </a>
                                    <button
                                        onClick={() => handleDelete(device.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
