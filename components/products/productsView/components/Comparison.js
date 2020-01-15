import React from 'react';

const Comparison = () => {

    const changeDisplay = display => {
        let productList = document.getElementById('products-list-view');
        if(display==='list'){
            productList.classList.add('elems-list')
        }else{
            if(productList.className==='elems-list'){
                productList.className = '';
            }
        }
    }

    return(
        <div id="comparison">
            <span onClick={()=>{changeDisplay('block')}}></span>
            <span onClick={()=>{changeDisplay('list')}}></span>
        </div>
    )
}

export default Comparison;