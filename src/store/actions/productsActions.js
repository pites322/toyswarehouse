
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

