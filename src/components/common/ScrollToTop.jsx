import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ToolTip from "./ToolTip";

const ScrollToTop = ({ goToTop }) => {
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
                        // className="btn fixed bottom-16 right-20 text-background z-10 bg-primary rounded-full px-[14px] py-1 text-3xl cursor-pointer"
                        className="btn fixed bottom-16 -right-6 z-10 text-background"
                        onClick={goToTop}
                    ><span class="circle">
                            <span class="icon arrow text-4xl">+</span>
                        </span>
                        <span class="button-text -mx-4">Add a note</span></button>
                    <ToolTip id='addNote' place='top' title='Add a New Note' />
                </>
            )}
        </div>
    );
};
export default ScrollToTop;