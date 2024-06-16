import { useDispatch, useSelector } from "react-redux"
import { Logo } from "./Logo";
import { v4 as uuidv4 } from 'uuid';
import { changeLanguage } from "../features/actions/actionsSlice";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const { language, language_list } = useSelector(state => state.actionReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleChangeLanguage = (event) => {
        dispatch(changeLanguage(event.target.id))
    }

    const handleGoHome = () => {
        navigate('/')
    }
    return (
        <header className="header">
            <Logo handleGoHome={handleGoHome} />
            <div className="header-languages">
                <div>
                    {language_list?.map(lang => (
                        <span
                            key={uuidv4()}
                            id={lang}
                            className={`${language === lang ? 'active-lang' : ''}`}
                            onClick={handleChangeLanguage}
                        >
                            {lang?.toUpperCase()}
                        </span>
                    ))}
                </div>
            </div>
        </header>
    )
}