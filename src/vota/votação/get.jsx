import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchTodos } from "../../redux/slice/todo";
import React, { useRef, useState, useEffect } from "react";
import grupo from "../../Componentes/assets/grupo2.png";
import Modal from "../../Componentes/modalcopy";
import YouTube from 'react-youtube';
import "./get.css";
import ReCAPTCHA from "react-google-recaptcha"
import Card from "./card.js";

const Dados = () => {
  const [posts, setPosts] = React.useState([]);
  const [verifica, setVerifica] = React.useState(false);
  const [disableVoteButton, setDisableVoteButton] = React.useState(false);

  const dataurl = "https://votacaocode.snctjp.com.br:8001/turma/";
  const captchaRefs = useRef([]);
  const usedCaptchaRefs = useRef([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const opts = {
    height: '150',
    width: '194',
  }

  const [pageTitle] = useState('Votação Festival');
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
    if (disableVoteButton) {
      const timer = setTimeout(() => {
        setDisableVoteButton(false);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [disableVoteButton]);

  function onChange(value, index) {
    setVerifica(true);
    usedCaptchaRefs.current.push(index);
  }

  const votar = async (id, index) => {
    const response = await axios.patch(dataurl + 'Votar/' + id + '/');
    usedCaptchaRefs.current = usedCaptchaRefs.current.filter((usedIndex) => usedIndex !== index);
    setDisableVoteButton(true);
  }

  const getPosts = async () => {
    try {
      const response = await axios.get(dataurl);
      const data = response.data;
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    dispatch(fetchTodos())
    getPosts();
  }, []);

  return (
    <div
      className="main-background bg-image"
      style={{
        background: `url(${grupo}) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <div
        style={{ backgroundImage: "linear-gradient(to right, #E2595E, #7AF0F6)", }}
      >
        <br></br>
        <br></br>
        <p className="display-6 text-center text-wrap text-dark">
          Página de Votação do Festival de Aplicativos da Iniciativa CODE
        </p>
        <br></br>
        <br></br>
      </div>

      <div className="col-12 justify-content-center">
        <div className="row justify-content-center">
          {state.todo.data && state.todo.data['detail'].map(post) && state.todo.data['results'].map((post, index) => (
            <div key={post.id} className="col-md p-4">
              <div
                key={post.id}
                className="card"
                style={{
                  width: "12rem",
                  backgroundImage:
                    "linear-gradient(to right, #D9666B, #98C5CB)",
                }}
              >
                <a href={`https://www.youtube.com/watch?v=${post.linkYoutube}`}> <img src={`https://i.ytimg.com/vi/${post.linkYoutube}/mqdefault.jpg`} height={150} width={192}/></a>

                <div className="card-body">
                  <h5 className="card-title" style={{ height: "50px" }}>{post.nomeAplicativo}</h5>
                  <p id="descricao" className="card-text" data-toggle="tooltip" data-placement="top" title={post.descricao}>{post.descricao}</p>

                  <p className="m-0">
                    votos:{post.votos}

                    <button
                      id="redirect"
                      className="btn btn-success votar"
                      style={{ float: "right" }}
                      disabled={!verifica || disableVoteButton}
                      onClick={(e) => {
                        votar(post.id, index);
                        setVerifica(false);
                        usedCaptchaRefs.current.forEach((usedIndex) => captchaRefs.current[usedIndex].reset());
                      }}
                    >
                      votar
                    </button>
                    <ReCAPTCHA
                      ref={(ref) => captchaRefs.current[index] = ref}
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={(value) => onChange(value, index)}
                      style={{ transform: "scale(0.5)", WebkitTransform: "scale(0.5)", transformOrigin: "0 0", WebkitTransformOrigin: "0 0", marginTop: "60px" }}
                    />
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div>
            <button id="previous-page" className="btn btn-success" style={{ float: "left" }} onClick={(e) => { dispatch(fetchTodos(state.todo.data['previous'])); }}> página anterior</button>
            <button id="next-page" className="btn btn-success" style={{ float: "right" }} onClick={(e) => { dispatch(fetchTodos(state.todo.data['next'])); }}> próxima página</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dados;