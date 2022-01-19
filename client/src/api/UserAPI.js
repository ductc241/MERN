import { useState, useEffect } from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if(token){
            const getUser = async () => {
                try {
                    const res = await axios.get('http://localhost:5000/user/infor', {
                        headers: {Authorization: token}
                    })

                    console.log(res)
                } catch (error) {
                    alert(error.response.massage)
                }
            }
        }
    }, [token])

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin]
    }
}


export default UserAPI