import { LANGUAGES_CONFIG } from "../locales";
import { Button } from "@mui/material";
import { Spinner } from "./Spinner";

export const ButtonCustom = ({ children, onClick, disabled, id, isLoading, variant='contained' }) => {
    return (
        <Button
            id={id}
            variant={variant}
            className={`button ${variant} ${isLoading || disabled ? 'disabled' : ''}`}
            // color="secondary"
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {isLoading ? <Spinner /> : children}
        </Button>
    )
}
