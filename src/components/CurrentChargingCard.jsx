import { Paper, Typography } from "@mui/material"
import { ButtonCustom } from "./ButtonCustom"
import { LANGUAGES_CONFIG } from "../locales"
import { useDispatch, useSelector } from "react-redux"
import { LoaderProgress } from "./LoaderProgress"
import { LinkCustom } from "./LinkCustom"
import { useEffect, useState } from "react"
import { Modal } from "./Modal"
import { InvoiceModal } from "./InvoiceModal"
// import { ReciptModal } from "./ReciptModal"
import { FinishModal } from "./FinishModal"
import { stationToCharging, stationToCompleate } from "../features/data/dataSlice"
import { ReciptModal } from "./ReciptModal"
import { useNavigate } from "react-router-dom"

export const CurrentChargingCard = ({ station }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { language } = useSelector(state => state.actionReducer);
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [modalContent, setModalContent] = useState(null)


    const handleOpenModal = (event) => {
        console.log(event.target.id)
        setModalContent(event.target.id)
        setIsOpenModal(true);
    }

    const handleCloseModal = () => {
        setIsOpenModal(false)
    }

    const handleReadyStation = () => {
        dispatch(stationToCompleate(station.id))
        setIsOpenModal(false)
    }

    const handleCompleate = ()=> {
        console.log('compleate')
        navigate('/raiting')
    }

    useEffect(() => {
        dispatch(stationToCharging(station.id))
    }, [])

    console.log('station', station)
    return (
        <>
            <Paper
                className="current-charging-card"
                elevation={6}
            >
                <div className="current-charging-card-header">
                    <div className="station-block">
                        <div className='station-card-number'>{station?.number}</div>
                        <div className='station-card-name'>{LANGUAGES_CONFIG[language].CARD.STATION}</div>
                    </div>
                    <div className={`icon-block ${station?.charger.type}`}>
                        <div className="icon-block-name">{station?.charger.name}</div>
                        <div className='connector-type-card-ico'></div>
                    </div>
                </div>
                <div className="current-charging-card-body">
                    {station.status === 'charging' ? <LoaderProgress full={5} /> : (
                        <div className="station-card-icon-wrapper">
                            <div className={`station-card-icon ${station.status}`}></div>
                        </div>)}

                        < h3 className="current-charging-card-description">
                    <span className="charging-card-description-block">{LANGUAGES_CONFIG[language].CHARGING_PAGE.TIME_PASSED}</span>
                    <span className="charging-card-description-block-bold">{'1 h 04 min'}</span>
                    {'|'}
                    <span className="charging-card-description-block">{LANGUAGES_CONFIG[language].CHARGING_PAGE.TIME_TO_FINISH}</span>
                    <span className="charging-card-description-block-bold">~ {' 34 min'}</span>
                </h3>
                <Typography
                    component='div'
                    className="current-charging-card-info"
                    sx={{ '& .MuiTypography-root': { fontSize: '3vw', padding: '1.5vw 2.5vw' } }}
                >
                    <div className="article-title">{LANGUAGES_CONFIG[language].CHARGING_PAGE.INFO_SUBTITLE}</div>
                    <div >
                        <div><LinkCustom id='_RECIPT' onClick={handleOpenModal}>{LANGUAGES_CONFIG[language].CHARGING_PAGE.INFO_LINK_RECIPT}</LinkCustom></div>
                        <div><LinkCustom id='_INVOICE' onClick={handleOpenModal}>{LANGUAGES_CONFIG[language].CHARGING_PAGE.INFO_LINK_INVOICE}</LinkCustom></div>
                    </div>
                </Typography>
            </div>
            <div className="current-charging-card-footer">
                {station.status === 'charging' ? 
                <ButtonCustom className='button' id='_FINISH' onClick={handleOpenModal}>{LANGUAGES_CONFIG[language].BUTTONS.FINISH_CHARGING}</ButtonCustom> : 
                <ButtonCustom className='button' onClick={handleCompleate}>{LANGUAGES_CONFIG[language].BUTTONS.COMPLEATE_CHARGING}</ButtonCustom>}
            </div>
        </Paper >
            { isOpenModal && <Modal handleCloseModal={handleCloseModal} finishView={modalContent === '_FINISH'} handleAction={handleReadyStation}>
                {modalContent === '_RECIPT' ? (<ReciptModal handleCloseModal={handleCloseModal}/>) :
                    modalContent === '_INVOICE' ? (<InvoiceModal />) :
                        modalContent === '_FINISH' ? (<FinishModal />) :
                            null
                }
            </Modal>
}
        </>

    )
}