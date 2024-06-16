import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { LANGUAGES_CONFIG } from '../locales';

export const NextSlideCard = () => {
    const { language } = useSelector(state => state.actionReducer)

    const subtitles = {
        rest: LANGUAGES_CONFIG[language].START_PAGE.REST_CARD_TITLE,
    }
    return (
        <Paper
            sx={{
                height: '30vh',
                border: '2px dashed #ABABAB',
                alignItems: 'center',
                backgroundColor: '#ffffff05'
            }}
            elevation={0}
            className='station-card-wrapper'
        >
            
            <div
                className='station-card-title next-slide-card'
            >
                {subtitles.rest}
            </div>

        </Paper>
    )
}