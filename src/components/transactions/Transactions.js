import React, {useEffect} from 'react';
import {connect, useDispatch} from "react-redux";

import InputBase from '@material-ui/core/InputBase';
import FormGroup from '@material-ui/core/FormGroup';


import './Transactions.css';
import Transaction from "../transaction/Transaction";


function Transactions({transactionsData}){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: "getFetchedTransactions" })
    }, [])
    console.log('!!!!!!', transactionsData)

    if (typeof(transactionsData) === "undefined"){
        return(<div>noData</div>)
    }
    return(
        <div>
            {transactionsData.map(transaction => <Transaction transaction={transaction} key={transaction.id}/>)}
        </div>
    )
}

const mapStatePoProps = state => {
    console.log('state!', state)
    return {
        transactionsData: state.products.transactions
    }
}

export default connect(mapStatePoProps, null)(Transactions)
