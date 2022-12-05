import React, { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { StyleSheet, css } from 'aphrodite'
import { Buffer } from 'buffer';
import axios from "axios"
import emptyImage from "../../assets/img/empty.svg"
import Telemed from "../../telemed.json"
import TelemedJson from "../../TelemedAbi.json"

const styles = StyleSheet.create({
  table: {
    '@media (max-width: 575px)': {
      fontSize: '12px',
    }
  },
  title: {
    margin: '20px 0'
  },
  empty: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%'
  },
})

export default function TransactionHistoryTable({currentItems}) {
  const { address, kit } = ""
  const [transactions, setTransactions] = useState([])  

  const messages = []

  const getMessages = async () => {
    try {
       const telemedContract = new kit.connection.web3.eth.Contract(TelemedJson.abi, Telemed.address)
      const messageCount = await telemedContract.methods.getMessageLength().call()
      // console.log('xxx ', messageCount)
      for (let i = 0; i <= messageCount.length; i++){
        const messageIndex = await telemedContract.methods.getMessageIndex(i).call()
        messages.push(messageIndex)
      }
      console.log(messages)
      setTransactions(messages)
      localStorage.setItem("transactions", messages)
      return messages
    } catch (err) {
      console.log(err)
    } 
  }
 
  useEffect(() =>{
    getMessages()
  })

  return(
      <div>
         <h4 className={css(styles.title)}>Transaction History</h4>
        { transactions.length < 1 ? <img className={css(styles.empty)} src={emptyImage} width="50px" alt="empty" /> :
         <div class="table-responsive">
          <Table className={css(styles.table)} striped bordered hover  size="sm">
            <thead>
              <tr>
                <th>BlockHash</th>
                <th>BlockNumber</th>
                <th>Mesage</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              
              {transactions.map((txn, index) =>
                <tr key={index}  className={css(styles.table)}>
                  {/* <td> <a href={`https://explorer.celo.org/alfajores/tx/${txn.id}/internal-transactions/`} target="_blank" rel="noreferrer">{txn.id === null ? null : `${txn.id.substring(0,40)}...`}</a></td>
                  <td>{txn['confirmed-round']}</td> */}
                  <td>{txn.blockHashNow}</td>
                  <td>{txn.blockNumber}</td>
                  <td>{txn.message}</td>
                  <td>{txn.from}</td>
                  <td>{txn.to}</td>
                  {/* <td>{txn.to === null ? null : `${txn.to.substring(0,20)}...`}</td>                        */}
                  </tr>               
            )}
            </tbody>
          </Table>
         </div>
         }
      </div>
      
  )
}