import React from 'react';
import Product from "../product/Product";

export default ({transaction}) => {
    console.log(transaction)
    const {date, toys, type, user_id} = transaction

    return (<div>
        <div>{date}</div>
        <div>{type}</div>
        <div>{user_id}</div>
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
            {toys.map(product => <Product product={product} key={product.id}/>)}
            </tbody>
        </table>
    </div>)

}
