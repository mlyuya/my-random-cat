import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";

interface CatCategory {
    id: number
    name: string
}

interface SearchCatImage {
    breeds: string[];
    categories: CatCategory[];
    id: string;
    url: string;
    width: number;
    height: number;
}

interface IndexPageProps {
    initCatImage: string
}

// type SearchCatImageResponse = SearchCatImage[];

const catImageUrls: string[] = [
    "https://cdn2.thecatapi.com/images/bpc.jpg",
    "https://cdn2.thecatapi.com/images/eac.jpg",
    "https://cdn2.thecatapi.com/images/6qi.jpg",
];

const randomChoice = (): string => {
    const index = Math.floor(Math.random() * catImageUrls.length);
    return catImageUrls[index]
}

const fetchCatImage = async (): Promise<SearchCatImage> => {
    const catSearchUrl: string = "https://api.thecatapi.com/v1/images/search"
    const res = await fetch(catSearchUrl)
    const result = await res.json()
    return result[0]
}

fetchCatImage().then((image) => {
    console.log(`猫のURL: ${image.url}`)
    return image.url
});

const IndexPage: NextPage<IndexPageProps> = ({ initCatImage }) => {
    const [catImageUrl, setCatImageUrl] = useState(
        initCatImage
    );

    const handleClick = async () => {
        const image = await fetchCatImage();
        return setCatImageUrl(image.url);
    }

    // useEffect(() => {
    //     setCatImageUrl(randomChoice());
    // }, []);

    return (
        <div>
            <h1>Hello, Next.js 👋</h1>
            <button onClick={handleClick}>🐱今日のニャンコ🐱</button>
            <div style={{ marginTop: 8 }}>
                <img src={catImageUrl}></img>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
    const CatImage = await fetchCatImage()
    return {
        props: {
            initCatImage: CatImage.url
        }
    }
}

export default IndexPage;