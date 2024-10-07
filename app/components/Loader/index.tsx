import React from 'react';
import Image from "next/image";
import animateUrl from '../../img/drink.gif'
export default function Loader() {
    return (
        // <div
        //     className="flex flex-col items-center justify-around w-full min-h-screen bg-cover bg-[url('./img/back2.jpg')]">
        //     <span className="loader">Загружаем</span>
        // </div>

        <div
            className="flex flex-col items-center justify-around w-full min-h-screen bg-cover bg-[#9575cd]">
            <Image
                src={animateUrl}
                width={500}
                height={500}
                alt="22132131"
            />
            <span className="loader">Разливаем...</span>
        </div>
    )
}

