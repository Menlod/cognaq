'use client';

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import cap1 from "./img/cap1.jpg";
import cap2 from "./img/cap2.jpg";
import cap3 from "./img/cap3.jpg";
import cap4 from "./img/cap4.jpg";
import cap5 from "./img/cap5.jpg";
import cap6 from "./img/cap6.jpg";
import Loader from "@/app/components/loader";

export default function Home() {
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentImage, setCurrentImage] = useState(cap1);
    let timeout: any = null;

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
        }
    }

    const tapHandler = (e: any) => {
        setScore(a => a + 1);
        if (timeout === null) {
            timeout = setTimeout(() => {
                localStorage.setItem("score", String(score));
                timeout = null;
            }, 1000);
        }

    }

    useEffect(() => {
        setScore(score => Number(localStorage.getItem("score")) ?? 0);
        changeImageHandler(score);
        setTimeout(()=>{
            setLoading(false);
        }, 4000);
    }, []);

    useEffect(() => {
        changeImageHandler(score);
    }, [score]);

    return (
        <>
            {loading ? <Loader/>
                :
                <div
                    className="flex flex-col items-center justify-around w-full min-h-screen bg-cover bg-[url('./img/back1.jpg')]">
                    <div className="header flex justify-between w-full items-center p-4">
                        <div className="logo">Logo</div>
                        <div className="score font-bold caret-blue-500">{score}</div>
                    </div>
                    <div className="tapper flex justify-center items-center w-full" onClick={tapHandler}>
                        <div
                            className="tap-circle bg-clip-text w-3/5 rounded-full overflow-hidden p-2 bg-cyan-300 object-cover object-center">
                            <Image src={currentImage}
                                   alt="22132131"
                                   className="w-full rounded-full"
                                   width={300}
                                   height={300}
                            />
                        </div>
                    </div>
                    <div className="footer p-4">
                        Footer
                    </div>
                </div>
            }
        </>
    );
}
