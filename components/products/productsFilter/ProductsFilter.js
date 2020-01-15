import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setProducts, setLoading, setPath } from '../store/action';
import Filter from './FIlter';
import { pathSearch, pathFilter } from './Helper';
import { displayStatus, fetchData } from '../../Helper';
import './ProductsFilter.css';

class ProductsFilter extends React.Component{
    state = {
        update : true,
        isOpen : false,
        path : '',
        filterSlug : {},
    }
    
    filterProduct = {
        limit : 15,
        chosen: {}
    }

    handleChange = (event, inputId) => {
        const {setLoading, setProducts, setPath, path, productsLength} = this.props;
        const {pathname} = this.props.history.location;
        let {filterSlug} = this.state;
        
        setLoading(true);

        if(event){
            let slug = event.target.dataset['slug'];
            let _id = event.target.dataset['id'];
            let categoryTitle = event.target.closest('.filter-active').previousElementSibling.dataset['category'];
            
            if(event.target.checked){
                !filterSlug[categoryTitle] ? filterSlug[categoryTitle] = [slug] : filterSlug[categoryTitle].push(slug);
                !this.filterProduct.chosen[categoryTitle] ? this.filterProduct.chosen[categoryTitle] = [_id] : this.filterProduct.chosen[categoryTitle].push(_id);
            }
            else{
                let index = filterSlug[categoryTitle].indexOf(slug);
                let chosenID = this.filterProduct.chosen[categoryTitle].indexOf(_id);
                filterSlug[categoryTitle].length===1 ? delete filterSlug[categoryTitle] : filterSlug[categoryTitle].splice(index, 1);
                this.filterProduct.chosen[categoryTitle].length===1 ? delete this.filterProduct.chosen[categoryTitle] : this.filterProduct.chosen[categoryTitle].splice(chosenID, 1);
            }

            const filterPath = pathFilter(pathname);
            this.props.history.push(`/products/${filterPath}/${JSON.stringify(filterSlug)}`);

            this.setState({filterSlug});
            if(Object.keys(this.filterProduct.chosen).length===0){
                return this.request();
            }
            
        }else{
            if(inputId){this.filterProduct.chosen = inputId}
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let final = this.filterProduct.chosen;

        let init = {
            method: 'POST',
            body : JSON.stringify({
                limit: productsLength,
                filters: final
            }),
            headers
        }

        let req = new Request(`${window.location.protocol}//${window.location.host}/api/v1/filter?token=674e3a8b-fd97-4534-8b01-ade4618a757c`,init);

        fetchData(req, setProducts, ()=>{
            setLoading(false);
            setPath(!path)
        })
    }

    request = () => {
        const {setLoading, setProducts, setPath, path, productsLength} = this.props;

        let req = new Request(`${window.location.protocol}//${window.location.host}/api/v1/productType/${this.state.path}?token=674e3a8b-fd97-4534-8b01-ade4618a757c&limit=${productsLength}`,{
            method : 'GET'
        });

        fetchData(req, setProducts, ()=>{
            setLoading(false);
            setPath(!path)
        })
    }

    openMobileFilter = () => {
        displayStatus('products-list-view', 'none');
        displayStatus('filter-nav', 'block');
        this.setState({isOpen : true});
    }

    closeMobileFilter = () => {
        window.scrollTo(0,0);
        displayStatus('products-list-view', 'block');
        displayStatus('filter-nav', 'none');
        this.setState({isOpen : false});
    }

    static getDerivedStateFromProps(nextProps) {
        if(nextProps.width>800 && document.getElementById('products-list-view')){
            displayStatus('products-list-view', 'block');
            return {isOpen : false}
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState){
        let path = this.props.history.location.pathname.split('/');
        path.splice(0,3);
        if(this.props.width!==prevProps.width){
            this.props.width>800 ? displayStatus('filter-nav', 'block') : displayStatus('filter-nav', 'none');
        }
        if(prevState.path!==this.state.path && this.state.path!== ''){
            if(path[0]==="{}"){
                this.setState({filterSlug: {}});
                this.filterProduct.chosen = {};
                this.request();
            }
            displayStatus('products-list-view', 'block');
            this.setState({isOpen : false})
        }
        if(this.props.location.pathname!==prevProps.location.pathname){
            const {pathname} = this.props.history.location;
            let path = pathSearch(pathname);
            this.setState({path});
        }
        if(this.state.update){
            this.setState({
                update : false,
                filterSlug: JSON.parse(path[0])
            });
        }
        if(this.props.productsLength!==prevProps.productsLength){
            this.filterProduct.limit = this.props.productsLength;
            this.request();
        }
    }

    componentDidMount(){
        const {pathname} = this.props.history.location;
        let path = pathSearch(pathname);
    
        this.setState({
            update : true,
            path
        });
    }

    render(){
        const {width} = this.props;

        return (
            <React.Fragment>
                <Filter handleChange={this.handleChange} filterSlug={this.state.filterSlug} path={this.state.path}/>
                {width<800 && !this.state.isOpen ? <span className="media-filter" id="open-filter" onClick={this.openMobileFilter}/> : null}
                {width<800 && this.state.isOpen ? <button className="media-filter" id="submit-filter" onClick={this.closeMobileFilter}>Submit</button> : null}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    width : state.width.width,
    path : state.products.path,
    productsLength : state.products.productsLength,
})

const mapDispatchToProps = {
    setProducts,
    setLoading,
    setPath
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsFilter));