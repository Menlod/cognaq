import React from 'react';

export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-around w-full min-h-screen bg-cover bg-[url('./img/back2.jpg')]">
            <span className="loader">Загружаем</span>
        </div>
    )
}

