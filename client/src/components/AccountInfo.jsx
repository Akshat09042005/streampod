import React, { useState } from "react";
import { Modal} from "@mui/material";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { openSnackbar } from "../redux/snackbarSlice";  
const CLOSEBUTTON = styled.div`
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  width: 100%;
  max-width: 70px;
  padding: 8px 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  /* Disabled state styling */
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    pointer-events: none; /* Prevent click events */
    cursor: not-allowed; /* Change cursor */
  `}
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
max-width: 500px;
width: 100%;
border-radius: 16px;
margin: 50px 20px;
height: min-content;
background-color: ${({ theme }) => theme.card};
color: ${({ theme }) => theme.text_primary};
padding: 10px;
display: flex;
flex-direction: column;
position: relative;
align-items: center;
flex-wrap: nowrap;
`;

const TextInput = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text_secondary};
`;

const LoginText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin: 20px 20px 30px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OutlinedBox = styled.div`
  height: 44px;
  width: 75%;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  color: ${({ theme }) => theme.text_secondary};
  ${({ googleButton, theme }) =>
    googleButton &&
    `
  user-select: none; 
gap: 16px;`}
  ${({ button, theme }) =>
    button &&
    `
  user-select: none; 
border: none;
  background: ${theme.button};
  color:'${theme.bg}';`}
  ${({ activeButton, theme }) =>
    activeButton &&
    `
  user-select: none; 
border: none;
  background: ${theme.primary};
  color: white;`}
margin: 3px 20px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding: 0px 14px;
`;
const ModalButton = styled.div`
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  width: 100%;
  max-width: 70px;
  padding: 8px 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  /* Disabled state styling */
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    pointer-events: none; /* Prevent click events */
    cursor: not-allowed; /* Change cursor */
  `}
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

function AccountInfo() {
  
const  dispatch = useDispatch();
  const [open, setOpen] = useState(false); // State to manage the modal open/close

  // Function to handle opening the modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to handle closing the modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <p style={{padding:'0px'}} onClick={handleOpen}>Withdraw</p>
      <Modal open={open} onClose={handleClose} style={{ color: "white" }}>
        <Container>
         <Wrapper>
         <h1>Enter Bank Details</h1>
          <OutlinedBox>
            <TextInput placeholder="Account Name" type="text"></TextInput>
          </OutlinedBox>
          <br />
          <OutlinedBox>
            <TextInput placeholder="Account Number" type="text"></TextInput>
          </OutlinedBox>
          <br /><OutlinedBox>
            <TextInput placeholder="IFSC Code" type="text"></TextInput>
          </OutlinedBox>
          <br />
          <CLOSEBUTTON onClick={()=>{
            {
              handleClose();
              dispatch(
                openSnackbar({
                  message: "Saved Successfully",
                  severity: "success",
                })
              );
            }
          }}>Save</CLOSEBUTTON>
         </Wrapper>

        </Container>
    

      </Modal>
    </>
  );
}

export default AccountInfo;
