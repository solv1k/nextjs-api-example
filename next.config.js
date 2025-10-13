/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            new URL('http://localhost/storage/**'),
            new URL('https://s3.mpdiscounter.site/**'),
            new URL('https://storage.yandexcloud.net/**'),
        ],
    },
};

module.exports = nextConfig;
