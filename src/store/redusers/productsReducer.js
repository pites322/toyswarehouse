const initialState = {
    products: [],
    productsForm: {},
    productsFormVisible: false,

    categories: [],
    categoriesForm: {},
    categoriesOnChange: '',

    transactions: [],
    transactionsForm: {
        products: []
    },
    transactionsFormVisible: false,
}

export const productsReducer = (state= initialState, action) => {
    switch (action.type){
        case 'getProducts':
            return { ...state , products: [...action.payload]}
        case 'addProduct':
            console.log('syrygag', action.payload)
            return { ...state , productsFormVisible: false, products: [...state.products, action.payload]}
        case 'showProductForm':
            return {
                ...state,
                productsFormVisible: true
            }
        case 'updateProductForm':
            return {
                ...state,
                productsForm: {
                    ...state.productsForm,
                    ...action.fields
                }
            }



        case 'getTransactions':
            return { ...state , transactions: [...action.payload]}
        case 'showTransactionsForm':
            return {
                ...state,
                transactionsFormVisible: true
            }
        case 'addTransaction':
            const transactionsForm = {transactionsForm: {
                products: []
            }}
            console.log('syrygag', action.payload)
            return { ...state , transactionsForm: transactionsForm, transactions: [...state.transactions, action.payload]}
        case 'addMoreTransactionForm':
            const product = {}
            return {
                ...state,
                transactionsForm: {...state.transactionsForm,
                    products: [...state.transactionsForm.products, product]},
                transactionsFormVisible: true
            }

        case 'updateTransactionsForm':
            console.log('!!!!', action.fields)
            return {
                ...state,
                transactionsForm: {
                    ...state.transactionsForm,
                    ...action.fields
                }
            }
        case 'updateTransactionsProductForm':
            let newState = state
            newState.transactionsForm.products[action.formId] = [newState.transactionsForm.products[action.formId], action.fields]
            console.log('newState', newState, action.formId, action.fields)
            return newState
        // case 'addTransaction':
        //     console.log('syrygag', action.payload)
        //     return { ...state , transactionsFormVisible: false, transactions: [...state.transactions, action.payload]}



        case 'getCategories':
            return { ...state , categories: [...action.payload]}
        case 'changeCategory':
            return { ...state , categoriesOnChange: action.category_id, categoriesForm: {}}
        case 'updateCategoryForm':
            return {
                ...state,
                categoriesForm: {
                    ...state.categoriesForm,
                    ...action.fields
                }
            }
        case 'cancelCategory':
            return { ...state , categoriesOnChange: '', categoriesForm: {}}
        case 'saveCategory':
            const elementsIndex = state.categories.findIndex(element => element.id === state.categoriesOnChange)
            let newArray = { ...state , categoriesOnChange: '', categoriesForm: {}}
            newArray.categories[elementsIndex] = action.payload
            return newArray
        case 'addCategory':
            return { ...state , categories: [...state.categories, action.payload],
                categoriesForm: {}, categoriesOnChange: ''}
        case 'deleteCategory':
            return { ...state , categories: [...state.categories.filter((elem) => elem.id !== action.category_id)]}


        default: return state

    }

}

