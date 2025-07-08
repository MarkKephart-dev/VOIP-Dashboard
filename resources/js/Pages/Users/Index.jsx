import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function Index({ users }) {
    const { flash } = usePage().props;

    function handleDelete(id) {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('users.destroy', id));
        }
    }

    return (
        <>
            <Head title="Users" />

            {flash.success && (
                <div className="bg-green-500 text-white px-4 py-2 mb-4 rounded shadow">
                    {flash.success}
                </div>
            )}

            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Users</h1>
                    <Link href={route('users.create')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Add User
                    </Link>
                </div>

                <table className="w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="p-3 border">{user.name}</td>
                                <td className="p-3 border">{user.email}</td>
                                <td className="p-3 border space-x-4">
                                    <Link href={route('users.edit', user.id)} className="text-blue-600 hover:underline">Edit</Link>
                                    <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
