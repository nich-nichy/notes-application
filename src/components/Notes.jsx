import React, { useEffect, useState } from 'react'
import Header from './Header';
import CreateArea from './CreateArea';
import Note from './Note';
import Footer from './Footer';
import { useVerifyToken } from '../utils/VerifyRole';
import axios from 'axios';
import Cookies from 'js-cookie';

const url = import.meta.env.VITE_BACKEND_URL;

const Notes = () => {
    useVerifyToken();
    const [notes, setNotes] = useState([]);
    const token = Cookies.get("token");

    useEffect(() => {
        const getNotes = async () => {
            const response = await axios.get(`${url}/notes/get-notes/${token}`);
            if (response.status === 200) {
                setNotes(response.data.data.notes);
            } else {
                throw new Error("Failed to fetch notes from the database.");
            }
        }
        getNotes()
    }, [])

    async function addNote(newNote) {
        if (newNote.title !== "" && newNote.content !== "") {
            try {
                const response = await axios.post(`${url}/notes/save-notes`, { notesData: [...notes, newNote], token });
                if (response.status === 200) {
                    setNotes(prevNotes => [...prevNotes, newNote]);
                } else {
                    throw new Error("Failed to save the note in the database.");
                }
            } catch (error) {
                console.error("Error saving note:", error);
                window.alert("❌ Failed to save the note. Please try again.");
            }
        } else {
            window.alert("⏱️ Please fill out the title and notes fields");
        }
    }

    async function deleteNote(id) {
        try {
            const updatedNotes = notes.filter(note => note.id !== id);
            const response = await axios.put(`${url}/notes/update-note`, {
                notesData: updatedNotes,
                token,
            });

            if (response.status === 200) {
                setNotes(updatedNotes);
                window.alert("✅ Note deleted successfully.");
            } else {
                throw new Error("Failed to update the notes in the database.");
            }
        } catch (error) {
            console.error("Error deleting note:", error);
            window.alert("❌ Failed to delete the note. Please try again.");
        }
    }

    return (
        <>
            <Header />
            <CreateArea onAdd={addNote} />
            {notes?.map((note) => (
                <Note
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    content={note.content}
                    onDelete={deleteNote}
                />
            ))}
            <Footer />
        </>
    );
};


export default Notes