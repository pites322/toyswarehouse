import {takeEvery, put, call, select} from 'redux-saga/effects'
import { useSelector } from 'react-redux';


const tokenState = state => state.login.token;
export function* sagaWatcher(){
    yield takeEvery('fetchedAuth', fetchedAuthWorker)
    yield takeEvery('getFetchedProducts', getFetchedProductsWorker)
    yield takeEvery('getFetchedTransactions', getFetchedTransactionsWorker)
    yield takeEvery('getFetchedCategories', getFetchedCategoriesWorker)
    yield takeEvery('onSaveCategory', onSaveCategoryWorker)
    yield takeEvery('onAddCategory', onAddCategoryWorker)
    yield takeEvery('onDeleteCategory', onDeleteCategoryWorker)
    yield takeEvery('addFetchedProduct', addFetchedProductWorker)
    yield takeEvery('onAddTransactions', onAddTransactionsWorker)

}


//добавить обработчик ошибок
//Login
function* fetchedAuthWorker(){
    const url = "http://localhost:8080/login"
    const {login, password, saveToken} = yield select(state => state.login.form)
    const token = ''
    const data = {"email":"user@example.com","password":"1234567890"}
    const response = yield call(setResp, url, token, data)
    yield put({type: 'auth', subtype: 'success',
        token: response.accessToken, saveToken: saveToken})
}

//добавить обработчик ошибок
//Products
function* getFetchedProductsWorker(){
    const token = yield select(tokenState)
    const url = 'http://localhost:8080/toys'
    const response = yield call(getResp, url, token)
    const payload = response.toys
    yield put({type: 'getProducts', payload})
}

function* addFetchedProductWorker(args){
    const token = yield select(tokenState)
    console.log('args', args)
    const url = 'http://localhost:8080/toys'
    const response = yield call(setResp, url, token, {...args}, 'POST')
    console.log('response', response)
    const payload = response
    // const prod_id = payload.id
    yield put({type: 'addProduct', payload})
}



//Transactions
function* getFetchedTransactionsWorker(){
    const token = yield select(tokenState)
    const url = 'http://localhost:8080/transactions'
    const response = yield call(getResp, url, token)
    const payload = response.transactions
    yield put({type: 'getTransactions', payload})
}

function* onAddTransactionsWorker(args){
    const token = yield select(tokenState)
    const url = 'http://localhost:8080/transactions/'
    console.log('hysadhdhha', args)
    const response = yield call(setResp, url, token, {type: args.type, toys: args.transactionsForm.products}, 'POST')
    console.log(response)
    yield put({type: 'addCategory', payload: response})
}


//Categories
function* getFetchedCategoriesWorker(){
    const token = yield select(tokenState)
    const url = 'http://localhost:8080/categories'
    const response = yield call(getResp, url, token)
    console.log('getFetchedCategoriesWorker', response)
    const payload = response.categories
    yield put({type: 'getCategories', payload})
}

function* onSaveCategoryWorker(){
    const token = yield select(tokenState)
    const {categoriesOnChange, categoriesForm: {category_name}} = yield select(state => state.products)
    const url = 'http://localhost:8080/categories/' + categoriesOnChange
    const response = yield call(setResp, url, token, {name: category_name}, 'PUT')
    yield put({type: 'saveCategory', payload: response, categoriesOnChange: categoriesOnChange})
}

function* onAddCategoryWorker(){
    const token = yield select(tokenState)
    const {categoriesForm: {category_name}} = yield select(state => state.products)
    const url = 'http://localhost:8080/categories/'
    const response = yield call(setResp, url, token, {name: category_name}, 'POST')
    console.log(response)
    yield put({type: 'addCategory', payload: response})
}


function* onDeleteCategoryWorker(args){
    const token = yield select(tokenState)
    // const {categoriesOnChange, categoriesForm: {category_name}} = yield select(state => state.products)
    const url = 'http://localhost:8080/categories/' + String(args.category_id)
    const response = yield call(setResp, url, token, {}, 'DELETE')
    yield put({type: 'deleteCategory', category_id: args.category_id})
}






async function getResp(url, token, method = 'GET'){
    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return await response.json();
}

async function setResp(url, token, data, method = 'POST'){
    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    return await response.json();
}