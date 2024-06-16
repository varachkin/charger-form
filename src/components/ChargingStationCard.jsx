import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { Loader } from './Loader';
import { LANGUAGES_CONFIG } from '../locales';
import { useEffect, useState } from 'react';

export const ChargingStationCard = ({ item, handleGoToPreparingCharge=()=>{} }) => {
    const [isError, setIsError] = useState(false)
    const [isAvailable, setIsAvailable] = useState(true)
    useEffect(() => {
        item.status === 'error' && setIsError(true)
        item.status !== 'not_available' && setIsAvailable(false)
    })
    const { language } = useSelector(state => state.actionReducer)

    const subtitles = {
        compleated: LANGUAGES_CONFIG[language].START_PAGE.CARD_READY,
        charging: LANGUAGES_CONFIG[language].START_PAGE.CARD_CHARGING,
        success: LANGUAGES_CONFIG[language].START_PAGE.CARD_SUCCESS,
        not_available: LANGUAGES_CONFIG[language].START_PAGE.CARD_NOT_AVAILABLE,
        error: LANGUAGES_CONFIG[language].START_PAGE.CARD_ERROR
    }
    return (
        <div onClick={()=> handleGoToPreparingCharge(item.id)}>
            <Paper
                sx={{
                    height: '30vh',
                    backgroundColor: isError ? '#FFDAD6' : 'inherit',
                    border: isAvailable ? '2px dashed #ABABAB' : 'inherit',
                    opacity: !isAvailable ? 1 : 0.7,
                }}
                elevation={isAvailable ? 0 : 6}
                className='station-card-wrapper'
            >
                <div className='station-card-number'>{item.id}</div>
                <div className='station-card-name'>{LANGUAGES_CONFIG[language].CARD.STATION}</div>
                <div className='station-card-icon-wrapper'>
                    <div className={`station-card-icon ${item.status}`}></div>
                </div>
                <div
                    className='station-card-title'
                >
                    {subtitles[item.status]}
                </div>

            </Paper>
        </div>
    )
}