function GlobalStyle(){
    return (
        <style global jsx>
            {`
                @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap');
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    list-style: none;
                }

                body {
                    font-family: 'Roboto Condensed', sans-serif;
                }
                ::-webkit-scrollbar-track {
                    background-color: #221d1a;
                }
                ::-webkit-scrollbar {
                    width: 6px;
                    background: #221d1a;
                }
                ::-webkit-scrollbar-thumb {
                    background: #070605;
                    border-radius: 10px;
                }
                
                /* App fit Height */ 
                html, body, #__next {
                    min-height: 100vh;
                    display: flex;
                    flex: 1;
                }
                #__next {
                    flex: 1;
                }
                #__next > * {
                    flex: 1;
                }
                /* ./App fit Height */ 
            `}
        </style>
    )
}
export default function MyApp({ Component, pageProps}){
    return (
        <>
            <GlobalStyle/>
            <Component {...pageProps}/>
        </>
    );
}