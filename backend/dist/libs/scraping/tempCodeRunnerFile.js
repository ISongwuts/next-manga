"use strict";
try {
    const webResponse = await axios.get(`${BASE_URL}/manga/?page=${page}&order=update`);
    const selector = cheerio.load(webResponse.data);
    const mangas = [];
    selector('.listupd > .bs').each((index, el) => {
        const baseElement = '.bsx > a';
        //Get upper details
        const link = selector(el).find(baseElement).attr('href');
        const type = selector(el).find(`${baseElement} > .limit > .type`).text();
        const coverImage = selector(el).find(`${baseElement} > .limit > img`).attr('src');
        //Get lower details
        const title = selector(el).find(`${baseElement} > .bigor > .tt`).text();
        const latestChapter = selector(el).find(`${baseElement} > .bigor > .adds > .epxs`).text();
        const ratingScore = selector(el).find(`${baseElement} > .bigor > .adds > .rt > .rating > .numscore`).text();
        //Assign details value
        mangas.push({
            title,
            cover: coverImage,
            link,
            type,
            latestChapter,
            ratingScore,
        });
    });
    console.log(JSON.stringify({
        page,
        mangas,
    }, null, 2));
}
catch (error) {
    console.error('Error fetching manga:', error);
}
