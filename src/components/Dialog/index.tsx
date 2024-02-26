import { Button } from "@mui/material";
import IProps from "./interface";
import { ModalContainer } from "./style";

export default function Dialog(props: IProps) {
  const { open, title, submitBtn, onCancel, onSubmit, children } = props
  return (
    <ModalContainer open={open}>
      <div className="dialog-container">
        <h2 className="header">{title}</h2>
        <div className="modal-body">
          {children}
        </div>
        <div className="group-btn">
          <Button onClick={onCancel} color="error" className="cancel" variant="outlined">Cancel</Button>
          <Button onClick={onSubmit} className="confirm" variant="outlined"
          >{submitBtn ?? "OK"}</Button>
        </div>
      </div>
    </ModalContainer>
  )
}

