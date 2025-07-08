import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Layout from '@/Layouts/AuthenticatedLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ).then((module) => {
            // Set a default layout if the page doesn’t define one
            module.default.layout = module.default.layout || ((page) => <Layout user={page.props.auth.user}>{page}</Layout>);
            return module;
        }),

    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
