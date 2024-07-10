import { useDispatch, useSelector } from "react-redux"
import { LANGUAGES_CONFIG } from "../locales"
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import { TextField } from "@mui/material";
import { ButtonCustom } from "../components/ButtonCustom";
import { changeLanguage, setQueryParam } from "../features/actions/actionsSlice";
import { sendData } from "../API";


const RegExps = {
    regExp_email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    regExp_first_name: /[A-Za-z]/,
    regExp_last_name: /[A-Za-z]/,
    regExp_company: /[\s\S]/,
    regExp_nip: /^\d{12}$/,
    regExp_address: /[\s\S]/,
    regExp_postcode: /^\d{2}-\d{3}$/,
    regExp_city: /[\s\S]/,
}

export const FormPage = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [isFormSent, setIsFormSent] = useState(false);
    const { language, query_param } = useSelector(state => state.actionReducer)
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        email: '',
        first_name: '',
        last_name: '',
        company: '',
        nip: '',
        address: '',
        postcode: '',
        city: '',
    })

    const [formErrors, setFormErrors] = useState({
        email: null,
        first_name: null,
        last_name: null,
        company: null,
        nip: null,
        address: null,
        postcode: null,
        city: null,
    })

    const errorMessages = {
        require: LANGUAGES_CONFIG[language].FORM.NOTICE_REQUIRED,
        incorrect: LANGUAGES_CONFIG[language].FORM.NOTICE_INCORRECT,
    }

    function getQueryParams(url) {
        const queryStringWithoutQuestionMark = url.substring(1);
        return queryStringWithoutQuestionMark ? JSON.parse(decodeURIComponent(queryStringWithoutQuestionMark)) : null
    }

    const handleOpenModal = () => {
        setIsOpenModal(true)
    }
    const handleCloseModal = () => {
        setIsOpenModal(false)
    }

    const handleChangeForm = (event) => {
        const { id, value } = event.target
        if(id === 'postcode' && value?.length === 5){
            setForm(prev => ({ ...prev, postcode: value.slice(0, 2) + '-' + value.slice(2) }))
            setFormErrors(prev => ({ ...prev, [id]: null }))
        }else{
            setForm({ ...form, [id]: value })
            setFormErrors(prev => ({ ...prev, [id]: null }))
        }
        
    }

    const handleBlur = (event) => {
        console.log('blur')
        const { value } = event.target;
        if (value.length === 5 && /^\d+$/.test(value)) {
            setForm(prev => ({ ...prev, postcode: value.slice(0, 2) + '-' + value.slice(2) }))
        }
    }
    const handleValidateAll = () => {
        
        return Object.keys(form)
            .map((key, keys) => {
                if (!form[key] || !RegExps[`regExp_${key}`].test(form[key])) {
                    if (!form[key]) {
                        setFormErrors(prev => ({ ...prev, [key]: 'require' }))
                    } else if (!RegExps[`regExp_${key}`].test(form[key])) {
                        setFormErrors(prev => ({ ...prev, [key]: 'incorrect' }))
                    }
                    return key
                }
            })
            .filter(el => el !== undefined)
    }

    const handleValidate = (event) => {
        const { value, id } = event.target;
        console.log(value, id)
        if (id)
            if (!form[id] || !RegExps[`regExp_${id}`].test(form[id]) && id !== 'postcode') {
                if (!form[id]) {
                    setFormErrors(prev => ({ ...prev, [id]: 'require' }))
                } else if (!RegExps[`regExp_${id}`].test(form[id])) {
                    setFormErrors(prev => ({ ...prev, [id]: 'incorrect' }))
                }
            } else {
                if (id === 'postcode' && value.length === 5 && /^\d+$/.test(value)) {
                    setForm(prev => ({ ...prev, postcode: value.slice(0, 2) + '-' + value.slice(2) }))
                } else if (!form[id]) {
                    setFormErrors(prev => ({ ...prev, [id]: 'require' }))
                } else if (!RegExps[`regExp_${id}`].test(form[id])) {
                    setFormErrors(prev => ({ ...prev, [id]: 'incorrect' }))
                }
            }

    }

    const handleSubmit = () => {
        const hasError = handleValidateAll()
        
        if (!hasError.length) {
            setIsLoading(true)
            sendData(query_param.transactionID, form)
                .then(response => {
                    if (response) {
                        setIsFormSent(true)
                        console.log('SEND REQUEST')
                    } else {
                        console.log(response)

                    }
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(response => {
                    setIsLoading(false)
                })


        } else {
            console.log("THERE ARE ERRORS. IT'S IMPOSSIBLE TO SEND REQUEST")
        }
    }


    useEffect(() => {
        const query = getQueryParams(window.location.search)
        console.log(query)
        if (query) {
            if (query.language) {
                dispatch(changeLanguage(query.language))
            }
            dispatch(setQueryParam(query))
        }
    }, [])


    console.log(form)
    if (!query_param) {
        return (
            <div>
                <h1 className='title'>{LANGUAGES_CONFIG[language].ERROR.ERROR_TITLE}</h1>
                <h3 className="subtitle center">{LANGUAGES_CONFIG[language].ERROR.ERROR_SUBTITLE}</h3>
            </div>
        )
    }
    if (isFormSent) {
        return (
            <>
                <div>
                    <h1 className="title"> {LANGUAGES_CONFIG[language].FORM.TITLE_SUCCESS}</h1>
                    <h3 className="subtitle center">
                        {LANGUAGES_CONFIG[language].FORM.SUBTITLE_SUCCESS_1} <span className="bold">{form.email}</span>
                    </h3>
                    <h3 className="subtitle center">
                        {LANGUAGES_CONFIG[language].FORM.SUBTITLE_SUCCESS_2}
                    </h3>
                </div>

            </>
        )
    }
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
                            onChange={handleChangeForm}
                            onBlur={handleValidate}
                            value={form.email}
                            label={LANGUAGES_CONFIG[language].FORM.FIELD_EMAIL}
                            error={!!formErrors.email}
                            helperText={errorMessages[formErrors.email]}
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
                            id='first_name'
                            onChange={handleChangeForm}
                            onBlur={handleValidate}
                            value={form.first_name}
                            label={LANGUAGES_CONFIG[language].FORM.FIELD_NAME}
                            error={!!formErrors.first_name}
                            helperText={errorMessages[formErrors.first_name]}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <TextField
                            tabIndex={3}
                            variant='outlined'
                            fullWidth
                            id='last_name'
                            onChange={handleChangeForm}
                            onBlur={handleValidate}
                            value={form.last_name}
                            label={LANGUAGES_CONFIG[language].FORM.FIELD_LAST_NAME}
                            error={!!formErrors.last_name}
                            helperText={errorMessages[formErrors.last_name]}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <TextField
                            tabIndex={4}
                            variant='outlined'
                            fullWidth
                            id='company'
                            onChange={handleChangeForm}
                            onBlur={handleValidate}
                            value={form.company}
                            label={LANGUAGES_CONFIG[language].FORM.FIELD_COMPANY}
                            error={!!formErrors.company}
                            helperText={errorMessages[formErrors.company]}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <TextField
                            tabIndex={5}
                            variant='outlined'
                            fullWidth
                            id='nip'
                            onChange={handleChangeForm}
                            onBlur={handleValidate}
                            value={form.nip}
                            label={LANGUAGES_CONFIG[language].FORM.FIELD_NIP}
                            error={!!formErrors.nip}
                            helperText={errorMessages[formErrors.nip]}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <TextField
                            tabIndex={6}
                            variant='outlined'
                            fullWidth
                            id='address'
                            onChange={handleChangeForm}
                            onBlur={handleValidate}
                            value={form.address}
                            label={LANGUAGES_CONFIG[language].FORM.FIELD_ADDRESS}
                            error={!!formErrors.address}
                            helperText={errorMessages[formErrors.address]}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <TextField
                            tabIndex={7}
                            variant='outlined'
                            fullWidth
                            id='city'
                            onChange={handleChangeForm}
                            onBlur={handleValidate}
                            value={form.city}
                            label={LANGUAGES_CONFIG[language].FORM.FIELD_CITY}
                            error={!!formErrors.city}
                            helperText={errorMessages[formErrors.city]}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <TextField
                            tabIndex={8}
                            variant='outlined'
                            fullWidth
                            id='postcode'
                            onChange={handleChangeForm}
                        
                            onBlur={handleBlur}
                            value={form.postcode}
                            label={LANGUAGES_CONFIG[language].FORM.FIELD_ZIP}
                            error={!!formErrors.postcode}
                            helperText={errorMessages[formErrors.postcode]}
                        />
                    </div>
                </div>
            </div>
            <Footer>
                <ButtonCustom
                    onClick={handleSubmit}
                    disabled={isLoading}
                    isLoading={isLoading}
                >
                    {LANGUAGES_CONFIG[language].BUTTONS.SUBMIT_BUTTON}
                </ButtonCustom>
            </Footer>
            {isOpenModal && <Modal handleCloseModal={handleCloseModal}>
                <h1 className='title'>{LANGUAGES_CONFIG[language].MODAL.PRIVACY_POLICY_TITLE}</h1>
                <div className='article'>
                    {LANGUAGES_CONFIG[language].MODAL.PARAGRAPH}
                </div>
            </Modal>}
        </>

    )
}