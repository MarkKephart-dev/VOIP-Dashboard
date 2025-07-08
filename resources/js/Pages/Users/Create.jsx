import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('users.store'));
    }

    return (
        <>
            <Head title="Add User" />

            <div className="p-8 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Add User</h1>

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

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            className="w-full border p-2"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                        />
                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                    </div>

                    <div>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="w-full border p-2"
                            value={data.password_confirmation}
                            onChange={e => setData('password_confirmation', e.target.value)}
                        />
                    </div>

                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={processing}>
                        Create User
                    </button>
                </form>
            </div>
        </>
    );
}
