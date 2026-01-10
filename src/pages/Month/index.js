import { NavBar, DatePicker } from 'antd-mobile';
import { useState, useEffect } from "react"
import './index.scss';
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import _ from 'lodash'
import Daybill from './components/DayBill'

const Month = () => {
  //按月做数据分组
  const billList = useSelector(state => state.bill.billList)//从Redux中拿数据
  const monthGroup = useMemo(() => {//数据二次处理
    //return出去计算之后的值
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
  }, [billList])

  console.log(monthGroup)


  //控制弹框的打开和关闭
  const [dateVisible, setDateVisible] = useState(false)

  //控制时间显示
  const [currentDate, setCurrentDate] = useState(() => {
    //默认显示有数据的第一个月份
    return '2023-03'
  })


  const [currentMonthList, setCurrentMonthList] = useState([])

  const monthResult = useMemo(() => {
    //支出  / 收入 /结余
    const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
    const income = currentMonthList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
    return {
      pay,
      income,
      total: pay + income
    }
  }, [currentMonthList])

  console.log('当前月份:', currentDate)
  console.log('当前月份数据列表:', currentMonthList)
  console.log('当前月份数据长度:', currentMonthList.length)

  //初始化的时候把当前月的统计数据显示出来
  useEffect(() => {
    //获取所有可用的月份
    const availableMonths = Object.keys(monthGroup)
    if (availableMonths.length > 0) {
      //默认显示第一个有数据的月份
      const firstMonth = availableMonths[0]
      setCurrentDate(firstMonth)
      setCurrentMonthList(monthGroup[firstMonth])
    }
  }, [monthGroup])

  //确认回调
  const onConfirm = (date) => {
    setDateVisible(false)
    //其它逻辑
    console.log(date)
    const formatDate = dayjs(date).format('YYYY-MM')
    console.log('选中的月份:', formatDate)
    console.log('该月的数据:', monthGroup[formatDate])
    //如果该月没有数据，设置为空数组
    setCurrentMonthList(monthGroup[formatDate] || [])
    setCurrentDate(formatDate)
  }

  //当前月按照日来分组
  const dayGroup = useMemo(() => {
    //return出去计算之后的值
    const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
    const keys = Object.keys(groupData)
    console.log('currentMonthList:', currentMonthList)
    console.log('dayGroup:', { groupData, keys })
    return {
      groupData,
      keys
    }
  }, [currentMonthList])

  return (
    <div className='monthlyBill'>
      <NavBar className='nav' backArrow={false}>
        月度收支
      </NavBar>
      <div className='content' >
        <div className='header' >
          <div className='date' onClick={() => setDateVisible(true)} >
            <span className='text'>
              {currentDate + ' '}月账单
            </span>
            {/*思路：根据当前弹框打开的状态控制expand类名是否存在 */}
            <span className={classNames('arrow', dateVisible && 'expand')}></span>
          </div>
          {/*统计区域 */}
          <div className='twoLineOverview'>
            <div className='item'>
              <span className='money'>{monthResult.pay.toFixed(2)}</span>
              <span className='type'>支出</span>
            </div>
            <div className='item'>
              <span className='money'>{monthResult.income.toFixed(2)}</span>
              <span className='type'>收入</span>
            </div>
            <div className='item'>
              <span className='money'>{monthResult.total.toFixed(2)}</span>
              <span className='type'>结余</span>
            </div>
          </div>
          {/*时间选择器 */}
          <DatePicker
            className='kaDate'
            title='记账日期'
            precision='month'
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onConfirm={onConfirm}
            onClose={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>

        {/*单日列表统计 */}
        <div className='dailyList'>
          {
            dayGroup.keys.length > 0 ? (
              dayGroup.keys.map(key => {
                return <Daybill key={key} date={key} billList={dayGroup.groupData[key]} />
              })
            ) : (
              <div className='noData'>
                <p>该月暂无账单数据</p>
              </div>
            )
          }
        </div>


      </div>
    </div >
  )
}
export default Month;