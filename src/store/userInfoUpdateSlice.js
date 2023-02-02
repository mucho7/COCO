import { createSlice } from "@reduxjs/toolkit";
import { readUserInfo, updateUserInfo } from "../api/member"

const initialState = { 
    id: null,
    email: null,
    name: null, 
    since: null,

}

//
async function readUser(info) {
    await updateUserInfo(
        info,
        (data) => {
            console.log(data)
            readUserInfo
        }
    )
}

// redux에 저장된 정보를 토대로 서버의 데이터를 손질
async function updateUser(info) {
    await updateUserInfo(
        info,
        (data) => {
            console.log(data)
            readUserInfo
        }
    )
}

const updateUserSlice = createSlice({
    name: 'userInfoUpdate',
    initialState,
    reducers: {
        onEnterProfile: (state) => {
            readUser(state.id)
        },
        onUpdateSubmit: (state, action) => {
            state.id = action.payload.id
            state.email = action.payload.email
            state.name = action.payload.name
            state.since = action.payload.since
            updateUser(state)
        } 
    }
});

export default updateUserSlice;
export const { onEnterProfile, onUpdateSubmit} = updateUserSlice.actions;