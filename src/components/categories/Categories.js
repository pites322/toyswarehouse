import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import InputBase from '@material-ui/core/InputBase';
import FormGroup from '@material-ui/core/FormGroup';


import './Categories.css';
import Category from "../category/Category";
import {changeCategory, updateCategoryForm} from "../../store/actions/productsActions";
// import {changeCategory} from "../../store/actions/productsActions";


function Categories({categoriesData, categoriesOnChange, categoriesForm}){
    const dispatch = useDispatch()
    const{category_name} = categoriesForm
    console.log('categoriesData', categoriesData)
    useEffect(() => {
        dispatch({ type: "getFetchedCategories" })
    }, [])

    let isCreating = false
    console.log('categoryOnChange', categoriesOnChange)
    if (categoriesOnChange === 'create'){
        isCreating = true
    }
    const onChangeElem = ({ nativeEvent: { target }}) => {
        dispatch(updateCategoryForm({ [target.name]: target.value }))
    }

    function onSave(){
        if (category_name === ''){
            console.log(category_name, '')
        }else if(categoriesData.findIndex(element => element.name === category_name) > -1){
            console.log(category_name, categoriesData)
        }else{
            dispatch({type: 'onAddCategory'})
        }
    }

    function onChangeCategory(){
        dispatch(changeCategory('create'))
    }

    return(
        <div>
            <div>Category Name</div>
            <div className={isCreating ? 'd_none': "d_inl_block"}>
                <button onClick={onChangeCategory}>add</button>
            </div>
            <div className={isCreating ? "d_inl_block": 'd_none'}>
                <input name='category_name' value={category_name} onChange={onChangeElem}/>
            </div>
            <div className={isCreating ? "d_inl_block": 'd_none'}>
                <button onClick={onSave}>save</button>
            </div>
            <div>
                {categoriesData.map(category => <Category category={category} key={category.id}/>)}
            </div>
        </div>
    )
}

const mapStatePoProps = state => {
    console.log("state!!", state)
    return {
        categoriesData: state.products.categories,
        categoriesOnChange: state.products.categoriesOnChange,
        categoriesForm: state.products.categoriesForm,
    }
}

export default connect(mapStatePoProps, null)(Categories)
