'use client';

import { useGlobalStore } from "@/stores/global";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Card, CardHeader, CardFooter } from "@heroui/card";
import { useEffect, useState } from "react";
import { ArrowRightStartOnRectangleIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

export default function ProfileInline(): React.ReactElement | null {
    const { user, setIsShowLoginModal, setIsShowLogoutModal } = useGlobalStore()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [user]);

    if (isLoading) return null;

    return (
        <>
            {!user && (
                <>
                    <Button
                        color="primary"
                        onPress={() => setIsShowLoginModal(true)}
                        startContent={<ArrowRightEndOnRectangleIcon className="w-5 h-5" />}
                    >
                        Войти
                    </Button>
                </>
            )}
            {user && (
                <Card className="w-[300px] sm:w-[460px]">
                    <CardHeader className="flex gap-4 items-start sm:items-center">
                        <Avatar src={user.avatar?.url} name={user.name} />
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div>
                                <div className="text-sm text-default-500">Пользователь</div>
                                <div className="text-sm md:text-base">{user.name}</div>
                            </div>
                            <div>
                                <div className="text-sm text-default-500">Email</div>
                                <div className="text-sm md:text-base">{user.email}</div>
                            </div>
                            <div>
                                <div className="text-sm text-default-500">Баланс</div>
                                <div className="text-sm md:text-base">{user.balance}р</div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardFooter>
                        <Button
                            onPress={() => setIsShowLogoutModal(true)}
                            className="w-full"
                            startContent={<ArrowRightStartOnRectangleIcon className="w-5 h-5" />}
                        >
                            Выйти
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </>
    );
}