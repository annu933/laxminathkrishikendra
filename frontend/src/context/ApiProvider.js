import { ApiContext, axiosInstance } from "./ApiContext";

export default function ApiProvider({ children }) {
    return (
        <ApiContext.Provider value={axiosInstance}>
            {children}
        </ApiContext.Provider>
    )
}