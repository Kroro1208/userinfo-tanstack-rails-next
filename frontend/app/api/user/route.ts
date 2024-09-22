import api from "../route"

const endpoinsts = {
    getUsers: async () => {
        return await api('users')
    }
}

export default endpoinsts;