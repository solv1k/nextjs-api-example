'use client';

import CatalogApi, { Advert } from "@/api/endpoints/catalog";
import { useState, useEffect, useCallback, useRef } from "react";
import { ApiError } from "@/api/errors/errors";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { Skeleton } from "@heroui/skeleton";
import { Card, CardBody, CardHeader } from "@heroui/card";
import Image from "next/image";

/**
 * Компонент скелетона объявления
 * 
 * @returns React.ReactElement
 */
function AdvertSkeleton() {
    return (
        <Card className="h-full w-[160px] sm:w-[230px] flex flex-col animate-pulse">
            <div className="p-0 flex-shrink-0">
                <Skeleton className="w-full aspect-[4/3] bg-gray-300 rounded-t-lg"></Skeleton>
            </div>
            <div className="flex-grow p-3 space-y-3">
                <Skeleton className="h-6 bg-gray-300 rounded w-1/3"></Skeleton>
                <Skeleton className="h-5 bg-gray-300 rounded w-4/5"></Skeleton>
                <div className="space-y-2">
                    <Skeleton className="h-3 bg-gray-300 rounded"></Skeleton>
                    <Skeleton className="h-3 bg-gray-300 rounded"></Skeleton>
                    <Skeleton className="h-3 bg-gray-300 rounded"></Skeleton>
                    <Skeleton className="h-3 bg-gray-300 rounded"></Skeleton>
                </div>
            </div>
        </Card>
    );
}

/**
 * Компонент скелетона для списка объявлений
 * 
 * @returns React.ReactElement
 */
function AdvertsSkeletonGrid(): React.ReactElement {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
            {Array.from({ length: 20 }).map((_, index) => (
                <AdvertSkeleton key={index} />
            ))}
        </div>
    );
}

/**
 * Компонент для отображения списка объявлений каталога
 * 
 * @returns React.ReactElement
 */
export default function CatalogAdverts(): React.ReactElement | null {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [adverts, setAdverts] = useState<Advert[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [hasNextPage, setHasNextPage] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);
    const perPageCount = 20;
    const advertsNotFound = adverts.length === 0;

    const fetchAdverts = useCallback(async (pageNum: number, append: boolean = false) => {
        if (pageNum === 1) {
            setIsLoading(true);
        } else {
            setIsLoadingMore(true);
        }
        setError(null);

        try {
            const response = await CatalogApi.getAdverts(pageNum, perPageCount);

            if (append) {
                // Добавляем новые объявления к существующим
                setAdverts(prev => [...prev, ...response.data]);
            } else {
                // Заменяем объявления (для первой загрузки или сброса)
                setAdverts(response.data);
            }

            setHasNextPage(response.meta.to < response.meta.total);
            setIsFirstLoading(false);
        } catch (err) {
            const errorMessage = err instanceof ApiError ? err.message : "Не удалось загрузить объявления";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    }, []);

    const loadMoreAdverts = useCallback(() => {
        if (!isLoadingMore && hasNextPage) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchAdverts(nextPage, true);
        }
    }, [page, hasNextPage, isLoadingMore, fetchAdverts]);

    // Обработчик для кнопки "Загрузить еще"
    const handleLoadMore = () => {
        loadMoreAdverts();
    };

    // Эффект для загрузки объявлений при изменении страницы
    useEffect(() => {
        if (page === 1) {
            fetchAdverts(1, false);
        }
    }, [page, fetchAdverts]);

    // Эффект для бесконечной прокрутки
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isLoadingMore) {
                    loadMoreAdverts();
                }
            },
            {
                threshold: 0.1, // Срабатывает когда 10% элемента видно
                rootMargin: '100px' // Срабатывает за 100px до достижения элемента
            }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [loadMoreAdverts, hasNextPage, isLoadingMore]);

    if (error) {
        return (
            <div>
                <div>
                    <Alert color="danger">Ошибка: {error}</Alert>
                    <Button onPress={() => fetchAdverts(1, false)}>Повторить попытку</Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div>
                {/* Показываем скелетоны во время первой загрузки */}
                {isLoading && <AdvertsSkeletonGrid />}

                {/* Показываем контент когда загрузка завершена */}
                {!isLoading && adverts.length > 0 && (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                            {adverts.map((advert: Advert) => (
                                <Card key={advert.id} className="h-full w-[160px] sm:w-[230px] flex flex-col">
                                    <CardHeader className="p-0 overflow-hidden">
                                        <div className="w-full aspect-[4/3] relative overflow-hidden">
                                            <Image
                                                src={advert.main_image.url}
                                                alt={advert.title}
                                                width={230}
                                                height={173}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </CardHeader>
                                    <CardBody className="flex-grow">
                                        <div className="font-bold text-lg">{advert.price}р</div>
                                        <div className="font-bold text-sm" style={{ lineHeight: "1.2" }}>{advert.title}</div>
                                        <div className="text-sm mt-1 text-gray-500" style={{ lineHeight: "1.2", height: "80px", overflow: "hidden", textOverflow: "ellipsis" }}>{advert.description}</div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>

                        {/* Элемент для наблюдения за прокруткой */}
                        <div ref={observerTarget} className="h-10 flex justify-center items-center">
                            {isLoadingMore && (
                                <div className="flex gap-2">
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Кнопка "Загрузить еще" */}
                        {hasNextPage && !isLoadingMore && (
                            <div className="flex justify-center mt-6">
                                <Button
                                    onPress={handleLoadMore}
                                    color="primary"
                                    variant="flat"
                                    className="mx-auto"
                                >
                                    Загрузить еще
                                </Button>
                            </div>
                        )}
                    </>
                )}

                {advertsNotFound && !isFirstLoading && !isLoading && (
                    <div className="text-center py-8 text-gray-500">
                        Объявления не найдены
                    </div>
                )}
            </div>
        </>
    );
}