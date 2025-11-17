/* eslint-disable no-console */
const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

const endpoints = [
    '/api/health',
    '/api/services',
    '/api/services?featured=true',
    '/api/contact',
    '/api/appointments'
];

const fetchJson = async (path, init) => {
    const response = await fetch(`${BASE_URL}${path}`, init);
    if (!response.ok) {
        throw new Error(`Request to ${path} failed with status ${response.status}`);
    }
    const json = await response.json();
    if (!json.success) {
        throw new Error(`Endpoint ${path} responded without success flag`);
    }
    return json;
};

const runSmokeTest = async () => {
    console.log(`🔍 Running API smoke tests against ${BASE_URL}`);

    await fetchJson('/api/health');

    const services = await fetchJson('/api/services');
    if (!Array.isArray(services.data) || services.data.length === 0) {
        throw new Error('Services endpoint returned no data');
    }

    const sampleService = services.data[0];
    await fetchJson(`/api/services/${sampleService.id}`);

    console.log('✅ Services endpoints responded correctly');

    console.log('ℹ️ Skipping POST flows for contact/appointments in smoke test (requires payload)');

    console.log('🎉 API smoke test completed successfully');
};

runSmokeTest().catch(error => {
    console.error('❌ API smoke test failed', error);
    process.exit(1);
});

