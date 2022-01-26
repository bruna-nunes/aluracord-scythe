import {
  Box,
  Text,
  TextField,
  Image,
  Button,
  Icon,
} from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import BackgroundImage from "../images/bg-login.svg";

export default function ChatPage() {
  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
  // Sua lógica vai aqui
  /* Usuario
    - Usuario digita no textarea
    - Aperta enter para envier
    - Adiciona texto na listagem de msg */

  // ./Sua lógica vai aqui
  /* Dev
    - (x) campo criado
    - () usar o onchange e o useState pra mudar a variavel de mensagens
    - () lista de mensagens
    */

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      id: listaDeMensagens.length + 1,
      de: "bruna",
      texto: novaMensagem,
    };
    //chamada de backend
    setListaDeMensagens([mensagem, ...listaDeMensagens]);
    setMensagem("");
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals["700"],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          {<MessageList mensagens={listaDeMensagens} />}
          {/*listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>{mensagemAtual.de}: {mensagemAtual.texto}</li>
                        )
            })*/}
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  console.log("enter");

                  /** O comportamento padrao é quebrar linha ao
                   * apertar enter no text area, entao previnimos esse
                   * comportamento */
                  event.preventDefault();

                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              iconName="arrowRight"
              buttonColors={{
                contrastColor: appConfig.theme.colors.highlightIvory["300"],
                mainColor: appConfig.theme.colors.highlightRed["900"],
                mainColorLight: appConfig.theme.colors.highlightRed["800"],
                mainColorStrong: appConfig.theme.colors.highlightRed["700"],
              }}
              onClick={() => handleNovaMensagem(mensagem)}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );

  function Header() {
    return (
      <>
        <Box
          styleSheet={{
            width: "100%",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text variant="heading5">Chat</Text>
          <Button
            variant="tertiary"
            colorVariant="neutral"
            label="Logout"
            href="/"
          />
        </Box>
      </>
    );
  }

  function MessageList(props) {
    return (
      <Box
        tag="ul"
        styleSheet={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column-reverse",
          flex: 1,
          color: appConfig.theme.colors.neutrals["000"],
          marginBottom: "16px",
        }}
      >
        {props.mensagens.map((mensagem) => {
          return (
            <Text
              key={mensagem.id}
              tag="li"
              styleSheet={{
                borderRadius: "5px",
                padding: "6px",
                marginBottom: "12px",
                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                },
              }}
            >
              <Box
                styleSheet={{
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Image
                    styleSheet={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: "8px",
                    }}
                    src={`https://github.com/bruna-nunes.png`}
                  />
                  <Text tag="strong">{mensagem.de}</Text>
                  <Text
                    styleSheet={{
                      fontSize: "10px",
                      marginLeft: "8px",
                      color: appConfig.theme.colors.neutrals[300],
                    }}
                    tag="span"
                  >
                    {new Date().toLocaleDateString()}
                  </Text>
                </Box>
                <Button
                iconName="trash"
                styleSheet={{
                    padding: '0px'
                }}
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals['400'],
                  mainColor: appConfig.theme.colors.neutrals['600'],
                  mainColorLight: appConfig.theme.colors.highlightIvory['900'],
                  mainColorStrong: appConfig.theme.colors.highlightRed['900'],
  
                }}
                onClick={() => {
                    let novoArrayMensagens = props.mensagens.filter(function(mensagemAtual) {return mensagem.id != mensagemAtual.id})
                    console.log(novoArrayMensagens);
                    setListaDeMensagens(novoArrayMensagens);
                }}
                />
              </Box>
              {mensagem.texto}
            </Text>
          );
        })}
      </Box>
    );
  }
}

