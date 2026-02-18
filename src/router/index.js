import Navigo from 'navigo';

const router = new Navigo('/', { hash: true });

router
    .on('/', () => {
        import('../pages/Home.js').then(module => {
            new module.default();
        });
    })
    .on('/dashboard', () => {
        import('../pages/Dashboard.js').then(module => {
            new module.default();
        });
    })
    .on('/lab/machine-learning', () => {
        // New Lab Hub (Overview)
        import('../pages/LabOverview.js').then(module => {
            new module.default();
        });
    })
    .on('/experiment/:id', ({ data }) => {
        // Individual Experiment Page
        import('../pages/Experiment.js').then(module => {
            new module.default(data.id);
        });
    });

// CRITICAL: Tell Navigo to resolve the current route
router.resolve();

export default router;
