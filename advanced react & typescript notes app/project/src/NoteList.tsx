import { Row, Col, Button, Stack, Form, Card, Badge, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from 'react-select'
import { Tag } from './App'
import { useMemo, useState } from "react";
import styles from './NotesList.module.css'


type NoteListProps = {
    availablesTags: Tag[]
    notes: SimplifiedNote[]
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string) => void
}

type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}
type EditTagsModalProps = {
    show: boolean
    availablesTags: Tag[]
    handleClose: () => void
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string) => void

}

export function NoteList({ availablesTags, notes, onUpdateTag, onDeleteTag }: NoteListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState("")
    const [editTagsModalIsOpen, setEditTAgsModalIsOpen] = useState(false)

    const filtredNotes = useMemo(() => {
        // we returned the filtred notes
        // filter notes depending on title and selectedtags
        // if you entred no title , or didnt select any tag ==> reutrn all the notes
        return notes.filter(note => {
            return (
                (title === '' || note.title.toLowerCase().includes(title.toLocaleLowerCase())) &&
                (selectedTags.length === 0 ||
                    // for every selected tag like CSS JS HTMl ===> check all the notes that has some of these tags
                    selectedTags.every(tag => {
                        note.tags.some(noteTag => noteTag.id === tag.id)
                    }))
            )
        })
    }, [title, selectedTags, notes])



    return (
        <>
            <Row className="align-itmes-center mb-4">
                <Col>
                    <h1>NOTES</h1>
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to='/new'>
                            <Button variant="primary">Create</Button>
                        </Link>
                        <Button onClick={() => setEditTAgsModalIsOpen(true)} variant="outline-secondary">Edit Tags</Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Tilte</Form.Label>
                            <Form.Control type='text' value={title} onChange={e => setTitle(e.target.value)} />
                        </Form.Group>
                    </Col>


                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect isMulti

                                // its option must be objects


                                value={selectedTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}


                                options={availablesTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}


                                onChange={tags => {
                                    // selectedTags is [{} , {}] ...this array containes tags objects {label :'html' , id : 4}
                                    setSelectedTags(tags.map(tag => {
                                        return { label: tag.label, id: tag.value }
                                    })
                                    )
                                }}



                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
                {filtredNotes.map(note => (
                    <Col key={note.id}>
                        <NoteCard id={note.id} title={note.title} tags={note.tags} />
                    </Col>
                ))}
            </Row>
            <EditTagsModal show={editTagsModalIsOpen} handleClose={() => setEditTAgsModalIsOpen(false)} availablesTags={availablesTags} onUpdateTag={onUpdateTag} onDeleteTag={onDeleteTag} />
        </>
    )
}


function NoteCard({ id, title, tags }: SimplifiedNote) {
    return <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`} >
        <Card.Body>
            <Stack className="align-items-center justify-content-center h-100">
                <span className="fs-5">{title}</span>
                {tags.length > 0 && (
                    <Stack gap={1} direction="horizontal" className='justify-content-center flex-wrap'>
                        {tags.map(tag => (
                            <Badge key={tag.id}>
                                {tag.label}
                            </Badge>
                        ))}
                    </Stack>
                )}

            </Stack>
        </Card.Body>
    </Card>
}



function EditTagsModal({ availablesTags, handleClose, show, onUpdateTag, onDeleteTag }: EditTagsModalProps) {
    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Stack gap={2}>
                    {availablesTags.map(tag => (
                        <Row key={tag.id}>
                            <Col>
                                <Form.Control type='text' value={tag.label} onChange={(e) => onUpdateTag(tag.id, e.target.value)} />
                            </Col>
                            <Col xs="auto">
                                <Button onClick={() => onDeleteTag(tag.id)} variant="outline-danger">
                                    &times;
                                </Button>
                            </Col>
                        </Row>
                    ))}
                </Stack>
            </Form>
        </Modal.Body>
    </Modal>
}