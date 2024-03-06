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
import { createNoteSuccess, deleteNoteSuccess, getNoteListSuccess, updateNoteSuccess } from "@/src/store/noteStore/noteReducer"
import { useEffect, useState } from "react"
import Dialog from "@/src/components/Dialog"
import { toast } from "react-hot-toast"
import { apiService } from "@/src/services"




function NoteApp() {

  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.note.notes);
  const [deleteNoteModal, setDeleteNoteModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<INote | null>();


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

  const getNoteList = async () => {
    try {
      const response = await apiService.get('note/list');
      console.log(response);
      if (response.status === 200) {
        dispatch(getNoteListSuccess(response.data.notes));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNoteList()
  }, [dispatch]);



  //!Create a new note
  const handleCreateNote = async (data: INote) => {
    try {
      const response = await apiService.post(`/note/create`, data)
      if (response.status === 201) {
        dispatch(createNoteSuccess(data));
        toast.success("Created successfully")
      }
      toast.success('Successfully created');
      reset();
    } catch (error) {
      toast.error('Failed to create')
    }
  };

  // //! Get note details

  const getNoteDetail = async (id: string) => {
    try {
      const response = await apiService.get(`/note/detail/${id}`)
      if (response.status === 200) {
        const noteDetail = response.data.note;
        return noteDetail;
      }
    } catch (error) {
      console.error('Failed to get note detail', error);
    }
  };

  //!Update a note
  const openUpdateModal = (data: INote) => {
    setUpdateModal(true);
    setValueUpdate("id", data._id);
    setValueUpdate("title", data.title);
    setValueUpdate("content", data.content);
    setValueUpdate("status", data.status);
  }
  const handleUpdateNote = async (data: any) => {
    try {
      if (selectedItem) {
        console.log('selectedItem', selectedItem);
        await apiService.put(`/note/update/${selectedItem._id}`)
        dispatch(updateNoteSuccess(data))
      }
    } catch (error) {
      console.log(error);
    } finally{
      setUpdateModal(false);
      setSelectedItem(null);
    }
  }

  //!Delete a note 
  const handleDeleteNote = (id: string) => {
    setDeleteNoteModal(true);
    setSelectedItem(notes.find(note => note._id === id));
    // console.log(selectedItem);
  };

  const confirmDeleteNote = async () => {
    console.log(`selectedItem`, selectedItem);
    try {
      if (selectedItem) {
        await apiService.delete(`/note/delete/${selectedItem._id}`);
        dispatch(deleteNoteSuccess(selectedItem._id));
        toast.success('Successfully deleted');
      }
    } catch (error) {
      toast.error('Failed to delete note');
    } finally {
      setDeleteNoteModal(false);
      setSelectedItem(null);
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

  const {
    handleSubmit: handleSubmitUpdate,
    control: controlUpdate,
    reset: resetUpdate,
    setValue: setValueUpdate,
    formState: { errors: errorsUpdate },
    watch: watchUpdate,
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: formDefaultValues,
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
                <ModeEditOutlineIcon className="edit" onClick={() => openUpdateModal(data)} />
                <DeleteIcon onClick={() => handleDeleteNote(data._id)} className="delete" />
              </div>
            </div>
            <Badge className="badge" badgeContent={`${data.status} `} color="secondary" />
            <p className="noteContent">{data.content}</p>
          </Card>
        ))}
      </div>
      <Dialog
        open={updateModal}
        title="Update Note"
        submitBtn="Update"
        onCancel={() => setUpdateModal(false)}
        onSubmit={() => { handleSubmitUpdate(handleUpdateNote) }}
      >
        <div className="text-field-title">
          <Controller
            control={controlUpdate}
            name="title"
            render={({ field }) =>
              <TextFieldStyle
                className="text"
                {...field}
                label="Title"
              />}
          />
        </div>

        <Controller
          control={controlUpdate}
          name="content"
          render={({ field }) =>
            <TextFieldStyle
              className="text-field-content"
              {...field}
              label="Content"
            />}
        />
        <Controller
          control={controlUpdate}
          name="status"
          render={({ field }) =>
            <TextFieldStyle
              label="Status"
              {...field}
              select
            >
              <MenuItem value="NORMAL">Normal</MenuItem>
              <MenuItem value="IMPORTANT">Important</MenuItem>
              <MenuItem value="HIGHLIGHT">Highlight</MenuItem>
            </TextFieldStyle>
          }
        />
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