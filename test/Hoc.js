import React from 'react';

const Hoc = (Copmonent) => {
    return class extends React.Component{
        constructor(){
            super();
            this.state = {
                open : false
            }
        }

        changeState = () => {
            this.setState({open : !this.state.open})
        }

        render(){
            return(
                <Copmonent open={this.state.open} changeState={this.changeState}/>
            )
        }
    }
    
}

export default Hoc;