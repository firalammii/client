import React, {Component} from "react";

class App2 extends Component {
    constructor(props){
        super(props)
        this.state ={
            name: "Firoma"
        }
    }

    render(){
        return(
            <h2>hello from App2 component</h2>
        )
    }
}

export default App2;