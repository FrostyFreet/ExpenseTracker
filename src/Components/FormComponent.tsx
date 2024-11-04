import { useState } from 'react';
import { Button, Col, Form, Row, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChartComponent from './ChartComponent';
import './FormComponent.css';

interface Transaction {
    transaction: string;
    amount: number;
}

export default function FormComponent() {
    const [optionType, setOptionType] = useState<string>("expense");
    const [transaction, setTransaction] = useState<string>("");
    const [amount, setAmount] = useState<number | "">("");
    const [expense, setExpense] = useState<Transaction[]>([]);
    const [income, setIncome] = useState<Transaction[]>([]);
    const [validated, setValidated] = useState(false);
    function handleOptionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const option = e.target.value;
        setOptionType(option);
    }

    function handleTransaction(e: React.ChangeEvent<HTMLInputElement>) {
        const transaction = String(e.target.value);
        setTransaction(transaction);
    }

    function handleAmount(e: React.ChangeEvent<HTMLInputElement>) {
        const amount = Number(e.target.value);
        setAmount(amount);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const isValidTransaction = /^[a-zA-Z\s]+$/.test(transaction);
        if (!isValidTransaction) {
            setValidated(true);
            return; 
        }
        if (optionType === 'expense' && transaction !== "" && Number(amount) > 0 && isValidTransaction) {
            setExpense((prevState) => ([
                ...prevState,
                {
                    transaction: transaction.trim(),
                    amount: Number(amount),
                }
            ]));
        } else if (transaction !== "" && Number(amount) > 0 && isValidTransaction) {
            setIncome((prevState) => ([
                ...prevState,
                {
                    transaction: transaction.trim(),
                    amount: Number(amount),
                }
            ]));
        }
        setTransaction("");
        setAmount(0);
        setOptionType("expense");
        setValidated(false);
    }

    return (
        <>
            <Card className="form-container">
                <Card.Body>
                    <Card.Title className="text-center">Add Transaction</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Label>Transaction Type</Form.Label>
                                <Form.Select value={optionType} onChange={handleOptionChange} required>
                                    <option value="expense">Expense</option>
                                    <option value="income">Income</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Label>Transaction Name</Form.Label>
                                <Form.Control placeholder="Transaction name" type='text' value={transaction} onChange={handleTransaction} isValid={validated && /^[a-zA-Z\s]+$/.test(transaction)} isInvalid={!/^[a-zA-Z\s]*$/.test(transaction)} required />
                                <Form.Control.Feedback type='invalid'>Name can not contain numbers</Form.Control.Feedback>
                            </Col>
                            <Col>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control placeholder="Amount $" type='number' value={amount} onChange={handleAmount} required />
                            </Col>
                        </Row>
                        <Button type='submit' variant="primary" className="mt-3">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
            <ChartComponent expense={expense} income={income} />
        </>
    );
}
