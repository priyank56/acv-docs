import React, { useState } from "react";
import axios from "axios";

import { Input } from "@fluentui/react-northstar";
import { Grid, Segment, SearchIcon } from "@fluentui/react-northstar";

import { useTranslation } from "react-i18next";
import * as Icon from "react-feather";

import parse from "html-react-parser";
import i18n from "../Helper/i18n";
import Icon1 from "../Assets/images/Icon.png";
import contactIcon from "../Assets/images/contact-list-icon.png";

import "./assets/css/quick-website.scss";
import "./Docs.css";
const URL = "https://acv-backend-demo.azurewebsites.net";

const Docs = () => {
  const { t } = useTranslation();
  const [selLan, setSelLan] = useState(i18n.language);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isChecked, setIsChecked] = React.useState(true);

  let logKey = (e) => {
    if (e.which === 191 && searchInput === "") {
      console.log("search-Inp - ", searchInput);
      document.getElementById("searchBtn").click();
    }
    document.getElementById("searchInp")?.focus();
  };

  document.addEventListener("keydown", logKey);
  let searchRes = [];
  const searchHandler = (docs) => {
    docs.forEach((doc) => {
      doc.data.forEach((dat) => {
        if (dat?.content) {
          dat.content?.map((data, ttl) => {
            if (
              data?.item
                ?.toString()
                .toLowerCase()
                .includes(searchInput?.toString().toLowerCase())
            ) {
              searchRes.push({
                cat: doc.category,
                title: dat.title,
                item: data.item,
                link: dat.link,
              });
            }
          });
        } else if (dat?.title?.toString().includes(searchInput)) {
          searchRes.push({
            cat: doc.category,
            title: dat.title,
            link: dat.link,
          });
        }
      });
    });
    setSearchResult(searchRes);
    console.log(searchRes);
  };
  React.useEffect(() => {
    if (searchInput?.length >= 3) {
      searchHandler(t("Docs"));
    } else {
      searchHandler([]);
    }
  }, [searchInput]);

  const typeRenderHandler = (content, key) => {
    const src1 =
      content?.type === "img"
        ? require(`./assets/images/${content?.item}`).default
        : "";
    return content?.type === "info" ? (
      <p key={"p" + key}>{parse(content?.item)}</p>
    ) : content?.type === "text" ? (
      parse(content?.item)
    ) : content?.type === "img" ? (
      <img
        key={"img" + key}
        src={src1}
        alt="ACV - Asistente de Aula Virtual | Docs"
        className="docsImg img-fluid"
      />
    ) : content?.type === "list" ? (
      <ul>
        {content?.item?.map((item, keyNew) => {
          let src2 =
            item?.type === "img"
              ? require(`./assets/images/${item?.item}`).default
              : "";
          return (
            <li
              className={item?.type !== "text" ? "styleNone" : ""}
              key={"list" + key + keyNew}
            >
              {item?.type === "text" ? (
                parse(item?.item)
              ) : item?.type === "img" ? (
                <img
                  src={src2}
                  alt="ACV - Asistente de Aula Virtual | Docs"
                  className="docsImg img-fluid"
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    ) : null;
  };
  const contentRenderHandler = (content, key) => {
    return (
      <ul>
        {content?.content?.map((content, keyNew) => {
          return (
            <li
              className={content?.type !== "text" ? "styleNone" : ""}
              key={"li" + key + keyNew}
            >
              {typeRenderHandler(content, key + keyNew)}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <Grid
      columns="repeat(4, 1fr)"
      rows="100vh"
      className={
        selLan === "hi"
          ? "Docs Karla fs16 btsp font-Mukta"
          : "Docs Karla fs16 btsp"
      }
    >
      <Segment
        color="white"
        content={
          <>
            <ul
              className="p-0 m-0"
              style={{
                backgroundColor: "rgb(243, 242, 241)",
                borderBottom: "1px solid rgb(214, 214, 214)",
              }}
            >
              <li
                className="nav-item nav-item-spaced dropdown dropdown-animate cur-pointer"
                data-toggle="hover"
                style={{ display: "block" }}
              >
                <div
                  style={{
                    height: "75px",
                    backgroundColor: "rgb(243, 242, 241)",
                    display: "flex",
                  }}
                >
                  <img
                    src={Icon1}
                    title="Tangible IT"
                    style={{
                      margin: "15px 0px 0px 31px",
                      maxHeight: "58px",
                      width: "58px",
                      borderRadius: "6px",
                      backgroundSize: "cover",
                      margin: "auto",
                    }}
                    onClick={() => (window.location.href = "/")}
                  />
                  <h6
                    className="btn_contact_us btn btn-primary"
                    data-toggle="modal"
                    data-target="#contactUs-model"
                  >
                    <span className="contact_icon_span">
                      <img src={contactIcon} />
                    </span>
                    Contactar a soporte
                  </h6>
                </div>
              </li>
              <li
                className="nav-item nav-item-spaced dropdown dropdown-animate cur-pointer"
                data-toggle="hover"
                style={{ width: "-webkit-fill-available" }}
              >
                <div className="Sidebar-header-row">
                  <div className="Search-wrapper">
                    <button
                      type="button"
                      className="Search-searchbar"
                      id="searchBtn"
                      data-toggle="modal"
                      data-target="#searchModal"
                      style={{ borderRadius: "4px" }}
                    >
                      <div className="SVGInline SVGInline--cleaned SVG Icon Icon--search SearchIcon SVG--color SVG--color--gray200 Box-root Flex-flex">
                        {/* <svg
                          className="SVGInline-svg SVGInline--cleaned-svg SVG-svg Icon-svg Icon--search-svg SearchIcon-svg SVG--color-svg SVG--color--gray200-svg"
                          style={{ width: "12px", height: "12px" }}
                          height="16"
                          viewBox="0 0 16 16"
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.6 11.2c.037.028.073.059.107.093l3 3a1 1 0 1 1-1.414 1.414l-3-3a1.009 1.009 0 0 1-.093-.107 7 7 0 1 1 1.4-1.4zM7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z"
                            fillRule="evenodd"
                          ></path>
                        </svg> */}
                      </div>
                      {/* <input type="text" placeholder="Find anything" className="search-Inp" id="searchInp" value={searchInput} onChange={e=>setSearchInput(e.target.value)}/> */}
                      {t("DocsLables")["0"]}
                      <kbd className="Search-searchbar-kbd">/</kbd>
                    </button>
                  </div>
                </div>
              </li>

              <li
                className="nav-item nav-item-spaced"
                data-toggle="hover"
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "100px",
                  listStyleType: "none",
                }}
              >
                <a
                  className="btn btn-sm btn-outline-primary btn-icon ml-3 px-2 py-1 rounded-pill"
                  role="button"
                  data-toggle="dropdown"
                  style={{ background: "white" }}
                >
                  <span className="btn-inner--icon">
                    <Icon.Globe size="16" />
                  </span>{" "}
                  <span>
                    {selLan === "en"
                      ? "EN"
                      : selLan === "es"
                      ? "ES"
                      : selLan === "fr"
                      ? "FR"
                      : selLan === "pt"
                      ? "PT"
                      : selLan === "hi"
                      ? "HI"
                      : navigator.language || navigator.userLanguage}
                  </span>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-sm p-0 mt-1 Karla"
                  style={{ marginRight: "-100px", position: "initial" }}
                >
                  <ul className="list-group list-group-flush px-lg-4">
                    <li
                      className="dropdown dropdown-animate dropdown-submenu radius-none"
                      data-toggle="hover"
                    >
                      <button
                        className="afterNone list-group-item list-group-item-action radius-none px-3"
                        onClick={() => {
                          setSearchInput("");
                          setSearchResult([]);
                          setSelLan("es");
                          i18n.changeLanguage("es");
                        }}
                      >
                        Español
                      </button>
                    </li>
                    <li
                      className="dropdown dropdown-animate dropdown-submenu radius-none"
                      data-toggle="hover"
                    >
                      <button
                        className="afterNone list-group-item list-group-item-action radius-none px-3"
                        onClick={() => {
                          setSearchInput("");
                          setSearchResult([]);
                          setSelLan("en");
                          i18n.changeLanguage("en");
                        }}
                      >
                        English
                      </button>
                    </li>
                    <li
                      className="dropdown dropdown-animate dropdown-submenu radius-none"
                      data-toggle="hover"
                    >
                      <button
                        className="afterNone list-group-item list-group-item-action radius-none px-3"
                        onClick={() => {
                          setSearchInput("");
                          setSearchResult([]);
                          setSelLan("fr");
                          i18n.changeLanguage("fr");
                        }}
                      >
                        Français
                      </button>
                    </li>
                    <li
                      className="dropdown dropdown-animate dropdown-submenu radius-none"
                      data-toggle="hover"
                    >
                      <button
                        className="afterNone list-group-item list-group-item-action radius-none px-3"
                        onClick={() => {
                          setSearchInput("");
                          setSearchResult([]);
                          setSelLan("pt");
                          i18n.changeLanguage("pt");
                        }}
                      >
                        Português
                      </button>
                    </li>
                    <li
                      className="dropdown dropdown-animate dropdown-submenu radius-none"
                      data-toggle="hover"
                    >
                      <button
                        className="afterNone list-group-item list-group-item-action radius-none px-3"
                        onClick={() => {
                          setSearchInput("");
                          setSearchResult([]);
                          setSelLan("hi");
                          i18n.changeLanguage("hi");
                        }}
                      >
                        हिंदी
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <nav
              role="navigation"
              className="sidebar-nav"
              id="Sidebar-scroll"
              style={{ minWidth: "305px" }}
            >
              {/* {
                t("Docs").map(docs => {
                // const abc = (doc) => {
                //   doc.data.map((dat) => {
                //     if(dat?.title?.toString().includes(searchInput)){
                //       res.push({
                //         "cat":doc.category,
                //         "title":dat.title,
                //       })
                //     }
                //     if(dat?.content){
                //       dat.content?.map((data) => {
                //         console.log("1.=>",data?.item?.toString().toLowerCase(),"2.=>",searchInput.toString().toLowerCase(),data?.item?.toString().toLowerCase().includes(searchInput.toString().toLowerCase()));
                //         if(data?.item?.toString().toLowerCase().includes(searchInput.toString().toLowerCase())){ 
                //             if(data.type==="list"){
                //               data.item.map((data)=>{
                //                 const docs={};
                //                 docs.data=[{
                //                   title:dat.title,
                //                   content:data.item,
                //                   link:dat.link
                //                 }];
                //                 docs.category=doc.category;
                //                 abc(docs);
                //               })
                //             }
                //             res.push({
                //               "cat":doc.category,
                //               "title":dat.title,
                //               "item":data.item,
                //               "link":dat.link
                //             })
                //         }
                //       })
                //     } 
                //   });
                //   console.log(res);
                // };
                searchHandler(docs)
              })} */}
              {t("Docs").map((docs) => {
                return (
                  <div
                    className="sidebar-nav-group NavGroup-shown"
                    key={docs.category}
                  >
                    {docs.category ? (
                      <a href={docs.link}>
                        <h5 className="sidebar-nav-heading link">
                          <font>{docs.category}</font>
                          <div className="NavGroup-expand-button">
                            <div className=" SVGInline SVGInline--cleaned SVG Icon Icon--chevronDown Chevron Chevron-up SVG--color SVG--color--gray200 Box-root Flex-flex">
                              {/* <svg
                                className=" SVGInline-svg SVGInline--cleaned-svg SVG-svg Icon-svg Icon--chevronDown-svg Chevron-svg Chevron-up-svg SVG--color-svg SVG--color--gray200-svg"
                                height="16"
                                viewBox="0 0 16 16"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ width: "12px", height: "12px" }}
                              >
                                <path
                                  d="M13.591 5.293a1 1 0 0 1 1.416 1.416l-6.3 6.3a1 1 0 0 1-1.414 0l-6.3-6.3A1 1 0 0 1 2.41 5.293L8 10.884z"
                                  fillRule="evenodd"
                                ></path>
                              </svg> */}
                            </div>
                          </div>
                        </h5>
                      </a>
                    ) : null}
                    {docs.data ? (
                      <ul className="sidebar-nav-items loaded">
                        {docs.data.map((data) => {
                          // console.log(data);
                          return data?.title ? (
                            <li className="listTopic" key={data?.title}>
                              <a
                                className="sidebar-nav-item hoverable expandable"
                                href={data?.link}
                              >
                                {data?.title}
                              </a>
                              {data?.type === "topic" ? (
                                <ul
                                  className="sidebar-nav-items loaded"
                                  style={{ height: "100%" }}
                                >
                                  {data?.content.map((content) => {
                                    return (
                                      <li key={content?.title}>
                                        <a
                                          className="sidebar-nav-item hoverable expandable"
                                          href={content?.link}
                                        >
                                          {content?.title}
                                        </a>
                                      </li>
                                    );
                                  })}
                                </ul>
                              ) : null}
                            </li>
                          ) : null;
                        })}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
            </nav>
          </>
        }
        inverted
        styles={{
          gridColumn: "span 1",
          color: "6264a7",
          height: "100vh",
          overflow: "scroll",
          padding: "0px",
          margin: "0px",
          minWidth: "305px",
        }}
      />
      <Segment
        content={
          <div className="fixedheight pl-5 pr-4">
            <div className="container">
              {t("Docs").map((docs, key1) => {
                return (
                  <div
                    className="category"
                    key={"category" + key1}
                    id={docs.link?.substring(1)}
                  >
                    <h2>{docs?.category}</h2>
                    {docs?.data?.map((data, key2) => {
                      return data?.type === "info" ? (
                        <p>{data?.item}</p>
                      ) : data?.type === "infoList" ? (
                        data?.item.map((item, key3) =>
                          typeRenderHandler(item, key1 + key2 + key3)
                        )
                      ) : (
                        <div
                          className={
                            data?.type === "topic" ? "category" : "cttt"
                          }
                          id={data?.link?.substring(1)}
                          key={"topic" + key1 + key2}
                        >
                          <h3>{data?.title}</h3>
                          {data?.type === "topic"
                            ? data?.content?.map((content, key3) => (
                                <div
                                  className="cttt"
                                  id={content?.link?.substring(1)}
                                  key={"subTopic" + key1 + key2 + key3}
                                >
                                  <h4>{content?.title}</h4>
                                  {contentRenderHandler(
                                    content,
                                    docs.category + key1 + key2 + key3
                                  )}
                                </div>
                              ))
                            : contentRenderHandler(data, key1 + key2)}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        }
        styles={{
          gridColumn: "span 3",
          padding: "0px",
          margin: "0px",
          border: "0",
        }}
      />
      {/* <Segment
        color="brand"
        content="Footer"
        inverted
        styles={{
          gridColumn: "span 4",
        }}
      /> */}
      {/* SearchModal */}
      <div
        className="modal fade"
        id="searchModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="SearchModalLabel"
        aria-hidden="true"
        style={{ background: "rgba(82,95,127,.25)" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {/* <div className="modal-header"> */}
            {/* <div className="SearchBar"><label className="SearchBar-label" for="SearchBar-input"><div className="SearchBar-icon-spacing"><div className="SVGInline SVGInline--cleaned SVG Icon Icon--search SearchIcon SVG--color SVG--color--gray200 Box-root Flex-flex"><svg className="SVGInline-svg SVGInline--cleaned-svg SVG-svg Icon-svg Icon--search-svg SearchIcon-svg SVG--color-svg SVG--color--gray200-svg" style={{width: "12px",height: "12px"}} height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M12.6 11.2c.037.028.073.059.107.093l3 3a1 1 0 1 1-1.414 1.414l-3-3a1.009 1.009 0 0 1-.093-.107 7 7 0 1 1 1.4-1.4zM7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z" fillRule="evenodd"></path></svg></div></div><input id="SearchBar-input" type="search" placeholder="Go to…" autocomplete="off" value="" className=""/></label></div> */}
            {/* <h5 className="modal-title" id="SearchModalLabel">Search</h5> */}
            {/* </div> */}
            <div className="modal-body pt-4 pb-3">
              {/* <div className="Search-wrapper"><button type="button" className="Search-searchbar"><div className="SVGInline SVGInline--cleaned SVG Icon Icon--search SearchIcon SVG--color SVG--color--gray200 Box-root Flex-flex"><svg className="SVGInline-svg SVGInline--cleaned-svg SVG-svg Icon-svg Icon--search-svg SearchIcon-svg SVG--color-svg SVG--color--gray200-svg" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" style={{width: "12px",height: "12px"}}><path d="M12.6 11.2c.037.028.073.059.107.093l3 3a1 1 0 1 1-1.414 1.414l-3-3a1.009 1.009 0 0 1-.093-.107 7 7 0 1 1 1.4-1.4zM7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z" fillRule="evenodd"></path></svg></div>Find anything<kbd className="Search-searchbar-kbd">/</kbd></button></div> */}
              <Input
                icon={<SearchIcon />}
                clearable
                placeholder={t("DocsLables")["1"] + "..."}
                id="searchInp"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                focusable
                fluid
              />
            </div>
            <div className="modal-body resultBody">
              <ul className="p-0 searchResult">
                {searchResult &&
                  searchResult
                    .filter((data) => data.title)
                    .map((data, key) => {
                      return (
                        <li
                          className="p-1"
                          type="none"
                          key={key}
                          onClick={() => {
                            document
                              .getElementById("searchModal")
                              .classList.remove("show");
                            document.getElementById(
                              "searchModal"
                            ).style.display = "none";
                            document
                              .getElementById("searchModal")
                              .setAttribute("aria-hidden", "true");
                            setTimeout(() => {
                              // document.getElementById("searchModal").classList.add('show');
                              // document.getElementById("searchModal").style.display='block';
                              // document.getElementById('searchModal').removeAttribute('aria-hidden');
                              document.getElementById("searchBtn").click();
                            }, 200);
                          }}
                        >
                          <a href={data?.link}>
                            <h6 className="text-ellipsis">
                              {data?.cat} {">"}{" "}
                              <a href={data?.link} className="text-ellipsis">
                                {data?.title}
                              </a>
                            </h6>
                            <p className="text-ellipsis mb-1 text-dark">
                              {data?.item}
                            </p>
                          </a>
                        </li>
                      );
                    })}
              </ul>
            </div>
            {/* <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div> */}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="contactUs-model"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="contactUs-model"
        aria-hidden="true"
        style={{ backgroundColor: "#0000005e" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content text-left" style={{ top: "100px" }}>
            <div className="col-lg-12 col-md-12 col-sm-12 d-flex flex-column text-start px-4 pb-3 pt-4">
              <div>
                {/* <Icon.X
                        size="18"
                        style={{ float: "right", cursor: "pointer" }}
                        onClick={() => setIsHelp(false)}
                      /> */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    axios
                      .post(`${URL}/api/user/get-contact`, {
                        mail: document.getElementById("input-email").value,
                        name: document.getElementById("input-name").value,
                        message: document.getElementById("input-message").value,
                      })
                      .then((res) => {
                        setIsHelp(false);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                  method="POST"
                >
                  <div className="form-group">
                    <label className="form-control-label" htmlFor="input-name">
                      {t("landing").footer[8][0]}
                    </label>
                    <div className="input-group input-group-merge">
                      <input
                        type="text"
                        className="form-control form-control-prepend"
                        id="input-name"
                        placeholder={t("landing").footer[8][1]}
                        name="name"
                        // onChange={(e) => onInputChange(e)}
                        required
                      />
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <Icon.User size="18" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-control-label" htmlFor="input-email">
                      {t("landing").footer[8][2]}
                    </label>
                    <div className="input-group input-group-merge">
                      <input
                        type="email"
                        className="form-control form-control-prepend"
                        // style={{ borderColor: isError ? "#d3313a" : "" }}
                        id="input-email"
                        placeholder={t("landing").footer[8][3]}
                        name="email"
                        // onChange={(e) => onInputChange(e)}
                        // onBlur={checkUserExits}
                        required
                      />
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          // style={{
                          //   borderColor: isError ? "#d3313a" : "",
                          // }}
                        >
                          <Icon.Mail size="18" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label
                      className="form-control-label"
                      htmlFor="input-message"
                    >
                      {t("landing").footer[8][4]}
                    </label>
                    <div className="input-group input-group-merge">
                      <textarea
                        className="form-control"
                        id="input-message"
                        rows="3"
                        placeholder={t("landing").footer[8][5]}
                        name="message"
                        // onChange={(e) => onInputChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="my-4">
                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="check-terms"
                        onChange={() => setIsChecked(!isChecked)}
                        checked={isChecked}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="check-terms"
                      >
                        {t("landing").footer[8][6] + " "}
                        <a href="/terms" style={{ color: "#d3313a" }}>
                          {t("landing").footer[8][7]}
                        </a>
                      </label>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="btn btn-block btn-primary"
                      id="submit-btn"
                      disabled={!isChecked}
                    >
                      {t("landing").footer[8][8]}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default Docs;
