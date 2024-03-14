'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MangaCard from './manga-card';
import MainPagination from './main-pagination';
import SkeletonCard from './skeleton-card';

type Props = {};

const MangaArea = (props: Props) => {
    const [mangaList, setMangaList] = useState<any | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchMangaList = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/manga/?page=${currentPage}`);
                setMangaList(response.data);
                setTotalPages(Number.parseInt(response.data.totalPage));
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching manga list:', error);
                setIsLoading(false); // Set loading state to false on error
            }
        };

        fetchMangaList();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className='w-full grid grid-cols-6 gap-6'>
            {(isLoading || mangaList === null) ? (
                Array.from({ length: 40 }).map((_, index: number) => (
                    <SkeletonCard key={index} />
                ))
            ) : (
                mangaList.mangas.map((manga: any, index: number) => (
                    <MangaCard
                        key={index}
                        title={manga.title}
                        imgSrc={manga.cover}
                        path={manga.path}
                        latestChapter={manga.latestChapter}
                        timestamp={manga.timestamp}
                        score={manga.scoreNumber}
                    />
                ))
            )}
            <MainPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default MangaArea;
