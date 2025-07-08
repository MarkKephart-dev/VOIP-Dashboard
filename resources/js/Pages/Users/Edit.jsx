import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('users.update', user.id));
    }

    return (
        <>
            <Head title="Edit User" />
            <div className="p-8 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Edit User</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label>Name</label>
                        <input
                            className="w-full border p-2"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            className="w-full border p-2"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>

                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={processing}>
                        Update User
                    </button>
                </form>
            </div>
        </>
    );
}
