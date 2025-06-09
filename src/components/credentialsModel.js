const KEY = 'crendentials'

const setUser = (p) => {
    if (p) {
        localStorage.setItem(KEY, JSON.stringify(p))
        localStorage.setItem("EmailID", p.email)
        localStorage.setItem("headertoken", p.access_token)
        localStorage.setItem("userID", p.id)
        localStorage.setItem("name", p.firstName)
    } else {
        localStorage.removeItem(KEY)
    }
}



const getUser = () => {
    let value = ''
    let user = localStorage.getItem(KEY)
    if (user) value = JSON.parse(user)
    return value
}

const crendentialModel = {
    setUser, getUser
};

export default crendentialModel;
