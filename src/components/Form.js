import React, {useState, useContext} from 'react'
import {AlertContext} from '../context/alert/alertContext'
import {FirebaseContext} from "../context/firebase/firebaseContext";

export const Form = () => {
    const [value, setValue] = useState('')
    const alert = useContext(AlertContext)
    const firebase = useContext(FirebaseContext)

    const submitHandler = event => {
        event.preventDefault()

        if (value.trim()) {
            firebase.addNote(value.trim()).then(() => {
                alert.show('Note was created', 'success')
            }).catch(err => {
                alert.show(err.message, 'danger')
            })
            setValue('')
        } else {
            alert.show('Input note')
        }
    }
    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <input 
                    type="text"
                    className="form-control"
                    placeholder="Input note name"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
        </form>
    )
}