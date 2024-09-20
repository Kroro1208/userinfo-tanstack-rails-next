import api from "../route"

const endpoinsts = {
    getUser: async () => {
        return await api('users')
    }
}

export default endpoinsts;