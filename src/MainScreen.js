import React, { useEffect, useMemo, useState } from "react";
import {
  getGithubUser,
  getProfile,
  postLikeGithubUser,
  postRequestPin,
  getGithubUsers,
  postValidatePin,
} from "./api/index";
import "./MainScreen.scss";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement('#root');

export default function MainScreen() {
  const [searchTearm, setsearchTearm] = useState("");
  const [searchRes, setsearchRes] = useState([]);
  const [likedRes, setLikedRes] = useState([]);
  const [searchType, setsearchType] = useState(1);
  const [mob, setMob] = useState(12345);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    let hex = localStorage.getItem("mobileNo");
    if (!!hex) {
      setMob(hex);
    }
  }, []);

  async function searchUser() {
    let user = await getGithubUser(searchTearm);
    setsearchRes(user);
  }
  async function searchUsers(page, per_page, q) {
    let hex = localStorage.getItem("mobileNo");
    let users = await getGithubUsers(page, per_page, q, hex);
    console.log(users);
    setsearchRes(users);
  }

  function navThisPage(param) {
    searchUsers(param);
  }

  async function getLikedUsers(){
    let hex = localStorage.getItem("mobileNo");
    let likedList = await getProfile(hex);
    setLikedRes(likedList);
    setModal(true);
  }

  async function likeUser(param) {
    let hex = localStorage.getItem("mobileNo");
    await postLikeGithubUser(hex, param);
    // setsearchRes((currentRes)=>currentRes.map(e=>e.liked=true));
  }

  function searchChooser() {
    console.log(searchType);
    if (searchType == 1) {
      if (!!searchTearm) {
        searchUser();
      }
    } else {
      searchUsers();
    }
  }

  const ProfileCard = (item) => {
    return (
      <div className="pro-card">
        <div className="pro-img">
          <img src={item.avatar_url} />
        </div>
        <div className="pro-txt">
          <p>Followers: {item.followers}</p>
        </div>
        <div className="pro-txt">
          <p>Id: {item.id}</p>
        </div>
        <div className="pro-txt">
          <p>Login: {item.login}</p>
        </div>
        <div className="pro-txt">
          <p>Public Repos: {item.public_repos}</p>
        </div>
        <button>Like</button>
      </div>
    );
  };

  const LikedCard = (item) => {
    return (
      <div className="like-card">
        <div className="like-img">
          <img src={item.avatar_url} />
        </div>
        <div className="like-txt">
          <p>Followers: {item.followers}</p>
        </div>
        <div className="like-txt">
          <p>Id: {item.id}</p>
        </div>
        <div className="like-txt">
          <p>Login: {item.login}</p>
        </div>
        <div className="like-txt">
          <p>Public Repos: {item.public_repos}</p>
        </div>
      </div>
    );
  };

  const SearchTerm = (item) => {
    return (
      <div className="pro-card">
        <div className="pro-img">
          <img src={item.avatar_url} />
        </div>
        <div className="pro-txt">
          <p>id: {item.id}</p>
        </div>
        {searchTearm !== "id" ? (
          <div className="pro-txt">
            <p>
              {searchTearm}: {item[searchTearm]}
            </p>
          </div>
        ) : (
          ""
        )}
        <button
          className={!!item?.liked ? "liked" : "not-liked"}
          onClick={() => likeUser(item.id)}
        >
          Like
        </button>
      </div>
    );
  };

  const likedPeople = useMemo(()=>{
    return likedRes.map((user) => <LikedCard {...user} />);
  },[likedRes]);

  const renderCard = useMemo(() => {
    if (!!searchRes && Object.keys(searchRes).length !== 0) {
      if (searchType == 1) {
        return <ProfileCard {...searchRes} />;
      } else {
        // console.log("here");
        return searchRes.content.map((user) => <SearchTerm {...user} />);
      }
    }
  }, [searchRes]);

  const rendePagination = useMemo(() => {
    if (!!searchRes && Object.keys(searchRes).length !== 0) {
      if (searchType == 1) {
        return <></>;
      } else {
        let { current_page } = searchRes;
        const paginationList = [];
        for (let index = 0; index < searchRes.pages; index++) {
          paginationList.push(
            <div
              className={
                index == current_page
                  ? "current pag-number"
                  : "pag-norm pag-number"
              }
            >
              <button onClick={() => navThisPage(index)} className="pag-t">
                {index}
              </button>
            </div>
          );
        }
        return paginationList;
      }
    }
  }, [searchRes]);

  return (
    <div className="container">
      <Modal isOpen={modal} style={customStyles} contentLabel="Example Modal">
        <div className="modal">
          <div className="close-btn">
            <button onClick={() => setModal(false)}>X</button>
          </div>
          <div>
            <p>Hello user {mob}</p>
          </div>
          <div className="grid-set">{likedPeople}</div>
        </div>
      </Modal>
      <div className="nav">
        <div className="search-wrapper">
          <input
            placeholder="Search"
            value={searchTearm}
            onChange={(e) => setsearchTearm(e.target.value)}
          />
          <button className="search-btn" onClick={searchChooser}>
            Search
          </button>
          <select
            onChange={(e) => setsearchType(e.target.value)}
            className="search-opt"
          >
            <option value={1}>user search</option>
            <option value={2}>key search </option>
          </select>
        </div>
        <div className="profile">
          <button onClick={getLikedUsers}>P</button>
        </div>
      </div>
      <div className="main-container">
        <div className="card-container">{!!searchRes && renderCard}</div>
        <div className="pagination">{rendePagination}</div>
      </div>
    </div>
  );
}
