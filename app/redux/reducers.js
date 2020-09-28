import { LOADER_SET, TOAST_SET, USER_SET, ADDMEMBER_SET } from '../redux/actions';

export const loader = (state = false, action) => {
    switch (action.type) {
        case LOADER_SET:
            return action.state;
        default:
            return state;
    }
}

export const toast = (state = false, action) => {
    switch (action.type) {
        case TOAST_SET:
            return action.state;
        default:
            return state;
    }
}

export const user = (state = null, action) => {
    switch (action.type) {
        case USER_SET:
            return action.user;
        default:
            return state;
    }
}

export const addmember = (state = null, action) => {
    switch (action.type) {
        case ADDMEMBER_SET:
            return action.addmember;
        default:
            return state;
    }
}