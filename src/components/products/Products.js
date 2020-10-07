import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux'

import { useHistory } from 'react-router-dom';

import FormGroup from "@material-ui/core/FormGroup";
import InputBase from "@material-ui/core/InputBase";
import Product from "../product/Product";




const Products = ({products}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: "getFetchedProducts" })
    }, [])

    let history = useHistory();

    const toTransactions = () => {
        history.push('/transactions')
    }
    const toCategories = () => {
        history.push('/categories')
    }

    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjAxOTU1NjE2LCJleHAiOjE2MDIwNDIwMTZ9.ZWoESaSsbPyYbSzHTmQlTE0LB6hGQTiVnl7Cr-WmNIc'
    //
    //
    // function call(){
    //     console.log(getResp(`http://localhost:8080/categories`))
    //     console.log(getResp(`http://localhost:8080/toys`))
    //     console.log('toys')
    //     console.log(getResp(`http://localhost:8080/toys/1`))
    //     console.log('toys')
    //     console.log(getResp(`http://localhost:8080/transactions`))
    //     console.log(getResp(`http://localhost:8080/transactions/1`))
    // }
    //
    // function addToys(){
    //     console.log(setResp(`http://localhost:8080/toys`, "post", {
    //         "categoryId": '1',
    //         "name": 'Tes4t',
    //         "quantity": 10,
    //         "price": 200,
    //         "totalCost": 2000,
    //         "description": 'Test constructor',
    // }))
    // }
    //
    // function remToys(){
    //     console.log(setResp(`http://localhost:8080/toys/3`, "DELETE", ))
    // }
    //
    // function addTrans(){
    //     console.log(setResp(`http://localhost:8080/transactions`, "post", {
    //         toys: [{
    //             id: '1',
    //             quantity: 2200,
    //         },
    //         {
    //             id: '2',
    //             quantity: 2200,
    //         }],
    //         type: "outcoming"
    //     }))
    // }
    //
    // function addCst(){
    //     console.log(setResp(`http://localhost:8080/categories`, "post", {
    //         name: 'ddsd',
    //     }))
    // }
    //
    // return(
    //     <div className='login_container'>>
    //         <button className='login_form_button' type='submit'>getData</button>
    //         <table>
    //
    //         </table>
    //         {/*<button className='login_form_button' onClick={ addToys } type='submit'>addData</button>*/}
    //         {/*<button className='login_form_button' onClick={ remToys } type='submit'>remData</button>*/}
    //         {/*<button className='login_form_button' onClick={ addTrans } type='submit'>addTrans</button>*/}
    //         {/*<button className='login_form_button' onClick={ addCst } type='submit'>addCst</button>*/}
    //     </div>
    // )
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>name</td>
                        <td>quantity</td>
                        <td>price</td>
                        <td>totalCost</td>
                        <td>description</td>
                        <td>category</td>
                    </tr>
                </thead>
                <tbody>
                {products.map(product => <Product product={product} key={product.id}/>)}
                </tbody>
            </table>
            <div>
                <button onClick={toTransactions}>Transactions</button>
                <button onClick={toCategories}>Categories</button>
            </div>
        </div>

    )

}

const mapStatePoProps = state => {
    console.log(state)
    return {
        products: state.products.products
    }
}

export default connect(mapStatePoProps, null)(Products)