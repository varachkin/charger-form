import {useSelector} from "react-redux"
import {LANGUAGES_CONFIG} from "../locales"
import {Footer} from "../components/Footer";
import {useRef, useState} from "react";
import {Modal} from "../components/Modal";
import {TextField} from "@mui/material";
import {ButtonCustom} from "../components/ButtonCustom";

export const FormPage = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const {language} = useSelector(state => state.actionReducer)
    const [form, setForm] = useState({
        email: '',
        firstName: '',
        lastName: '',
        company: '',
        nip: '',
        address: '',
        postcode: '',
        city: '',
    })

    const email = useRef();

    const handleOpenModal = () => {
        setIsOpenModal(true)
    }
    const handleCloseModal = () => {
        setIsOpenModal(false)
    }

    const handleChangeForm = (event)=> {
        const {id, value} = event.target
        setForm({...form, [id]: value})
    }

    const handleSubmit = ()=> {
        email.current.focus()
    }

    console.log(form)
    return (
        <>
            <div>
                <h1 className="title">{LANGUAGES_CONFIG[language].FORM.TITLE}</h1>
                <h3 className="subtitle">
                    {LANGUAGES_CONFIG[language].FORM.SUBTITLE_1}
                    {LANGUAGES_CONFIG[language].FORM.SUBTITLE_2}
                </h3>
                <h3 className='subtitle'>
                    <span>
                        {LANGUAGES_CONFIG[language].FORM.SUBTITLE_PRINCIPLES}
                        <a className='link'
                           onClick={handleOpenModal}>{LANGUAGES_CONFIG[language].FORM.SUBTITLE_PRINCIPLES_LINK}</a>
                    </span>
                </h3>
                <div className='page'>
                    <h3 className='subtitle start'>
                        <span className='bold'>{LANGUAGES_CONFIG[language].FORM.EMAIL_TITLE}</span>
                    </h3>
                    <div className='input-wrapper'>
                        <TextField
                            tabIndex={1}
                            variant='outlined'
                            fullWidth
                            id='email'
                            inputRef={email}
                            onChange={handleChangeForm}
                            value={form.email}
                            label={LANGUAGES_CONFIG[language].FORM.FIELD_EMAIL}
                        />
                    </div>

                </div>

                <div className='page'>
                    <h3 className='subtitle start'>
                        <span className='bold'>{LANGUAGES_CONFIG[language].FORM.DATA_TITLE}</span>
                    </h3>
                    <div className='input-wrapper'>
                        <TextField
                            tabIndex={2}
                            variant='outlined'
                            fullWidth
                            id='firstName'
                            onChange={handleChangeForm}
                            value={form.firstName}
                            label={LANGUAGES_CONFIG[language].FORM.FIELD_NAME}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <TextField
                            tabIndex={3}
                            variant='outlined'
                            fullWidth
                            id='lastName'
                            onChange={handleChangeForm}
                            value={form.lastName}
                            label={LANGUAGES_CONFIG[language].FORM.FIELD_LAST_NAME}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <TextField
                            tabIndex={4}
                            variant='outlined'
                            fullWidth
                            id='company'
                            onChange={handleChangeForm}
                            value={form.company}
                            label={LANGUAGES_CONFIG[language].FORM.FIELD_COMPANY}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <TextField
                            tabIndex={5}
                            variant='outlined'
                            fullWidth
                            id='nip'
                            onChange={handleChangeForm}
                            value={form.nip}
                            label={LANGUAGES_CONFIG[language].FORM.FIELD_NIP}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <TextField
                            tabIndex={6}
                            variant='outlined'
                            fullWidth
                            id='address'
                            onChange={handleChangeForm}
                            value={form.address}
                            label={LANGUAGES_CONFIG[language].FORM.FIELD_ADDRESS}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <TextField
                            tabIndex={7}
                            variant='outlined'
                            fullWidth
                            id='city'
                            onChange={handleChangeForm}
                            value={form.city}
                            label={LANGUAGES_CONFIG[language].FORM.FIELD_CITY}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <TextField
                            tabIndex={8}
                            variant='outlined'
                            fullWidth
                            id='postcode'
                            onChange={handleChangeForm}
                            value={form.postcode}
                            label={LANGUAGES_CONFIG[language].FORM.FIELD_ZIP}
                        />
                    </div>

                </div>

            </div>
            <Footer>
                <ButtonCustom onClick={handleSubmit}>{LANGUAGES_CONFIG[language].BUTTONS.SUBMIT_BUTTON}</ButtonCustom>
            </Footer>
            {isOpenModal && <Modal handleCloseModal={handleCloseModal}>
                <h1 className='title'>Title modal</h1>
                <div className='article'>
                    {LANGUAGES_CONFIG[language].MODAL.PARAGRAPH}
                </div>
            </Modal>}
        </>

    )
}