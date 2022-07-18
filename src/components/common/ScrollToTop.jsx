import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ToolTip from "./ToolTip";

const ScrollToTop = () => {
    const [showButton, setShowButton] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div className="relative">
            {showButton && (
                <>
                    <button
                        data-tip
                        data-for='addNote'
                        data-aos="fade-up"
                        className="fixed text-background bottom-16 right-20 z-10 bg-primary rounded-full px-[14px] py-1 text-3xl cursor-pointer"
                        onClick={goToTop}
                    >&#x2B;</button>
                    <ToolTip id='addNote' place='top' title='Add a New Note' />
                </>
            )}
        </div>
    );
};
export default ScrollToTop;