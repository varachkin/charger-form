export const Logo = ({handleGoHome}) => {
    return (
        <div className="header-logo-wrapper" onClick={handleGoHome}>
            <div className="header-logo"></div>
        </div>

    )
}