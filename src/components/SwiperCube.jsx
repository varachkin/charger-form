import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { EffectCube, Pagination, FreeMode, Autoplay } from 'swiper/modules';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { ChargingStationCard } from './ChargingStationCard';
import { NextSlideCard } from './NextSlideCard';

export default function SwiperCube({ stations = [], handleOpenModal, autoplay, handleGoToPreparingCharge }) {
    const [view, setView] = useState(2)
    const [activeSlide, setActiveSlide] = useState()
    const { devMode } = useSelector(state => state.actionReducer)
    const swiper = useSwiper()
    const swiperRef = useRef()

    function chunkArray(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }
    const autoplayConfig = autoplay ? {
        delay: 6000,
        disableOnInteraction: false,
    } : false;

    const chunkedArray = chunkArray(stations, 3);
console.log(swiperRef)
    return (
        <>
            <Swiper
                ref={swiperRef}
                effect={'cube'}
                grabCursor={false}
                // loop={true}
                cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 200,
                    shadowScale: 0.94,
                }}
                autoplay={autoplayConfig}
                speed={1000}
                pagination={{ clickable: true }}
                modules={[EffectCube, Pagination, FreeMode, Autoplay]}
                className="swiper-cube"
            >
                {chunkedArray.length ? (
                    chunkedArray.map((slide, i) => {
                        const isSingle = slide.length === 1;
                        const isDouble = slide.length === 2;
                        return <SwiperSlide
                            key={uuidv4()}
                            virtualIndex={i}
                            style={{ backfaceVisibility: devMode ? 'visible' : 'hidden' }}
                            className={`${isSingle ? 'single' : ''}${isDouble ? 'double' : ''}`}
                        >
                            {i === 0 ? (<>
                                   
                                    {slide.map((station, index, array) => {
                                        return <ChargingStationCard key={uuidv4()} item={station} handleGoToPreparingCharge={handleGoToPreparingCharge}/>
                                    })}
                                     < NextSlideCard />
                            </>) : (
                                <>
                                    < NextSlideCard />
                                    {slide.map((station, index, array) => {
                                        return <ChargingStationCard key={uuidv4()} item={station} handleGoToPreparingCharge={handleGoToPreparingCharge}/>
                                    })
                                    }
                                </>
                            )}
                        </SwiperSlide>
                    })
                ) : (
                    <SwiperSlide>
                        <div className='loader-wrapper'>
                            {/* <Loader size={18} /> */}
                        </div>
                    </SwiperSlide>
                )
                }
            </Swiper>
        </>

    );
}
