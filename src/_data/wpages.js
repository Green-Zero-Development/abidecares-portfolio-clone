const metaData = require('./metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchData() {
    urlToCache = metaData.apiUrl + '/pages.json';
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
            if (dataItem.template == "templates/thank-you.php") {
                return await {
                    id: dataItem.id,
                    title: dataItem.title.rendered,
                    modified: dataItem.modified,
                    slug: dataItem.slug,
                    yoast: dataItem.yoast_head,
                    template: dataItem.template,
                    heroSection: dataItem.acf.hero_section
                };
            } else if (dataItem.template == "templates/services.php") {
                return await {
                    id: dataItem.id,
                    title: dataItem.title.rendered,
                    modified: dataItem.modified,
                    slug: dataItem.slug,
                    yoast: dataItem.yoast_head,
                    template: dataItem.template,
                    heroSection: dataItem.acf.hero_section,
                    serviceList: dataItem.acf.service_list.service,
                    trustedCaregiver: dataItem.acf.trusted_caregiver_section,
                    seeServiceAreasSection: dataItem.acf.see_service_areas_section
                };
            } else if (dataItem.template == "templates/our-services-area.php") {
                return await {
                    id: dataItem.id,
                    title: dataItem.title.rendered,
                    modified: dataItem.modified,
                    slug: dataItem.slug,
                    yoast: dataItem.yoast_head,
                    template: dataItem.template,
                    heroSection: dataItem.acf.hero_section
                };
            } else if (dataItem.template == "templates/about.php") {
                return await {
                    id: dataItem.id,
                    title: dataItem.title.rendered,
                    modified: dataItem.modified,
                    slug: dataItem.slug,
                    yoast: dataItem.yoast_head,
                    template: dataItem.template,
                    heroSection: dataItem.acf.hero_section,
                    whyWeCareSection: dataItem.acf.why_we_care_section,
                    teamSection: dataItem.acf.team_section
                };
            } else if (dataItem.template == "templates/for-providers.php") {
                return await {
                    id: dataItem.id,
                    title: dataItem.title.rendered,
                    modified: dataItem.modified,
                    slug: dataItem.slug,
                    yoast: dataItem.yoast_head,
                    template: dataItem.template,
                    heroSection: dataItem.acf.hero_section,
                    contentSections: dataItem.acf.content_sections,
                    servicesSection: dataItem.acf.services_section,
                    trustedCaregiver: dataItem.acf.trusted_caregiver_section,
                    seeServiceAreasSection: dataItem.acf.see_service_areas_section
                };
            } else if (dataItem.template == "templates/careers.php") {
                return await {
                    id: dataItem.id,
                    title: dataItem.title.rendered,
                    modified: dataItem.modified,
                    slug: dataItem.slug,
                    yoast: dataItem.yoast_head,
                    template: dataItem.template,
                    heroSection: dataItem.acf.hero_section,
                    cultureValuesSection: dataItem.acf.culture_and_values_section,
                    benefitsSection: dataItem.acf.benefits_section,
                    beliefsSection: dataItem.acf.beliefs_section
                };
            } else if (dataItem.template == "templates/contact.php") {
                return await {
                    id: dataItem.id,
                    title: dataItem.title.rendered,
                    modified: dataItem.modified,
                    slug: dataItem.slug,
                    yoast: dataItem.yoast_head,
                    template: dataItem.template,
                    heroSection: dataItem.acf.hero_section,
                    preferToTalkSection: dataItem.acf.prefer_to_talk_section,
                    ourLocationsSection: dataItem.acf.our_locations_section
                };
            } else if (dataItem.template == "templates/privacy.php" || dataItem.template == "templates/terms.php") {
                return await {
                    id: dataItem.id,
                    title: dataItem.title.rendered,
                    modified: dataItem.modified,
                    slug: dataItem.slug,
                    yoast: dataItem.yoast_head,
                    template: dataItem.template,
                    content: dataItem.acf.content
                };
            } else {
                return await {
                    id: dataItem.id,
                    title: dataItem.title,
                    modified: dataItem.modified,
                    slug: dataItem.slug,
                    yoast: dataItem.yoast_head,
                    template: dataItem.template,
                    acf: dataItem.acf
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