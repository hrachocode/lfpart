import React, {useState} from 'react';

const ProductsHOC = Component => {
    return () => {
        const [openList, setOpenList] = useState(false);
        const setStyle = event => {
            setOpenList(!openList);
            let arrow = event.target.closest('.show-container').firstChild.lastChild.style;
            arrow.transitionDuration = '0.5s';
            !openList ? arrow.transform = 'rotate(180deg)' : arrow.transform = 'rotate(0deg)';
        } 

        return <Component openList={openList} setStyle={setStyle}/>
    }
}

export default ProductsHOC;