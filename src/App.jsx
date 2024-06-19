import { useState, useEffect } from 'react';
import React from 'react';
import Input from "./Input";
import './App.css';
import Button from './button';


function App ()
{
  const [ notes, setNotes ] = useState( () =>
  {
    // Initialize state from localStorage
    const savedNotes = localStorage.getItem( 'notes' );
    return savedNotes ? JSON.parse( savedNotes ) : [];
  } );

  const [ title, setTitle ] = useState( '' );
  const [ text, setText ] = useState( '' );
  const [ isEditing, setIsEditing ] = useState( false );
  const [ currentNoteIndex, setCurrentNoteIndex ] = useState( null );

  useEffect( () =>
  {
    // Sync notes with localStorage whenever they change
    localStorage.setItem( 'notes', JSON.stringify( notes ) );
  }, [ notes ] );

  const handleChangeTitle = ( e ) =>
  {
    setTitle( e.target.value );
  };

  const handleChangeText = ( e ) =>
  {
    setText( e.target.value );
  };

  const handleSubmit = ( e ) =>
  {
    e.preventDefault();
    if ( title && text )
    {
      if ( isEditing )
      {
        updateNote( {
          title: title,
          text: text,
          timestamp: new Date().toLocaleString(),
        } );
      } else
      {
        addNote( {
          title: title,
          text: text,
          timestamp: new Date().toLocaleString(),
        } );
      }
      setTitle( '' );
      setText( '' );
      setIsEditing( false );
      setCurrentNoteIndex( null );
    }
  };

  const addNote = ( note ) =>
  {
    setNotes( [ ...notes, note ] );
  };

  const updateNote = ( updatedNote ) =>
  {
    const updatedNotes = notes.map( ( note, index ) =>
      index === currentNoteIndex ? updatedNote : note
    );
    setNotes( updatedNotes );
  };

  const editNote = ( index ) =>
  {
    setCurrentNoteIndex( index );
    setTitle( notes[ index ].title );
    setText( notes[ index ].text );
    setIsEditing( true );
  };

  const deleteNote = ( index ) =>
  {
    const updatedNotes = notes.filter( ( _, i ) => i !== index );
    setNotes( updatedNotes );
    if ( isEditing && currentNoteIndex === index )
    {
      setIsEditing( false );
      setTitle( '' );
      setText( '' );
    }
  };

  return (
    <div className="container">
     
      <h1 className='title'>Notes App</h1>

      <form onSubmit={ handleSubmit }>
        <div className="input">
          <Input

            placeholder="Title"
            value={ title }
            handleChange={ handleChangeTitle }
          />
          <Input
            placeholder="Enter your note here..."
            value={ text }
            handleChange={ handleChangeText }
          />
        </div>
        <Button type='submit' text={ isEditing ? "Update Note" : "Add Note" } />
      </form>

      <ul>
        { notes.map( ( note, index ) => (
          <li key={ index }>
            <strong>{ note.title }</strong> - { note.text } <br />
            <small>{ note.timestamp }</small> <br />
            <div className="edit-button">
            <button onClick={ () => editNote( index ) }>Edit</button>
            <button onClick={ () => deleteNote( index ) }>Delete</button>
            </div>
          </li>
        ) ) }
      </ul>
    </div>
  );
}

export default App;
