import {Outlet} from 'react-router-dom'
import {Button} from 'antd-mobile'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {getBillList} from '@/store/modules/billstore'

const Layout =()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getBillList())
    },[dispatch])
    return (
    
    <div>
        <Outlet/>
        我是layout
        {/*测试全局生效测试 */}
        <Button color="primary">测试全局</Button>
        <div className="purple">
            {/*测试局部 */}
            <Button color="primary">测试局部</Button>
        </div>
        </div>
)}

export default Layout