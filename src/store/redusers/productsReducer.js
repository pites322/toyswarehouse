const initialState = {
    products: [],
    productsForm: {},

    categories: [],
    categoriesForm: {},
    categoriesOnChange: '',

    transactions: [],
    transactionsForm: {},
}

export const productsReducer = (state= initialState, action) => {
    switch (action.type){
        case 'getProducts':
            return { ...state , products: [...action.payload]}
        case 'addProduct':
            return { ...state , products: [...state.products, action.payload]}

        case 'getTransactions':
            return { ...state , transactions: [...action.payload]}


        case 'getCategories':
            return { ...state , categories: [...action.payload]}
        case 'changeCategory':
            console.log('aswd')
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
            console.log(newArray)
            return newArray
            // return {...state, categoriesOnChange: '', categoriesForm: {},
            //     categories:[...state.categories, ]}
        case 'addCategory':
            return { ...state , categories: [...state.categories, action.payload],
                categoriesForm: {}, categoriesOnChange: ''}
        case 'deleteCategory':
            return { ...state , categories: [...action.payload]}


        default: return state

    }

}

