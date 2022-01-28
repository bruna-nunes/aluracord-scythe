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
import LoadImage from "../images/load-image.gif";
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4ODEzMywiZXhwIjoxOTU4ODY0MTMzfQ.ex7-YX4Azmsnkb1dcZKJt_NWW_E7ttOiZ5gwlUCz8VY';
const SUPABASE_URL = 'https://pxhitljbdrqaaaimhawi.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem){
  return supabaseClient
  .from('mensagens')
  .on('INSERT', (respostaLive) => {
    adicionaMensagem(respostaLive.new);
  }).subscribe();
  
}


export default function ChatPage() {
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
  console.log("usuario logado", usuarioLogado)
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
   React.useEffect(()=> {
    supabaseClient
    .from('mensagens')
    .select('*')
    .order('id', {ascending: false})
    .then(({data}) => {
      setListaDeMensagens(data);
    });

    const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
      
      // Quero reusar um valor de referencia (objeto/array) 
      // Passar uma função pro setState

      // setListaDeMensagens([
      //     novaMensagem,
      //     ...listaDeMensagens
      // ])
      setListaDeMensagens((valorAtualDaLista) => {
        console.log('valorAtualDaLista:', valorAtualDaLista);
        return [
          novaMensagem,
          ...valorAtualDaLista,
        ]
      });
    });

    return () => {
      subscription.unsubscribe();
    }
   }, []); 

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      //id: listaDeMensagens.length + 1,
      de: usuarioLogado,
      texto: novaMensagem,
    };

    supabaseClient
      .from('mensagens')
      .insert([mensagem])
      .then(({data})=> {
        
        //setListaDeMensagens([data[0], ...listaDeMensagens]);
      })

    //chamada de backend
    //setListaDeMensagens([mensagem, ...listaDeMensagens]);
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
          {listaDeMensagens.length == 0 ? <LoadMessage/> : <MessageList mensagens={listaDeMensagens} />}
          
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
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                console.log(sticker);
                handleNovaMensagem(':sticker: ' +sticker)
              }}
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
          <Text variant="heading5">CHAT - Interface da Autoridade</Text>
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

  function LoadMessage(props) {
    return (
      <Box
        tag="ul"
        styleSheet={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: 'center',
          flex: 1,
          color: appConfig.theme.colors.neutrals["000"],
          marginBottom: "16px",
        }}
      >
        <Image src={LoadImage.src} styleSheet={{width: '20%'}}/>
        <Text>Carregando...</Text>
      </Box>
    )
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
                    src={`https://github.com/${mensagem.de}.png`}
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
                onClick={async () => {
                  let novoArrayMensagens = props.mensagens.filter(function(mensagemAtual) {return mensagem.id != mensagemAtual.id})
                    
                  const { data, error } = await supabaseClient
                  .from('mensagens')
                  .delete()
                  .match({ id: mensagem.id });
                  setListaDeMensagens(novoArrayMensagens);
                }}
                />
              </Box>
              {mensagem.texto.startsWith(':sticker:') ? (
                <Image 
                  src={mensagem.texto.replace(':sticker:', '')}
                  styleSheet={{
                    width: {sm: '50%', md: '30%', lg: '15%'},
                  }}
                />
              )
              :
              (
                mensagem.texto
              )
              }
              {/*mensagem.texto*/}
            </Text>
          );
        })}
      </Box>
    );
  }
}

