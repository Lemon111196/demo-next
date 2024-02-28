import { Provider } from "react-redux";
import { store } from "../store/store";

import Homepage from "./page";

function AppWrapper() {
    return (
        <Provider store={store}>
           <Homepage></Homepage>
        </Provider >
    )
}
export default AppWrapper