import { JURNY_LIST } from "../../actions/constants"

const initialState = {
    jurneyList: []
}
export default function reducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case JURNY_LIST: {
            return {
                ...state,
                jurneyList: payload,
            }
        }
        default: {
            return state
        }
    }
}