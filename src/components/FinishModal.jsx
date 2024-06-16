import { useSelector } from "react-redux"
import { LANGUAGES_CONFIG } from "../locales"

export const FinishModal = () => {
    const { language } = useSelector(state => state.actionReducer)
    return (
        <div>
            <h1 className="title">{LANGUAGES_CONFIG[language].MODAL_CONTENT.TITLE_FINISH}</h1>
            <h4 className="subtitle">{LANGUAGES_CONFIG[language].MODAL_CONTENT.SUBTITLE_FINISH} <span className="bold">14.25 zl </span></h4>
            <h4 className="subtitle start"><span className="bold">{LANGUAGES_CONFIG[language].MODAL_CONTENT.SUBTITLE_SECOND_FINISH}</span></h4>


        </div>
    )
}