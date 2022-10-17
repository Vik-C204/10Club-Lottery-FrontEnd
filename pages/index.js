import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Box,
  Button,
  Center,
    Link,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer, Text, VStack,
} from "@chakra-ui/react";
import Header from "../components/Header";
import EnterLotteryButton from "../components/EnterLotteryButton";
import FundLinkButton from "../components/FundLinkButton";
import Welcome from "../components/Welcome";
import FinishLottery from "../components/FinishLottery";
import Info from "../components/Info";
import NextLink from "next/link";
import {FaGithub} from "react-icons/fa";


export default function Home() {
  return (
    <div className={"main"}>
      <Head>
        <title>Lottery@Ethereum</title>
        <meta name="description" content="Lottery DApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


        <Header />

          <Center> <Box position={"relative"} zIndex={"2"} >
            <Welcome />

          </Box></Center>
          <VStack justifyContent={"space-evenly"} spacing={"7vh"}>
            <Box> </Box>
            <EnterLotteryButton />
            <FundLinkButton />
            <Info />
            <FinishLottery />
            <Box height={"20vh"}> </Box>




          </VStack>
      <Box py={"2vh"} bgGradient={'linear(to-r, #7C82FF,teal.400 )'}> <Center>

        <HStack >
           <Text> Copyright © 2022 vik-c024   </Text>
          <NextLink href="https://github.com/vik-c204" passHref>
          <Link> <FaGithub  size={"3vh"}/> </Link>
          </NextLink>
        </HStack>


      </Center> </Box>


    </div>
  );
}
