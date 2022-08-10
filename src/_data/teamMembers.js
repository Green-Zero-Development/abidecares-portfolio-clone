const metaData = require('./metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchData() {
    urlToCache = metaData.apiUrl + '/team-members.json';
    cacheInterval = metaData.cacheInterval;
    try {
        return AssetCache(
            urlToCache,
            {
                duration: cacheInterval,
                type: "json"
            }
        );
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
}

async function processData(data) {
    return Promise.all(
        data.map(async (dataItem) => {
            if (dataItem.acf.weight) {
                return await {
                    id: dataItem.id,
                    name: dataItem.acf.name,
                    headshot: dataItem.acf.headshot,
                    jobTitle: dataItem.acf.job_title,
                    location: dataItem.acf.location,
                    email: dataItem.acf.email,
                    phone: dataItem.acf.phone,
                    bio: dataItem.acf.bio,
                    types: dataItem.types,
                    weight: dataItem.acf.weight
                };
            } else {
                return await {
                    id: dataItem.id,
                    name: dataItem.acf.name,
                    headshot: dataItem.acf.headshot,
                    jobTitle: dataItem.acf.job_title,
                    location: dataItem.acf.location,
                    email: dataItem.acf.email,
                    phone: dataItem.acf.phone,
                    bio: dataItem.acf.bio,
                    types: dataItem.types,
                    weight: '999999'
                };
            }
        })
    );
}

module.exports = async () => {
    const data = await fetchData();
    const processedData = await processData(data);
    return processedData;
};