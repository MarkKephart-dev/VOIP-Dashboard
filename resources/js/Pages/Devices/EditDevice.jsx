import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function EditDevice({ device, users }) {
    const { data, setData, put, errors } = useForm({
        mac_address: device.mac_address,
        model: device.model,
        status: device.status,
        user_id: device.user_id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/devices/${device.id}`);
    };

    return (
        <>
            <Head title="Edit Device" />
            <div className="p-8 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Edit Device</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium">MAC Address</label>
                        <input
                            type="text"
                            value={data.mac_address}
                            onChange={(e) => setData('mac_address', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.mac_address && <p className="text-red-500 text-sm">{errors.mac_address}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Model</label>
                        <input
                            type="text"
                            value={data.model}
                            onChange={(e) => setData('model', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Status</label>
                        <select
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="provisioned">Provisioned</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Assign to User</label>
                        <select
                            value={data.user_id || ''}
                            onChange={(e) => setData('user_id', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">-- None --</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        {errors.user_id && <p className="text-red-500 text-sm">{errors.user_id}</p>}
                    </div>

                    <div>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Update Device
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
