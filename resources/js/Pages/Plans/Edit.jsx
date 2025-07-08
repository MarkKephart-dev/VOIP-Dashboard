import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ plan }) {
    const { data, setData, put, processing, errors } = useForm({
        name: plan.name,
        description: plan.description,
        price: plan.price,
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('plans.update', plan.id));
    }

    return (
        <>
            <Head title="Edit Plan" />
            <div className="p-8 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Edit Service Plan</h1>
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
                        <label>Description</label>
                        <textarea
                            className="w-full border p-2"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                        />
                        {errors.description && <p className="text-red-500">{errors.description}</p>}
                    </div>

                    <div>
                        <label>Price</label>
                        <input
                            type="number"
                            className="w-full border p-2"
                            value={data.price}
                            onChange={e => setData('price', e.target.value)}
                        />
                        {errors.price && <p className="text-red-500">{errors.price}</p>}
                    </div>

                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={processing}>
                        Update
                    </button>
                </form>
            </div>
        </>
    );
}
