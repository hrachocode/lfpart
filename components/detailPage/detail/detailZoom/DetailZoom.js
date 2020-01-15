import React from 'react';
import './DetailZoom.css';

class DetailZoom extends React.Component {

    setBrowserHeight = () => {
        const children = document.getElementsByClassName('detail-navigatia');
        const products = document.querySelectorAll('#detail-zoom>div');
        let detail = document.getElementById('detail-zoom');
        let documentScroll = document.scrollingElement.scrollTop*products.length;

        for(let key in children){
            if(children[key].classList){
                children[key].classList.remove('detail-active');
            }
        }
        const height = Math.round(documentScroll/detail.clientHeight);
        children[height].classList.add('detail-active');
    }

    componentDidMount(){
        window.addEventListener('scroll', this.setBrowserHeight);
        document.getElementById('root').style.display = 'none';
        document.getElementsByClassName('detail-navigatia')[0].classList.add('detail-active');
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.setBrowserHeight);
        document.getElementById('root').style.display = 'block';
    }
    
    render(){
        const{setZoom, images} = this.props;

        return (
            <div id="detail-zoom" ref={this.scrollRef}>
                <nav>
                    <div>
                        {images.map((product, index)=>(
                            <a key={index} href={`#${index}`} onClick={this.setBrowserHeight} className="detail-navigatia"> </a>
                        ))}
                    </div>
                    <button onClick={setZoom}>X</button>
                </nav>
                {images.map((product, index)=>(
                    <div id={index} key={index}>
                        <img src={product} alt=""/>
                    </div>
                ))}
            </div>
        )
    }
}

export default DetailZoom;