import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux'

import { useHistory } from 'react-router-dom';

import FormGroup from "@material-ui/core/FormGroup";
import InputBase from "@material-ui/core/InputBase";
import Product from "../product/Product";
import {updateProductForm} from "../../store/actions/productsActions";
import Category from "../category/Category";




const Products = ({products, productsForm, categories, productsFormVisible}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: "getFetchedProducts" })
        dispatch({ type: "getFetchedCategories" })
    }, [])
    const{name, price, description, category} = productsForm

    let history = useHistory();
    let formVisible = false

    const toTransactions = () => {
        history.push('/transactions')
    }
    const toCategories = () => {
        history.push('/categories')
    }

    function showForm(){
        dispatch({type: 'showProductForm'})
    }

    function addProduct(e){
        e.preventDefault()
        dispatch({type: 'addFetchedProduct', ...productsForm})
    }

    const onChangeElem = ({ nativeEvent: { target }}) => {
        dispatch(updateProductForm({ [target.name]: target.value }))
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
            <div className={productsFormVisible ? 'd_none': "d_inl_block"}>
                <button onClick={showForm}>Add</button>
            </div>
            <div className={productsFormVisible ? "d_inl_block":  'd_none'}>
                <form onSubmit={addProduct}>
                    <input name='name' value={name} onChange={onChangeElem}/>
                    <input name='price' value={price} onChange={onChangeElem}/>
                    <input name='description' value={description} onChange={onChangeElem}/>
                    <select name='categoryId' value={category} onChange={onChangeElem}>
                        map({categories.map(category => <option value={category.id}>{category.name}</option>)})
                    </select>
                    <button type='submit'>Save</button>
                </form>
            </div>
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
        products: state.products.products,
        productsForm: state.products.productsForm,
        categories: state.products.categories,
        productsFormVisible: state.products.productsFormVisible
    }
}

export default connect(mapStatePoProps, null)(Products)