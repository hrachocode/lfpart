import React from 'react';
import { connect } from 'react-redux'
import ProductsHOC from '../../ProductsHOC';
import { setShowSort } from '../../store/action';

const Sort = (props) => { 
    const {openList, setStyle, sort, setShowSort} = props;

    const handleClick = (sort, event) => {
        if(sort){setShowSort(sort)}
        setStyle(event);
    }
    
    return(
        <div className="show-container">
            <div className="show" onClick={(event)=>handleClick(undefined, event)}>
                <p>Սորտավորել</p>
                <span>{sort || "Վերջին ապրանքատեսականի"}</span>
                <span className="view-arrow" />
            </div>
            {openList && 
            <div className="view-list">
                <span onClick={(event)=>handleClick('A-Z', event)}>A-Z</span>
                <span onClick={(event)=>handleClick('Z-A', event)}>Z-A</span>
                <span onClick={(event)=>handleClick('Cheap', event)}>Ցածր գնային</span>
                <span onClick={(event)=>handleClick('Expensive', event)}>Բարձր գնային</span>
            </div>}
        </div>
    )
}

const mapStateToProps = state => ({sort : state.products.sort})

const mapDispatchToProps = { setShowSort }

export default ProductsHOC(connect(mapStateToProps, mapDispatchToProps)(Sort));