'use client';

import Image from "next/image";
import {useEffect, useState} from "react";
import cap1 from "./img/cap1.jpg";
import cap2 from "./img/cap2.jpg";
import cap3 from "./img/cap3.jpg";
import cap4 from "./img/cap4.jpg";
import cap5 from "./img/cap5.jpg";
import cap6 from "./img/cap6.jpg";
import Loader from "@/app/components/Loader";
import {formatScore} from "@/app/utils";
import WebApp from "@twa-dev/sdk";

interface UserData {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code: string;
    is_premium: boolean;
}

export default function Home() {
    const [score, setScore] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentImage, setCurrentImage] = useState(cap1);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [debugState, setDebugState] = useState<boolean>(true);
    //let timeout: any = null;
    let autoTimeout: any = null;

    const TAP_BOOSTER: number = 1;

    const changeImageHandler = (score: number) => {
        if (score < 10) {
            setCurrentImage(cap1);
        } else if (score < 20) {
            setCurrentImage(cap2);
        } else if (score < 30) {
            setCurrentImage(cap3);
        } else if (score < 40) {
            setCurrentImage(cap4);
        } else if (score < 50) {
            setCurrentImage(cap5);
        } else if (score < 60) {
            setCurrentImage(cap6);
        } else {
            setCurrentImage(cap6);
        }
    }

    const tapHandler = () => {
        setScore(val => val + TAP_BOOSTER);
        //if (timeout === null) {
        // timeout = setTimeout(() => {
        localStorage.setItem("score", String(score));
        //timeout = null;
        //  }, 300);
        //}
    }

    const setScoreHandler = (value: number) => {
        localStorage.setItem("score", String(score));
        setScore(value);
    }

    const setDebugHandler = () => {
        setDebugState(val => !val);
    }

    const autoTapHandler = () => {
        autoTimeout = setTimeout(() => {
            tapHandler();
            autoTapHandler();
            console.log('TAP')
        }, 1000);
    }

    useEffect(() => {
        setScore(Number(localStorage.getItem("score")) ?? 0);
        changeImageHandler(score);
        setTimeout(() => {
            setLoading(false);
            WebApp.expand();
            WebApp.disableVerticalSwipes();
            clearTimeout(autoTimeout);
            autoTapHandler();
            console.log('READY =>>>>>>>>>>>>>>>>>>')
        }, 1000);
    }, []);

    useEffect(() => {
        changeImageHandler(score);
    }, [score]);

    useEffect(() => {
        if (WebApp.initDataUnsafe.user) {
            setUserData(WebApp.initDataUnsafe.user as UserData)
        }
    }, [])

    return (
        <>
            {loading ? <Loader/>
                :
                <div
                    className="flex flex-col items-center justify-around w-full min-h-screen bg-cover bg-[url('./img/back1.jpg')]">
                    <div className="header flex justify-between w-full items-center p-4">
                        <div className="logo">Version 0.0.1</div>

                        <div className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path
                                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">{formatScore(score)}</p>
                        </div>
                    </div>

                    <div className="tapper flex justify-center items-center w-full" onTouchEnd={tapHandler}>
                        <div
                            className="tap-circle bg-clip-text w-1/5 rounded-full overflow-hidden p-2 bg-cyan-300 object-cover object-center">
                            <Image src={currentImage}
                                   alt="22132131"
                                   className="w-full rounded-full"
                                   width={500}
                                   height={500}
                            />
                        </div>
                    </div>
                    {userData && debugState &&
                        <div className="debug">
                            <ul>
                                <li><strong>ID: </strong>{userData.id}</li>
                                <li><strong>First Name: </strong>{userData.first_name}</li>
                                <li><strong>Last Name: </strong>{userData.last_name}</li>
                                <li><strong>UserName: </strong>{userData.username}</li>
                                <li><strong>LangCode: </strong>{userData.language_code}</li>
                                <li><strong>Is_premium: </strong>{userData.is_premium}</li>
                            </ul>
                        </div>
                    }
                    <div className="footer p-4">
                        <button type="button"
                                onClick={() => setScoreHandler(0)}
                                className="m-1 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            R
                        </button>

                        <button type="button"
                                onClick={() => setDebugHandler()}
                                className="m-1 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            D
                        </button>

                        <button type="button"
                                onClick={() => setScoreHandler(2000)}
                                className="m-1 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            2K
                        </button>

                        <button type="button"
                                onClick={() => setScoreHandler(2000000)}
                                className="m-1 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            2M
                        </button>

                        <button type="button"
                                onClick={() => setScoreHandler(2000000000)}
                                className="m-1 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            2B
                        </button>


                    </div>
                </div>
            }
        </>
    );
}
