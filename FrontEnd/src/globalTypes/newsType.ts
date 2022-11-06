export type NewsType = {

    results:Test[]
};

export type Test = {
    id: string
    publisher: {
        name: string
        homepage_url: string
        logo_url: string
        favicon_url: string
    },
    title: string
    author: string
    published_utc: string
    article_url: string
    tickers: string[]
    amp_url: string
    image_url: string
    description: string
    keywords: string[]
};

export type Results = {
    article_url:string,
    description: string,
    image_url:string,
    published_utc:string,
    tickers: string[],
    title:string,
    id: string
};

export type WorldNewsType = {

    articles:WorldNews[]
};

export type WorldNews = {
    author:string | null,
    content:string,
    description:string,
    publishedAt:string,
    sourse:{
        id:string | null,
        name:string,
    },
    title:string,
    url:string,
    urlToImage:string,
};
export type Articles = {
    author:string | null,
    content:string,
    url:string,
    description: string,
    urlToImage:string,
    publishedAt:string,
    title:string,
};
