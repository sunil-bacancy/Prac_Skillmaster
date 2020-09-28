export const LOADER_SET = 'loader/SET';
export const TOAST_SET = 'toast/SET';
export const USER_SET = 'user/SET';
export const ADDMEMBER_SET = 'addmember/SET';

export const loaderSet = (state) => ({
    type: LOADER_SET,
    state
})

export const toastSet = (state) => ({
    type: TOAST_SET,
    state
})

export const setUser = (user) => ({
    type: USER_SET,
    user
})

export const setAddMember = (addmember) => ({
    type: ADDMEMBER_SET,
    addmember
})