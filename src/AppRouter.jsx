import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Wrapper } from "./pages/Wrapper";
import { FormPage } from "./pages/FormPage";


export default function AppRouter(props) {
    return (
        <BrowserRouter>
            <Wrapper>
                <Routes>
                    <Route path="/" element={<FormPage {...props} />} />
                </Routes>
            </Wrapper>
        </BrowserRouter>
    );
}
