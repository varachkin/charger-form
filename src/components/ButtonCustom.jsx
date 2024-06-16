import { LANGUAGES_CONFIG } from "../locales";
import { Button } from "@mui/material";

export const ButtonCustom = ({ children, onClick, disabled, id, variant='contained' }) => {
    return (
        <Button
            id={id}
            variant={variant}
            className={`button ${variant}`}
            // color="secondary"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </Button>
    )
}
