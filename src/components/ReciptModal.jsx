import { useSelector } from "react-redux"
import { LANGUAGES_CONFIG } from "../locales"
import { InputWithKeyboard } from "./InputWithKeyboard"
import { ButtonCustom } from "./ButtonCustom"
import { useState } from "react"

export const ReciptModal = ({handleCloseModal}) => {
    const { language } = useSelector(state => state.actionReducer)
    const [email, setEmail] = useState('')
    const [isError, setIsError] = useState(false)
    const INPUT_ID = '_email';

    const handleChangeEmail = (value) => {
        setIsError(false)
        setEmail(value[INPUT_ID])
    }

    const handleSubmit = ()=> {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (email && !emailRegex.test(email)) {
                setIsError(true)
            } else {
                setIsError(false)
                handleCloseModal();
            }
    }

    return (
        <div>
            <h1 className="title">{LANGUAGES_CONFIG[language].MODAL_CONTENT.TITLE_EMAIL}</h1>
            <article className='modal-article'>
                <span className='modal-article-title'>{LANGUAGES_CONFIG[language].MODAL_CONTENT.ARTICLE_EMAIL_BOLD}</span>
                <span className='modal-article-description'>{LANGUAGES_CONFIG[language].MODAL_CONTENT.ARTICLE_EMAIL_REGULAR}</span>
            </article>
            <article className='modal-article'>
                <InputWithKeyboard
                    label={LANGUAGES_CONFIG[language].MODAL_CONTENT.TITLE_EMAIL}
                    placeholder={LANGUAGES_CONFIG[language].MODAL_CONTENT.TITLE_EMAIL}
                    id={INPUT_ID}
                    getValue={handleChangeEmail}
                    error={isError}
                />
            </article>

            <ButtonCustom onClick={handleSubmit}>{LANGUAGES_CONFIG[language].BUTTONS.SUBMIT}</ButtonCustom>

        </div>
    )
}