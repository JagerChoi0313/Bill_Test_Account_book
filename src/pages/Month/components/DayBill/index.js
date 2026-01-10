import './index.scss'
import classNames from 'classnames'
import { useMemo } from 'react'
import { billTypeToName } from '@/contants/index'
import { useState } from 'react'
import Icon from '@/components/Icon'


const Daybill = ({ date, billList }) => {
  console.log('Daybill props:', { date, billList })
  const dayResult = useMemo(() => {
    const pay = billList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
    const income = billList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
    return {
      pay,
      income,
      total: pay + income
    }
  }, [billList])
  console.log('dayResult:', dayResult)

  //控制展开收起
  const [visible, setVisible] = useState(false)

  return (
    <div className={classNames('dailybill')}>
      <div className='header'>
        <div className='dataIcon'>
          <span className='date'>{date}</span>
          {/* expand 有这个类名 展开箭头朝上的样子 */}
          <span className={classNames('arrow', visible && 'expand')} onClick={() => setVisible(!visible)}></span>
        </div>
        <div className='onelineoverview'>
          <div className='pay'>
            <span className='money'>{dayResult.pay.toFixed(2)}</span>
            <span className='type'>支出</span>
          </div>
          <div className='income'>
            <span className='money'>{dayResult.income.toFixed(2)}</span>
            <span className='type'>收入</span>
          </div>
          <div className='balance'>
            <span className='money'>{dayResult.total.toFixed(2)}</span>
            <span className='type'>结余</span>
          </div>
        </div>

      </div>

      {/*单日列表 */}
      <div className="billList" style={{ display: visible ? 'block' : 'none' }}>
        {billList.map(item => {
          return (
            <div className="bill" key={item.id}>
              <div className="detail">
                <Icon type={item.useFor} />
                <div className="billType">{billTypeToName[item.useFor]}</div>
                <div className={classNames('money', item.type)}>
                  {item.money.toFixed(2)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Daybill