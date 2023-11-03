import { createContext, useState } from "react"
import Children from "../types/childer"

interface AuthContextTypes {
 isAuthenticated: boolean;
 user: null;
}


export const AuthContext = createContext({} as AuthContextTypes)

const AuthContextProvider = ({children}: Children) => {
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [user, setUser] = useState(null)


    const store = {isAuthenticated,user, setUser, setisAuthenticated}
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}

export default AuthContextProvider