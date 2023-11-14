
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchTodos } from "../../redux/slice/todo";
import React, { useRef, useState, useEffect } from "react";
import grupo from "../../Componentes/assets/grupo2.png";
import Modal from "../../Componentes/modalcopy";
import YouTube from 'react-youtube';
import "./get.css";
import ReCAPTCHA from "react-google-recaptcha"

const Dados = () => {
  const [posts, setPosts] = React.useState([]);


  const dataurl = "https://votacaocode.snctjp.com.br:8001/turma/";
  const [verifica, setVerifica] = React.useState(false);
  const captchaRefs = useRef([]);
  const usedCaptchaRefs = useRef([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const opts = {
    height: '200',
    width: '289',
  }

  const [pageTitle] = useState('Votação Festival');
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);


  function onChange(value, index) {
    setVerifica(true);
    usedCaptchaRefs.current.push(index);
  }
  const votar = async (id, index) => {
    const response = await axios.patch(dataurl + 'Votar/' + id + '/');
    usedCaptchaRefs.current = usedCaptchaRefs.current.filter((usedIndex) => usedIndex !== index);
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
          {state.todo.data && state.todo.data['results'].map((post, index) => (
            <div key={post.id} className="col-md p-4">
              <div
                key={post.id}
                className="card"
                style={{
                  width: "18rem",
                  backgroundImage:
                    "linear-gradient(to right, #D9666B, #98C5CB)",
                }}
              >
                <YouTube videoId={post.linkYoutube} opts={opts} />

                <div className="card-body">
                  <h5 className="card-title" style={{ height: "50px" }}>{post.nomeAplicativo}</h5>
                  <p id="descricao" className="card-text" data-toggle="tooltip" data-placement="top" title={post.descricao}>{post.descricao}</p>


                  <p className="m-0">
                    votos:{post.votos}


                    <button
                      id="redirect"
                      className="btn btn-success votar"
                      style={{ float: "right" }}
                      disabled={!verifica}
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
                      sitekey="6LdsxAspAAAAAHZf5UZsFHmxgs916o4eSnWsFcU6"
                      onChange={(value) => onChange(value, index)}
                      style={{ transform: "scale(0.8)", WebkitTransform: "scale(0.8)", transformOrigin: "0 0", WebkitTransformOrigin: "0 0", marginTop: "20px" }}
                    />
                  </p>
                </div>
              </div>
            </div>
          ))
          }
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