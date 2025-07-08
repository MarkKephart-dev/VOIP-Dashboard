import React from 'react';
import { Head, usePage, Link, router } from '@inertiajs/react';

export default function Index({ plans }) {
    const { flash } = usePage().props;

    function handleDelete(id) {
        if (confirm('Are you sure you want to delete this service plan?')) {
            router.delete(route('plans.destroy', id));
        }
    }

    return (
        <>
            <Head title="Service Plans" />

            {flash.success && (
                <div className="bg-green-500 text-white px-4 py-2 mb-4 rounded shadow">
                    {flash.success}
                </div>
            )}

            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Service Plans</h1>
                    <Link
                        href={route('plans.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Add Plan
                    </Link>
                </div>

                <table className="w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Description</th>
                            <th className="p-3 border">Price</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.map(plan => (
                            <tr key={plan.id} className="hover:bg-gray-50">
                                <td className="p-3 border">{plan.name}</td>
                                <td className="p-3 border">{plan.description}</td>
                                <td className="p-3 border">${plan.price}</td>
                                <td className="p-3 border space-x-4">
                                    <Link href={route('plans.edit', plan.id)} className="text-blue-600 hover:underline">Edit</Link>
                                    <button
                                        onClick={() => handleDelete(plan.id)}
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
