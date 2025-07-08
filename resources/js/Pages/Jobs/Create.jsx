import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ devices }) {
    const { data, setData, post, processing, errors } = useForm({
        device_id: '',
        status: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('jobs.store'));
    }

    return (
        <>
            <Head title="New Provisioning Job" />
            <div className="p-8 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">New Job</h1>
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Device Dropdown */}
                    <div>
                        <label className="block font-semibold mb-1">Device</label>
                        <select
                            value={data.device_id}
                            onChange={(e) => setData('device_id', e.target.value)}
                            className="w-full border p-2"
                        >
                            <option value="">Select a device</option>
                            {devices.map((device) => (
                                <option key={device.id} value={device.id}>
                                    {device.mac_address}
                                </option>
                            ))}
                        </select>
                        {errors.device_id && <p className="text-red-500">{errors.device_id}</p>}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block font-semibold mb-1">Status</label>
                        <input
                            className="w-full border p-2"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                        />
                        {errors.status && <p className="text-red-500">{errors.status}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        disabled={processing}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}
