import React from 'react'
import { Button, Card, ProgressBar, Stack } from 'react-bootstrap'
import { currentForatter } from '../utitlies'

function BudgetCart({ name, amount, max, gray, onAddExpenseClick }) {
    const classNames = []
    if (amount > max) {
        classNames.push('bg-danger', 'bg-opacity-10')
    }
    else if (gray) {
        classNames.push('bg-light')
    }
    return (
        <Card className={classNames.join(' ')}>
            <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                    <div className='me-2'>{name}</div>
                    <div className='d-flex align-items-baseline'>
                        {currentForatter.format(amount)}

                        {max && (
                            <span span className='text-muted fs-6 ms-1'>
                                / {currentForatter.format(max)}
                            </span>
                        )}
                    </div>
                </Card.Title>
                {max && (
                    <ProgressBar className='rounded-pill' variant={getProgresBarVariant(amount, max)} min={0} max={max} now={amount} />
                )}
                <Stack gap="2" direction="horizontal" className="mt-4">
                    <Button variant='outline-primary' className="ms-auto" onClick={onAddExpenseClick}>Add Expense</Button>
                    <Button variant='outline-secondary'>View Expense</Button>
                </Stack>
            </Card.Body>

        </Card >
    )
}

export default BudgetCart



function getProgresBarVariant(amount, max) {
    const ration = amount / max
    if (ration < 0.5) return 'primary'
    if (ration < 0.75) return 'warning'
    return 'danger'
}