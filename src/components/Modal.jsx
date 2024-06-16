import {useEffect, useRef} from 'react';
import ReactDOM from 'react-dom'
import {LANGUAGES_CONFIG} from "../locales";
import {LinkCustom} from "./LinkCustom";
import {useSelector} from "react-redux";
import { ButtonCustom } from './ButtonCustom';

export const Modal = ({handleCloseModal, children, finishView, handleAction}) => {
    const {language} = useSelector(state => state.actionReducer)
    const MODAL_REF = useRef()

    useEffect(() => {
        const handleOutsideClick = (event) => {
            event.stopPropagation();
            const isClickInsideModal =
                MODAL_REF.current &&
                MODAL_REF.current !== event.target;
            if (!isClickInsideModal) {
                handleCloseModal();
            }
        };
        document
            .getElementById("root-modal")
            .addEventListener("click", handleOutsideClick);

        return () => {
            document
                .getElementById("root-modal")
                .removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return ReactDOM.createPortal(
        <div className="modal-container" ref={MODAL_REF}>
            <div className='modal-content-wrapper'>
                <div className='modal-content'>
                    <div className='modal-content-paragraph'>{children}</div>
                    <div className='modal-content-footer'>
                        {finishView ? <>
                        <div className='button-wrapper'><ButtonCustom onClick={handleAction} variant='outlined'>{LANGUAGES_CONFIG[language].BUTTONS.YES}</ButtonCustom></div>
                        
                        <div className='button-wrapper'><ButtonCustom onClick={handleCloseModal}>{LANGUAGES_CONFIG[language].BUTTONS.NO}</ButtonCustom></div>
                        </> : <LinkCustom onClick={handleCloseModal}>
                            {LANGUAGES_CONFIG[language].BUTTONS.BACK}
                        </LinkCustom>}
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("root-modal")
    )
}