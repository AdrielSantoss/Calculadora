import React, {Component} from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0
}

export default class Calculator extends Component {

    state = {...initialState}

    ClearMemory(){
        this.setState({...initialState})
    }
    setOperation(operation){
        if(this.state.current === 0){
            this.setState({operation, current:1, clearDisplay: true})
        }else {
            const equals = operation === "="
            const currentOperation = this.state.operation
            const values = [...this.state.values]
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)

            }catch(e){
                values[0] = this.state.values[0]
            }
            values[1] = 0
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })

        }
    }

    addDigit(n){
        if(n === '.' && this.state.displayValue.includes('.')){
            return 
        }
        const clearDisplay = this.state.displayValue === "0" || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({displayValue: displayValue, clearDisplay: false})

        if(n != "."){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values})
            console.log(values)
        }
        
    }
     
    render(){
        const addDigit = n => this.addDigit(n)
        const setOperation = op => this.setOperation(op)
        let labels = ["AC","/","7","8","9","*","4","5","6","-",
        "1","2","3","+","0",".","="]
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>

                {labels.map((i)=>{
                    if(i === "AC") {
                        return <Button triple label = {i} click={()=>this.ClearMemory()}/>
                    }
                    else if(i === "/" || i === "+" || i === "-" || i === "*" || i==="="){
                        return <Button operation label = {i} click={()=>this.setOperation(i)}/>
                    }else {
                        if(i === "0"){
                            return <Button double label = {i} click={()=>this.addDigit(i)}/>
                        }
                        return <Button label = {i} click={()=>this.addDigit(i)}/>
                    }
                })}
            </div>
        )
    }
}
