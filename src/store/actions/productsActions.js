
export const changeCategory = (category_id) => {
    return {
        type: 'changeCategory',
        category_id: category_id
    }
}

export const updateCategoryForm = (fields) => {
    return {
        type: 'updateCategoryForm',
        fields
    }
}

export const updateProductForm = (fields) => {
    return {
        type: 'updateProductForm',
        fields
    }
}

export const addMoreTransactionForm = () => {
    return {
        type: 'addMoreTransactionForm',
    }
}



export const updateTransactionForm = (fields) => {
    return {
        type: 'updateTransactionsForm',
        fields
    }
}

export const updateTransactionProductForm = (formId, fields) => {
    return {
        type: 'updateTransactionsProductForm',
        formId,
        fields
    }
}




