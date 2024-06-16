import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { LANGUAGES_CONFIG } from '../locales';
import { useEffect, useState } from 'react';

export const ChargingConnectorCard = ({ charger }) => {
    const { language } = useSelector(state => state.actionReducer)

    const content = {
        eco: LANGUAGES_CONFIG[language].CONNECTOR_TYPE_PAGE.ECO_TITLE,
        fast: LANGUAGES_CONFIG[language].CONNECTOR_TYPE_PAGE.FAST_TITLE,
    }

    return (
        <Paper sx={{
            height: '28vh',
            width: '100%',
            backgroundColor: '#E6E6E6',
            overflow: 'hidden',
            borderRadius: 3,
            position: 'relative',
            zIndex: 2,
        }}
            elevation={6}
        >
            <div className={`connector-type-card-header ${charger.type}`}>{content[charger.header]}</div>
            <div className={`connector-type-card ${charger.type}`}>
                <div className='connector-type-card-type'>{charger.name}</div>
                <div className='connector-type-card-ico-block'>
                    <div className='connector-type-card-ico'></div>
                    <div className='connector-type-card-ico-description'>
                      {LANGUAGES_CONFIG[language].CONNECTOR_TYPE_PAGE.TILL} {charger.maxValue} kW {charger.ac_dc}
                    </div>
                </div>
                <div className='connector-type-card-cost'>{charger.cost} {charger.currency} / kWh</div>  
            </div>

        </Paper>
    )
}