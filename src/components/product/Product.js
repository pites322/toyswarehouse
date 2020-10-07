import React from 'react';

export default ({product}) => {
    console.log(product)
    const {name, quantity, price, totalCost, description, category} = product

    return (<tr>
        <td>{name}</td>
        <td>{quantity}</td>
        <td>{price}</td>
        <td>{totalCost}</td>
        <td>{description}</td>
        <td>{category.name}</td>
    </tr>)

}