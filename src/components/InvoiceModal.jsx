import { useSelector } from "react-redux"
import { LANGUAGES_CONFIG } from "../locales"
import QRCode from "react-qr-code";

export const InvoiceModal = () => {
    const { language } = useSelector(state => state.actionReducer)
    return (
        <div>
            <h1 className="title">{LANGUAGES_CONFIG[language].MODAL_CONTENT.TITLE_INVOICE}</h1>
            <h3 className="subtitle">{LANGUAGES_CONFIG[language].MODAL_CONTENT.SUBTITLE_INVOICE}</h3>

            <div className="qr-wrapper">
                <QRCode
                    value="https://www.npmjs.com/package/react-qr-code"
                    style={{ height: "auto", maxWidth: "100%", width: "100%", margin: '10vw' }}
                />

            </div>


        </div>
    )
}