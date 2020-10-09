import React from 'react';
import {connect, useDispatch} from "react-redux";
import {updateTransactionProductForm} from "../../store/actions/productsActions";

function TransactionProductForm(props){
    const dispatch = useDispatch()
    const {products, form, id} = props
    const {productId, quantity} = form

    const onChangeElem = ({ nativeEvent: { target }}) => {
        dispatch(updateTransactionProductForm(id, {[target.name]: target.value }))
    }

    return(<div>
        <select name='id' onChange={onChangeElem}>
            map({products.map(product => <option value={product.id}>{product.name}</option>)})
            </select>
        <input name='quantity' value={quantity} onChange={onChangeElem}/>
    </div>)

}

const mapStatePoProps = state => {
    return {
        products: state.products.products
    }
}

export default connect(mapStatePoProps, null)(TransactionProductForm)
