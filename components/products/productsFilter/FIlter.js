import React from 'react';
import { connect } from 'react-redux';
import { setProductCost } from '../store/action';
import Loader from '../../Loader';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

class Filter extends React.Component {

    state = {
        filters : [],
        loading : false,
        update : false,
    }

    checkBox = (name, slug, id) => {
        slug = slug.replace(/\W/g, '_');
        return <input 
            type="checkbox" 
            name={name} 
            onChange={this.props.handleChange} 
            data-id={id} 
            data-slug={slug} 
            className="checkbox-filter"
        />
    }

    setClass = e => {
        let {parentNode} = e.target;
        parentNode.nextElementSibling.classList.toggle('filter-active');
        parentNode.lastElementChild.style.transitionDuration = '0.5s';
        if(parentNode.nextElementSibling.className === 'filter-active'){
            parentNode.lastElementChild.style.transform = 'rotate(0deg)';
        }
        else{
            parentNode.lastElementChild.style.transform = 'rotate(180deg)';
        }
    }

    filterTitle = categoryTitle => (
        <div onClick={this.setClass} data-category={categoryTitle} className="category-title">
            <h3>{categoryTitle}</h3>
            <span></span>
        </div>
    )

    handleChange = value => value.max-value.min>40000 && value.min>=0 && value.max<=1000000 ? this.props.setProductCost(value) : false;

    filterCheckToParent = () => {
        let {filterSlug, handleChange} = this.props;
        if(Object.keys(filterSlug).length===0){return false}
        let inputId = {}
        Object.keys(filterSlug).map(elem =>{ 
            inputId[elem] = [];
            return filterSlug[elem].map(el=>{
                elem = elem.replace(/\W/g, '_');
                let id = document.querySelector(`[data-slug=${el}]`).dataset.id;
                inputId[elem].push(id);
            })
        })

        handleChange(null ,inputId);
    }

    componentDidUpdate(prevProps){
        if(Object.keys(this.props.filterSlug).length>0){
            for(let key in this.props.filterSlug){
                this.props.filterSlug[key].map(elem=>{
                    elem = elem.replace(/\W/g, '_');
                    let input = document.querySelector(`[data-slug=${elem}]`);
                    return input ? input.checked = true : false;
                })
            }
        }else{

        }
        if(prevProps.path!==this.props.path || this.state.update){
            this.setState({
                loading : true,
                update : false
            });
            fetch(`${window.location.protocol}//${window.location.host}/api/v1/filters/${this.props.path}?token=674e3a8b-fd97-4534-8b01-ade4618a757c`)
            .then(res=>res.json())
            .then(filters=>{
                this.setState({
                    loading : false,
                    filters
                });
                this.filterCheckToParent();
            })
        }
    }

    componentDidMount(){
        this.setState({update : true}); 
    }

    render(){
        const {productsCost, width} = this.props;
        const {filters, loading} = this.state;

        return loading ? <Loader style={width>800 ? {width : '20%'} : {width: 0} }/> : (
            <div id="filter-nav" className="filter-navigatia"> 
                {Object.keys(filters).map((elem, index)=>(
                    <div className="filter-category" key={index}>
                        <div onClick={this.setClass} data-category={elem} className="category-title">
                            {(function() {
                                switch (elem) {
                                    case 'brand':
                                        return <h3>Բրենդ</h3>
                                        // break;
                                    case 'gender':
                                        return <h3>Սեռ</h3>
                                    
                                    case 'age':
                                        return <h3>Տարիք</h3>

                                    case 'wear_duration':
                                        return <h3>Կրման Տևողություն</h3>
                                        
                                    case 'oxygen_transparency':
                                        return <h3>Թափանցելիություն</h3>                                          
                                                                                                      
                                    case 'manufacturer':
                                        return <h3>Արտադրող</h3>
                                        
                                    default: 
                                        return <h3>Արտադրող</h3>
                                        // break;
                                }
                            }())}

                            <span></span>
                        </div>
                        <div className="">
                            {filters[elem].map(((el, index)=>(
                                el!== null && <div key={index}>
                                    <label className="checkbox-container">
                                        {el.name ? this.checkBox(el.name, el.slug, el._id) : this.checkBox(el, el, el)}
                                        <span className="checkmark"></span>
                                    </label>
                                    {/* <span>{el.name || el}</span> */}
                                    {(function() {
                                        switch (el.name || el) {
                                            case '3_month':
                                                return <span>3 ամիս</span>
                                                // break;
                                            case '1_day':
                                                return <span>1 օր</span>
                                            
                                            case '2_weeks':
                                                return <span>2 շաբաթ</span>

                                            case 'inspiring':
                                                return <span>Գերշնչող</span>
                                            
                                            case 'daytime_wear':
                                                return <span>Ցերեկային կրման</span>
                                            default: 
                                                return <span>{el.name || el}</span>
                                                // break;
                                            }
                                    }())}
                                </div>
                            )))}
                        </div>
                    </div>
                ))}
                {Object.keys(filters).length>0 && <div id="filter-cost" className="filter-category">
                    {this.filterTitle('Արժեք')}
                    <div className="filter-active">
                        <InputRange
                            step={1000}
                            maxValue={1000000}
                            minValue={0}
                            value = {{
                                min : productsCost.min,
                                max : productsCost.max
                            }}
                            formatLabel={value => `${value} դր`}
                            onChange={value => this.handleChange(value)}
                        />
                    </div>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    productsCost : state.products.productsCost,
    loading : state.products.loading,
    width : state.width.width,
})

const mapDispatchToProps = {
    setProductCost
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);