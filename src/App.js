import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Model from "./pages/Model";
import PublicSale from "./pages/PublicSale";
import PreSale from "./pages/PreSale";
import {preLoadImageList} from "./pre-load-image-list";
import {useEffect, useState} from "react";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        cacheImages();
    }, []);

    const cacheImages = async () => {
        const promises = preLoadImageList.map((src) => {
            return new Promise(async (resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = reject;
            });
        });

        await Promise.all(promises);
        setIsLoading(false);
    };

    const renderLoader = () => {
        return (
            <div className="loader-container">
                <video
                    src="videos/loading.mp4"
                    className="loader"
                    autoPlay
                    loop
                    playsInline
                    muted
                ></video>
            </div>
        );
    };

    const renderMainContent = () => {
        return (
            <Routes>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="model" element={<Model />} />
                <Route path="pre-sale" element={<PreSale />} />
                <Route path="public-sale" element={<PublicSale />} />
            </Routes>
        );
    };

    return isLoading ? renderLoader() : renderMainContent();
}
