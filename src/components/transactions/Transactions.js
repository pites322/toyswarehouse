import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";

import InputBase from '@material-ui/core/InputBase';
import FormGroup from '@material-ui/core/FormGroup';


import './Transactions.css';
import Transaction from "../transaction/Transaction";
import {updateTransactionForm, addMoreTransactionForm} from "../../store/actions/productsActions";
import TransactionProductForm from "../transactionProductForm/TransactionProductForm";


function Transactions({transactionsData, transactionsForm, transactionsFormVisible}){
    const dispatch = useDispatch()

    // function addMore(){
    //     return {addMore: true}
    // }
    let added_products = transactionsForm.products
    console.log('added_products', added_products)

    function addOneMoreForm(){
        dispatch(addMoreTransactionForm())
    }

    const {type} = transactionsForm
    useEffect(() => {
        dispatch({ type: "getFetchedTransactions" })
        dispatch({ type: "getFetchedProducts" })
    }, [])

    if (typeof(transactionsData) === "undefined"){
        return(<div>noData</div>)
    }
    function showForm(){
        dispatch({type: 'showTransactionsForm'})
        dispatch(addMoreTransactionForm())
    }

    function addTransaction(e){
        e.preventDefault()
        dispatch({type: 'onAddTransactions', transactionsForm: transactionsForm})

        // console.log('838218', e.target.id)
        // if (e.target.id === 'submit'){
        //     console.log('!!!!!!!')
        // }

    }

    const onChangeElem = ({ nativeEvent: { target }}) => {
        dispatch(updateTransactionForm({[target.name]: target.value }))
    }

    return(
        <div>
        <div className={transactionsFormVisible ? 'd_none': "d_inl_block"}>
            <button onClick={showForm}>Add</button>
        </div>
        <div className={transactionsFormVisible ? "d_inl_block":  'd_none'}>
            <form onSubmit={addTransaction}>
                <select name='type' value={type} onChange={onChangeElem}>
                    <option value={'incoming'}>incoming</option>)
                    <option value={'outcoming'}>outcoming</option>)
                </select>
                <div>{
                    added_products.map((form, id) =>
                        <TransactionProductForm id={id} form={form}/>)
                    }
                </div>
                <button onClick={addOneMoreForm}>addMore</button>
                <button type='submit'>addTransaction</button>
            </form>
        </div>
        <div>
            {transactionsData.map(transaction => <Transaction transaction={transaction} key={transaction.id}/>)}
        </div>
        </div>
    )
}

const mapStatePoProps = state => {
    console.log('state!', state)
    return {
        transactionsData: state.products.transactions,
        transactionsForm: state.products.transactionsForm,
        transactionsFormVisible: state.products.transactionsFormVisible
    }
}

export default connect(mapStatePoProps, null)(Transactions)
