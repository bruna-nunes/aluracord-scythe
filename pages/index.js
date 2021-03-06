import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import BackgroundImage from '../images/bg-login.svg';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import React from 'react';
import axios from 'axios';

function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
      <>
        <Tag>{props.children}</Tag>
        <style jsx>{`
              ${Tag} {
                  color: ${appConfig.theme.colors.highlightIvory['600']};
                  font-size: 24px;
                  font-weight: 600;
                  font-family: 'Roboto Condensed', sans-serif;;
              }
              `}</style>
      </>
    );
}

//Componente React
//function HomePage() {
    //JSX
    //return (
        //<div>
            //<GlobalStyle/> {/* Por convencao, cria-se um comp chamado global style para todos os estilos de reset, fontes etc globais */}
            //<Titulo tag="h1">Boas vindas de voltaa</Titulo>
           // <h2>Discord - Alura Matrix</h2>

            
        //</div>
    //)
//}
  
//export default HomePage

export default function PaginaInicial() {
    const [username, setUsername] = React.useState('Confidencial');
    const [followers, setFollowers] = React.useState('0');
    const [following, setFollowing] = React.useState('0');
    const [localization, setLocalization] = React.useState('Desconhecido')
    const roteamento = useRouter();
    const api = axios.create({
      baseURL: "https://api.github.com",
    });
    
    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            //backgroundColor: appConfig.theme.colors.primary[500],
            //backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
            backgroundImage: `url(${BackgroundImage.src})`,
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals['500'],
            }}
          >
            {/* Formul??rio */}
            <Box
              as="form"
              onSubmit={function(e){
                e.preventDefault();
                roteamento.push(`/chat?username=${username}`);
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Boas vindas ?? Nimbus Cumulo!</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300], fontFamily: 'Roboto Condensed', fontWeight: "bold"}}>
                {appConfig.name}
              </Text>
              {/*<input 
              type="text" 
              value={username}
              onChange={function Handler(event){
                console.log(event.target.value)
                const valor = event.target.value;
                setUsername(valor);
              }}
            />*/}
               
              <TextField
                value={username}
                onChange={
                  function Handler(event){
                    console.log(event.target.value)
                    const valor = event.target.value;
                    api
                    .get("/users/"+valor)
                    .then((response) => {
                      //alert("")
                      setFollowers(response.data.followers);
                      setFollowing(response.data.following);
                      setUsername(valor);
                      setLocalization(response.data.location);
                    })
                    .catch((err) => {
                      console.log(err);
                      setUsername(valor);
                    });
                    //setUsername(valor)
                  }
                }
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.neutrals['400'],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
                
              />
              
              <Button
              
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.highlightIvory['300'],
                  mainColor: appConfig.theme.colors.highlightRed['800'],
                  mainColorLight: appConfig.theme.colors.highlightRed['800'],
                  mainColorStrong: appConfig.theme.colors.highlightRed['700'],

                }}
                styleSheet={{ fontFamily: 'Roboto Condensed', fontWeight: "bold"}}
              />
            </Box>
            {/* Formul??rio */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',

                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body3"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.highlightRed[800],
                  padding: '3px 10px',
                  borderRadius: '1000px',
                  fontFamily: 'Roboto Condensed',
                  textAlign: 'center',
                  marginBottom: '10px',
                }}
              >
                {username}
              </Text>
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 5px',
                  borderRadius: '1000px',
                  fontFamily: 'Roboto Condensed',
                  textAlign: 'center',
                  margiinBottom: '10px',
                }}
              >
                Localiza????o: {localization}
              </Text>
              <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                maxWidth: '220px',
                padding: '2px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
              }}
              >
                <Text
                  variant="body4"
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    padding: '3px 10px',
                    borderRadius: '1000px',
                    fontFamily: 'Roboto Condensed',
                    textAlign: 'center'
                  }}
                >
                  Seguidores: {followers}
                </Text>
                <Text
                  variant="body4"
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    padding: '3px 10px',
                    borderRadius: '1000px',
                    fontFamily: 'Roboto Condensed',
                    textAlign: 'center'
                  }}
                >
                  Seguindo: {following}
                </Text>
              </Box>
              
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }