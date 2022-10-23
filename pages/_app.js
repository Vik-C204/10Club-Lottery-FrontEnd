import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/bree-serif/400.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import {useEffect} from "react";


const theme = extendTheme({
  fonts: {
    heading: `'Bree Serif', sans-serif`,
    body: `'Bree Serif', sans-serif`,
  },
});

function MyApp({ Component, pageProps }) {


  return (
    <MoralisProvider initializeOnMount={false}>
      <ChakraProvider theme={theme}>
          <NotificationProvider>
        <Component {...pageProps} />
        </NotificationProvider>
      </ChakraProvider>
    </MoralisProvider>
  );
}

export default MyApp;
