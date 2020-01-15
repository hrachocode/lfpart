import React from 'react';

export const HOC = ( Component ) => {
    return class extends React.Component{
        constructor(){
            super();
            this.state = {
                open : true,
                openList : false
            }
        }

        changeList = () => {
            this.setState({
                open : !this.state.open,
                openList : !this.state.openList
            })
        }

        changeOpen = () =>{
            this.setState({openList : !this.state.openList})
        }

        render(){
            return(
                <Component  
                    open={this.state.open}
                    openList={this.state.openList}
                    changeList={this.changeList}
                    changeOpen={this.changeOpen}
                />
                
            )
        }
    }
}