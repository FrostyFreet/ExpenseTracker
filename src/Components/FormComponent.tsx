import {useState } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ChartComponent from './ChartComponent';
import './FormComponent.css';
interface Transaction{
    transaction:string,
    amount:number,
}


export default function FormComponent(){
    const[optionType,setOptionType]=useState<string>("expense")
    function handleOptionChange(e:React.ChangeEvent<HTMLSelectElement>){
        const option=e.target.value
        setOptionType(option)
    }

    const[transaction,setTransaction]=useState<string>("")
    function handleTransaction(e:React.ChangeEvent<HTMLInputElement>){
        const transaction=String(e.target.value)
        setTransaction(transaction)
    
    }

    const[amount,setAmount]=useState<number|"">("")
    function handleAmount(e:React.ChangeEvent<HTMLInputElement>){
        const amount=Number(e.target.value)
        setAmount(Number(amount))
    }
  
    
    const[expense,setExpense]=useState<Transaction[]>([])
    const[income,setIncome]=useState<Transaction[]>([])


    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        const isValidTransaction = /^[a-zA-Z\s]+$/.test(transaction);
        e.preventDefault()
         if(optionType==='expense' && transaction!=="" && Number(amount)>0 && isValidTransaction){
            setExpense((prevState)=>([ 
                ...prevState,
                {
                    transaction:transaction.trim(),
                    amount:Number(amount),
                }])
            )
         }
         else if(transaction !== "" && Number(amount) > 0 && isValidTransaction){
            setIncome((prevState)=>([ 
                ...prevState,
                {
                    transaction:transaction.trim(),
                    amount:Number(amount),
                }])
            )
         }
      
        setTransaction("");
        setAmount(0);
        setOptionType("expense");
    }
   
    return(
        <>
         <div className="form-container">
            <Form onSubmit={handleSubmit} className="form">
                <Row>
                    <Col>
                        <Form.Label className='mR-3'>Transaction Type </Form.Label> 
                        <Form.Select aria-label="Default select example" value={optionType} onChange={handleOptionChange} name={"option"} required>      
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </Form.Select>
                    </Col>
                    
                    <Col>
                        <Form.Label>Transaction name </Form.Label> 
                        <Form.Control placeholder="Transaction name" type='text' name="transaction" value={transaction} onChange={handleTransaction} required/>
                    </Col>
                   
                    <Col>
                        <Form.Label>Amount </Form.Label> 
                        <Form.Control placeholder="Amount $" type='number' name='amount' value={amount} onChange={handleAmount} required/>
                    </Col>
                </Row>
                <Button type='submit' variant="success">Submit</Button>
            </Form>
            <ChartComponent expense={expense} income={income}/> 
            </div>
        </>
    )
}