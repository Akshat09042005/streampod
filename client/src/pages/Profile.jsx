import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getUsers } from "../api/index";
import { PodcastCard } from "../components/PodcastCard.jsx";
import AccountInfo from "../components/AccountInfo.jsx";
import { openAccountInfo } from "../redux/accountInfo.jsx";


const ProfileAvatar = styled.div`
  padding-left: 3rem;
  @media (max-width: 768px) {
    padding-left: 0rem;
  }
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 768px) {
    align-items: center;
  }
`;
const ProfileName = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 34px;
  font-weight: 500;
`;
const Profile_email = styled.div`
  color: #2b6fc2;
  font-size: 14px;
  font-weight: 400;
`;
const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  ${({ box, theme }) =>
    box &&
    `
background-color: ${theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`}
`;
const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Span = styled.span`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
  &:hover {
    transition: 0.2s ease-in-out;
  }
`;
const Podcasts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 18px 6px;
  @media (max-width: 550px) {
    justify-content: center;
  }
`;
const ProfileMain = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const UserDetails = styled.div`
display flex;
gap: 120px;
@media (max-width: 768px) {
    width: fit-content;
    flex-direction: column; 
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonContainer = styled.div`
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

var totalAudioViews = 0,
  totalPay = 0,
  totalVideoViews = 0;

const Profile = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("podstreamtoken");
  const getUser = async () => {
    await getUsers(token)
      .then((res) => {
        setUser(res.data);
        setName(res.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (currentUser) {
      getUser();
    }
  }, [currentUser]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  user?.podcasts.map(
    (podcast) => (
      podcast.type === "video" ? totalVideoViews++ : totalAudioViews++,
      (totalPay += podcast.type === "video" ? 0.012 : 0.006)
    )
  );
  return (

    <ProfileMain>
      <UserDetails>
        <ProfileAvatar>
          <Avatar
            sx={{ height: 165, width: 165, fontSize: "24px" }}
            src={user?.img}
          >
            {user?.name.charAt(0).toUpperCase()}
          </Avatar>
        </ProfileAvatar>

        <ProfileContainer>
          <ProfileName>{name}</ProfileName>
          <Profile_email>Email: {user?.email}</Profile_email>
        </ProfileContainer>
      </UserDetails>
      {currentUser && user?.podcasts.length > 0 && (
        <FilterContainer box={true}>
          <Topic>Your Uploads</Topic>
          <Podcasts>
            {user?.podcasts.map((podcast) => (
              <PodcastCard podcast={podcast} user={user} />
            ))}
          </Podcasts>
        </FilterContainer>
      )}
      {currentUser && user?.podcasts.length === 0 && (
        <FilterContainer box={true}>
          <Topic>Your Uploads</Topic>
          <Container>
            <ButtonContainer>Upload</ButtonContainer>
          </Container>
        </FilterContainer>
      )}
      <FilterContainer box={true}>
        <Topic>Your Favourites</Topic>
        <Podcasts>
          {user &&
            user?.favorits.map((podcast) => (
              <PodcastCard podcast={podcast} user={user} />
            ))}
        </Podcasts>
      </FilterContainer>
      <FilterContainer style={{ color: "white", fontWeight: "600", lineHeight: "2rem" }} box={true}>
        <Topic>Payouts</Topic>
        Total Views This Month :
            <ul>
              <li>Video Podcast Views : {totalVideoViews}</li>
              <li>Audio Podcast Views : {totalAudioViews}</li>
            </ul>
           
            Earnings : {totalPay}
        {currentUser && user?.podcasts.length > 0 && (
          <FilterContainer
            box={true}
            
          >
           
            
            <Container>
              <ButtonContainer onClick={handleOpen}>
                 <AccountInfo open={open} />
              </ButtonContainer>
            </Container>
            <Topic>How It Works?</Topic>
            <ul style={{ fontWeight: "400" }}>
              <li>
                You Earn 0.006 USD per view on your Audio uploads and 0.012 USD
                per view on Video Uploads.
              </li>

              <li>
                You can withdraw your earnings after you have a total balance of
                USD 50.
              </li>

              <li>T&C Applied</li>
            </ul>
          </FilterContainer>
        )}
      </FilterContainer>
     
    </ProfileMain>
  );
};

export default Profile;

