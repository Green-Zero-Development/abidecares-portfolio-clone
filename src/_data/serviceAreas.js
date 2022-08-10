const metaData = require('./metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchData() {
    urlToCache = metaData.apiUrl + '/service-areas.json';
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
            return await {
                id: dataItem.id,
                title: dataItem.title,
                modified: dataItem.modified,
                slug: dataItem.slug,
                yoast: dataItem.yoast_head,
                template: dataItem.template,
                locationName: dataItem.acf.city,
                locationProperName: dataItem.acf.name_of_location,
                street: dataItem.acf.street_address,
                city: dataItem.acf.city,
                state: dataItem.acf.state,
                zipCode: dataItem.acf.zip_code,
                phoneNumber: dataItem.acf.phone_number,
                zipCodesServed: dataItem.acf.zip_codes_served,
                heroSection: dataItem.acf.hero_section,
                aboutSection: dataItem.acf.about_section,
                servicesSection: dataItem.acf.services_section,
                awards: dataItem.acf.awards,
                teamSection: dataItem.acf.team_section,
            };
        })
    );
}

module.exports = async () => {
    const data = await fetchData();
    const processedData = await processData(data);
    return processedData;
};