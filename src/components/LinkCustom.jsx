import {Link} from "@mui/material";
import { v4 as uuidv4 } from 'uuid';

export const LinkCustom = ({children, onClick, id = uuidv4()})=> {
    return(
        <Link
            id={id}
            component="button"
            className="link"
            fontSize='3.5vw'
            onClick={onClick}
        >
            {children}
        </Link>
    )
}