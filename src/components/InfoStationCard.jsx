import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { Loader } from './Loader';
import { LANGUAGES_CONFIG } from '../locales';

export const InfoStationCard = ({ item }) => {
    const { language } = useSelector(state => state.actionReducer)
    return (
        <Paper sx={{ height: '30vh', backgroundColor: '#00000000' }}  elevation={0} className='station-card-wrapper'>
            <div className='station-card-title'> {LANGUAGES_CONFIG[language].START_PAGE.CARD_INFO_TITLE}</div>
            <div className='station-card-icon-wrapper'>
                <div className='station-card-icon plug'></div>
            </div>
            <div
                className='station-card-title'
            >
                {LANGUAGES_CONFIG[language].START_PAGE.CARD_INFO_SUBTITLE}
            </div>

        </Paper>
    )
}