import { Header } from "../components/Header"

export const Wrapper = ({ children }) => {
    return (
        <>
            <Header />
            <main className="main">
                {children}
            </main>
        </>
    )
}