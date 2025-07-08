import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Dashboard({ auth }) {
     return (
        <>
            <Head title="Dashboard" />

            <div className="p-8">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card title="Users" href="/users" />
                    <Card title="Devices" href="/devices" />
                    <Card title="Provisioning Jobs" href="/jobs" />
                    <Card title="Service Plans" href="/plans" />
                    <Card title="Add Device" href="/devices/new" />
                </div>
            </div>
        </>
    );
}

function Card({ title, href }) {
    return (
        <a href={href} className="rounded-2xl shadow-md bg-white hover:bg-gray-100 p-6 border border-gray-200 transition duration-150 block">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </a>
    );
}
