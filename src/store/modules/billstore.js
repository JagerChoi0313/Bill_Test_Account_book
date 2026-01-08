//账单列表相关store

import {createSlice} from '@reduxjs/toolkit'

const billStore= createSlice({
    //数据状态state
    initialState:{
        billList:[]
    },
    reducers:{
        //同步修改方法
        setBillList(state,action){
            state.billList=action.payload
        }
    }
})

//解构actionCreater函数
const {setBillList} = billStore.actions

//导出reducer
const reducer =billStore.reducer

export default reducer