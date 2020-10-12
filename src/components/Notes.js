import React, {useContext} from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {AlertContext} from "../context/alert/alertContext";

export const Notes = ({notes, onRemove}) => {
    const alert = useContext(AlertContext)

    const remove = note => {
        onRemove(note.id).then(() => {
            alert.show('Note was removed', 'success')
        })
    }

    if (!notes || !notes.length) {
        return (<p>There is no notes yet</p>)
    }

    return (
        <TransitionGroup component="ul" className="list-group">
            {notes.map(note => (
                <CSSTransition
                    key={note.id}
                    timeout={800}
                    classNames="note"
                >
                    <li className="list-group-item note">
                        <div>
                            <strong>{note.title}</strong>
                            <small>{new Date(note.date).toLocaleDateString()}</small>
                        </div>

                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => remove(note)}
                        >
                            &times;
                        </button>
                    </li>
                </CSSTransition>
            ))}
        </TransitionGroup>
    )
}