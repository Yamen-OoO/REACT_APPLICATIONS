import { useRef } from 'react'
import {Button, Form , Modal} from 'react-bootstrap'
import { useBudget } from '../contexts/BudgetContext'

export default function AddBudgetModal({show , handleClose}){
    let {addBudget} = useBudget()
    const nameRef = useRef()
    const maxRef = useRef()
    function handleSubmit(e){
        e.preventDefault()
        addBudget(
            {
                name : nameRef.current.value,
                max : parseFloat(maxRef.current.value)
            }
        )
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={nameRef} type='text' required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='max'>
                        <Form.Label>Maximum Spending </Form.Label>
                        <Form.Control ref={maxRef} type='number' min={0} step={.01} required />
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button variant="primary" type='submit'>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}