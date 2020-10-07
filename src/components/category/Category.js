import React, {useCallback} from 'react';
import {connect, useDispatch} from "react-redux";
import './Category.css';
import {changeCategory, updateCategoryForm} from "../../store/actions/productsActions";
import {loadLocalToken} from "../../store/actions/loginActions";

const Category = (props) => {
    const dispatch = useDispatch()
    const {category:{id, name}} = props
    const {categoriesForm:{category_name}, categoriesOnChange, categories} = props

    const onChangeElem = ({ nativeEvent: { target }}) => {
        dispatch(updateCategoryForm({ [target.name]: target.value }))
    }

    let isChanging = false
    if (categoriesOnChange === id){
        isChanging = true
    }
    let categoryValue = category_name
    if (typeof(categoryValue) === "undefined"){
        categoryValue = name
    }
    function deleteCat(){

    }

    function onChangeCategory(){
        dispatch(changeCategory(id))
    }

    function onCancel(){
        dispatch({type: 'cancelCategory'})
    }

    function onSave(){
        if (categoryValue === name){
            console.log(categoryValue, name)
        }else if(categories.findIndex(element => element.name === categoryValue) > -1){
            console.log(category_name, categories)
        }else{
            dispatch({type: 'onSaveCategory'})
        }
    }

    console.log('name!!', name)
    return (<div>
        <div className={isChanging ? 'd_none': "d_inl_block"}>
            {name}
        </div>
        <div className={isChanging ? "d_inl_block": 'd_none'}>
            <input name='category_name' value={categoryValue} onChange={onChangeElem}/>
        </div>
        <div className={isChanging ? 'd_none': "d_inl_block"}>
            <button onClick={onChangeCategory}>change</button>
        </div>
        <div className={isChanging ? "d_inl_block": 'd_none'}>
            <button onClick={onCancel}>cancel</button>
        </div>
        <div className={isChanging ? "d_inl_block": 'd_none'}>
            <button onClick={onSave}>save</button>
        </div>
        <div className='d_inl_block'>
            <button  onClick={deleteCat}>delete</button>
        </div>
    </div>)

}

const mapStatePoProps = state => {
    return {
        categoriesForm: state.products.categoriesForm,
        categoriesOnChange: state.products.categoriesOnChange,
        categories: state.products.categories
    }
}

export default connect(mapStatePoProps, null)(Category)
