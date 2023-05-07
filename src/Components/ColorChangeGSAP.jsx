import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Scrollbar from 'smooth-scrollbar';

gsap.registerPlugin(ScrollTrigger);


function ColorChangeGSAP() {

    useEffect(() => {
        const scrollBar = Scrollbar.init(document.querySelector('.main'), {
           damping: 0.06,   //interia we want
            alwaysShowTracks: false, //scrolbar is hidden
            speed: 3, //speed we want
            delegateTo: document,
        });
        // If we don't tell ScrollTrigger which one is our scroller, Then it takes our body as defult

        ScrollTrigger.defaults({

            scroller: '.main', //we use our main
        });
        
        ScrollTrigger.scrollerProxy('.main', {
            scrollTop(value) {
                if (arguments.length) {
                    scrollBar.scrollTop = value;
                }
                return scrollBar.scrollTop;
            },
        });

        scrollBar.addListener(ScrollTrigger.update); //update scollTrigger everytime we move scrollBar 


        const sectionColor = document.querySelectorAll('[data-bgcolor]');

        // Loop 
        sectionColor.forEach((colorSection, i) => {

            const prevBgColor = i === 0 ? '' : sectionColor[i - 1].dataset.bgcolor;
            const prevTextColor =  i === 0 ? '' : sectionColor[i - 1].dataset.textcolor;

            // For using the upper values
            ScrollTrigger.create({
                trigger: colorSection,
                scroller: '.main',
                start: 'top 50%',
                onEnter: () =>
                    gsap.to('.main', {
                        backgroundColor: colorSection.dataset.bgcolor,
                        color: colorSection.dataset.textcolor,
                        overwrite: 'auto',
                    }),
                onLeaveBack: () =>
                    gsap.to('.main', {
                        backgroundColor: prevBgColor,
                        color: prevTextColor,
                        overwrite: 'auto',
                    }),
            });
        });

        return () => { };
    }, []);

    return (
        <div className="main h-screen w-full flex flex-col overflow-auto lg:text-left text-center">
            <header className='section' data-bgcolor="#070707" data-textcolor="#ffffff">
                <div className="w-full h-[70vh] ">
                    <h1 className='sm:text-[10rem] text-[3rem] py-40 lg:px-24 px-4'>Scroll To Change, Background Color 👀</h1>
                </div>
            </header>
            <section className='section' data-bgcolor="#3b2525" data-textcolor="#d0b6c0">
                <div className="w-full md:flex  items-center ">
                    <h2>In nature, nothing is perfect and everything is perfect. Trees can be contorted, bent in weird ways, and they're still beautiful.</h2>
                    <img width="500" height="300" src="./images/image.jpg" alt="" />
                </div>
            </section>
            <section className='section' data-bgcolor="#3b3825" data-textcolor="#c2c1b3">
                <div className="w-full md:flex items-center ">
                    <img width="500" height="400" src="./images/image2.jpg" alt="" />
                    <h2>Look deep into Yourself , and then you will understand everything better.</h2>
                </div>
            </section>
            <section className='section' data-bgcolor="#032F35" data-textcolor="#b3c2ba">
                <div className="w-full md:flex items-center">
                    <h2>The best thing one can do when it's raining is to let it rain.</h2>
                    <img width="500" height="400" src="./images/image3.jpg" alt="" />
                </div>
            </section>
            <footer className='section' data-bgcolor="#070707" data-textcolor="#ffffff">
                <div className="w-full h-[70vh] ">
                    <h1 className='sm:text-[10rem] text-[3rem] py-40 lg:px-24 px-4'>All you like is here 😋</h1>
                </div>
            </footer>
        </div>


    )
}

export default ColorChangeGSAP
