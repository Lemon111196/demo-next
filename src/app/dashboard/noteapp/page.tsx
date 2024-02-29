'use client'
import { Controller, useForm } from "react-hook-form"
import { NoteappContainer, TextFieldStyle } from "./style"
import { Badge, Button, Card, MenuItem, TextField } from "@mui/material"
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "./schema"
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/src/store/store"
import { INote } from "@/src/store/noteStore/interface"
import { createNoteRequest, createNoteSuccess, deleteNoteRequest, deleteNoteSuccess, editNoteRequest, editNoteSuccess, getNoteListRequest, getNoteListSuccess } from "@/src/store/noteStore/noteReducer"
import { useEffect, useState } from "react"
import Dialog from "@/src/components/Dialog"
// import styles from './styles.module.css'
import { toast } from "react-toastify"
import { apiService } from "@/src/services"
// import { apiService } from "@/src/services"


function NoteApp() {

  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.note.notes);
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);
  const [deleteNoteModal, setDeleteNoteModal] = useState<boolean>(false);


  const getStatusBorderColor = (status: any) => {
    switch (status) {
      case 'NORMAL':
        return '#00BFFF';
      case 'HIGHLIGHT':
        return '#00FF00';
      case 'IMPORTANT':
        return '#FF3030';
      default:
        return '#00BFFF';
    }
  }

  //! Get note list
  useEffect(() => {
    dispatch(getNoteListRequest());
  }, [dispatch]);


  //!Create a new note
  const handleCreateNote = async (data: INote) => {

    dispatch(createNoteSuccess(data));
    toast.success('Creating note...');
    reset();
  };


  //!Update a note
  const handleUpdateNote = async (data: INote) => {
    if (selectedNote) {
      dispatch(editNoteSuccess({ id: selectedNote.id, updatedNote: data }));
      toast.success('Updating note...');
      setSelectedNote(null);
    }
  };

  //!Delete a note 
  const handleDeleteNote = () => {
    if (selectedNote) {
      setDeleteNoteModal(true);
    }
  };

  const confirmDeleteNote = async () => {
    if (selectedNote) {
      try {
        await apiService.delete(`/note/delete/${selectedNote.id}`);
        dispatch(deleteNoteSuccess(selectedNote.id));
        toast.success('Deleting note...');
        setSelectedNote(null);
        setDeleteNoteModal(false);
      } catch (error) {
        toast.error('Failed to delete note');
      }
    }
  };


  const formDefaultValues = {
    title: '',
    content: '',
    status: "NORMAL",
  }
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: formDefaultValues
  })

  return (
    <NoteappContainer>
      <div className="createNote">
        <div className="createTitle">
          <Controller
            control={control}
            name="title"
            render={({ field }) =>
              <TextField
                className="text"
                {...field}
                label="Title"
              />}
          />
          {errors.title && (
            <span className="error">{errors?.title?.message?.toString()}</span>
          )}
        </div>
        <div className="createContent">
          <Controller
            control={control}
            name="content"
            render={({ field }) =>
              <TextField
                className="text"
                {...field}
                label="Content"
              />}
          />
          {errors.content && (
            <span className="error">{errors?.content?.message?.toString()}</span>
          )}
        </div>
        <div className="createStatus">
          <Controller
            control={control}
            name="status"
            render={({ field }) =>
              <TextField
                className="select"
                {...field}
                select
                label="Status"
              >
                <MenuItem value="NORMAL">Normal</MenuItem>
                <MenuItem value="IMPORTANT">Important</MenuItem>
                <MenuItem value="HIGHLIGHT">Highlight</MenuItem>
              </TextField>}
          />
        </div>
        <Button
          className="createBtn"
          variant="outlined"
          onClick={handleSubmit(handleCreateNote)}
        >Create</Button>
      </div>
      <div className="note">
        {notes.map((data, index) => (
          <Card key={index} className="card" sx={{ border: `5px solid ${getStatusBorderColor(data.status)}` }}>
            <div className="head">
              <h3>{data.title}</h3>
              <div className="icon">
                <ModeEditOutlineIcon className="edit" onClick={() => setSelectedNote(data)} />
                <DeleteIcon onClick={handleDeleteNote} className="delete" />
              </div>
            </div>
            <Badge className="badge" badgeContent={`${data.status} `} color="secondary" />
            <p className="noteContent">{data.content}</p>
          </Card>
        ))}
      </div>
      <Dialog
        open={!!selectedNote}
        title="Update Note"
        submitBtn="Update"
        onCancel={() => setSelectedNote(null)}
        onSubmit={() => { handleUpdateNote }}
      >
        <div className="text-field-title">
          <TextFieldStyle
            label="Title"
          >
          </TextFieldStyle>
        </div>

        <TextFieldStyle
          className="text-field-content"
          label="Content"
        >
        </TextFieldStyle>
        <TextFieldStyle
          label="Status"
          select
        >
          <MenuItem value="NORMAL">Normal</MenuItem>
          <MenuItem value="IMPORTANT">Important</MenuItem>
          <MenuItem value="HIGHLIGHT">Highlight</MenuItem>
        </TextFieldStyle>
      </Dialog>
      <Dialog
        open={deleteNoteModal}
        title="Delete Note"
        submitBtn="Delete"
        onSubmit={confirmDeleteNote}
        onCancel={() => setDeleteNoteModal(false)}
      >
        <p>Are you sure you want to delete this note?</p>
      </Dialog>
    </NoteappContainer>
  )
}

export default NoteApp