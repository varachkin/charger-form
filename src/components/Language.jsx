import { useSelector } from "react-redux"

export const Language = ()=> {
    const {language} = useSelector(state => state.actionReducer)
    return(
        <div>{language}</div>
    )
}