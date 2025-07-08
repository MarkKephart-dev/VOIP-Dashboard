import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ job }) {
    const { data, setData, put, processing, errors } = useForm({
        status: job.status,
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('jobs.update', job.id));
    }

    return (
        <>
            <Head title="Edit Job" />
            <div className="p-8 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Edit Provisioning Job</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label>Status</label>
                        <input
                            className="w-full border p-2"
                            value={data.status}
                            onChange={e => setData('status', e.target.value)}
                        />
                        {errors.status && <p className="text-red-500">{errors.status}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        disabled={processing}
                    >
                        Update
                    </button>
                </form>
            </div>
        </>
    );
}
