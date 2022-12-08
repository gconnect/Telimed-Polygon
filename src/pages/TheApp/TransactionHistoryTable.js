import React, { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { StyleSheet, css } from 'aphrodite'
import { Buffer } from 'buffer';
import axios from "axios"
import emptyImage from "../../assets/img/empty.svg"
import Telemed from "../../telemed.json"
import TelemedJson from "../../TelemedAbi.json"
import { telimedContract, getCurrentWalletConnected } from "../../interact"
  
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
  // const [address, setAddress] = useState("")
  const [transactions, setTransactions] = useState([])  

  const messages = []

    // useEffect(() => {
    // const currentAddress = async () => {
    //   const { address, status } = await getCurrentWalletConnected();
    //   setAddress(address)
    // }
    // currentAddress()    
    // }, []);
  
  const getMessages = async () => {
    try {
      const messageCount = await telimedContract.methods.getMessageLength().call()
      for (let i = 0; i <= messageCount.length; i++){
        const messageIndex = await telimedContract.methods.getMessageIndex(i).call()
        console.log(messageIndex)
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
                  <td> <a href={`https://mumbai.polygonscan.com/tx/${txn.blockHashNow}`} target="_blank" rel="noreferrer">{txn.blockHashNow === null ? null : `${txn.blockHashNow.substring(0,40)}...`}</a></td>
                  <td>{txn.blockNumber}</td>
                  <td>{txn.message}</td>
                  <td>{txn.from === null ? null : `${txn.from.substring(0,40)}...`}</td>
                  <td>{txn.to === null ? null : `${txn.to.substring(0,40)}...`}</td>
                  </tr>               
            )}
            </tbody>
          </Table>
         </div>
         }
      </div>
      
  )
}