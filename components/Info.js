import {useWeb3Contract, useWeb3ExecuteFunction, useWeb3Transfer} from "react-moralis";
import {useMoralis} from "react-moralis";
import { GiPodiumWinner } from "react-icons/gi";
import {Form, Formik, Field} from "formik";
import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading, HStack, ListItem,
    Spacer, Text, UnorderedList, useMediaQuery, VStack
} from "@chakra-ui/react";
import {Input} from "@chakra-ui/react";
import abi from "../constants/abi.json"
import {useEffect, useState} from "react";
import  {ethers} from "ethers";
import {useNotification} from "web3uikit";
import Moralis from "moralis-v1";
export default function Info() {

    const { isWeb3Enabled } = useMoralis()
    const [isSmallerThan721] = useMediaQuery('(max-width: 721px)')

    const [players, setPlayers] = useState([])
    const [balance, setBalance] = useState("Wallet not connected to Ethereum")
    const [winner, setWinner] = useState("Wallet not connected to Ethereum")


    async function updateUIValues() {
        // Another way we could make a contract call:
        // const options = { abi, contractAddress: raffleAddress }
        // const fee = await Moralis.executeFunction({
        //     functionName: "getEntranceFee",
        //     ...options,
        // })
        const playersFunction = await getPlayers()
        const playersL = playersFunction ? playersFunction : []
        const balanceFunction = await getBalance()
        const balanceL = balanceFunction ? balanceFunction._hex.toString() : "Wallet not connected to Ethereum"
        const winnerFunction = await getRecentWinner()
        const winnerL = winnerFunction ? winnerFunction.toString() : "Wallet not connected to Ethereum"


        setPlayers(playersL)
        setBalance( balanceL !== "Wallet not connected to Ethereum"? ethers.utils.formatUnits(balanceL, "ether") : "Wallet not connected to Ethereum")
        setWinner(winnerL)

    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues().then(r => console.log(r))
        }
    }, [isWeb3Enabled])

    const {runContractFunction: getPlayers} =
        useWeb3Contract({
            abi: abi,
            contractAddress: "0x5cfC465bcC4f50A71E96b648F27D0A2c404D7c01",
            functionName: "getPlayers",
            params: {},
        });

    const {runContractFunction: getBalance} =
        useWeb3Contract({
            abi: abi,
            contractAddress: "0x5cfC465bcC4f50A71E96b648F27D0A2c404D7c01",
            functionName: "getBalance",
            params: {},
        });

    const {runContractFunction: getRecentWinner} =
        useWeb3Contract({
            abi: abi,
            contractAddress: "0x5cfC465bcC4f50A71E96b648F27D0A2c404D7c01",
            functionName: "getRecentWinner",
            params: {},
        });

    const dispatch = useNotification()

    const {fetch: FundLink} =
        useWeb3Transfer({});



    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleNewNotification(tx)
    }


    return (
        <Flex direction={"column"} position={"relative"} zIndex={"1"}
              bg={"white"} padding={"1vh"} pb={"5vh"} maxW={"100%"}>
            <Center mt={isSmallerThan721 ? "5vh" : "9vh"} mb={"3vh"}> {isSmallerThan721 ?

                <VStack>
                    <Heading size={"3xl"} bgClip={"text"} bgGradient={'linear(to-r, #7C82FF,teal.400 )'} mb={"3vh"}> Check the  </Heading>
                    <Heading size={"3xl"} bgClip={"text"} bgGradient={'linear(to-r, #7C82FF,teal.400 )'} mb={"3vh"}>  Club State </Heading>
                </VStack>


                :
                <Heading size={"3xl"} bgClip={"text"} bgGradient={'linear(to-r, #7C82FF,teal.400 )'} mb={"3vh"}> Check the Club State </Heading>} </Center>
            {isSmallerThan721 ? <Center mb={"4vh"}>
                    <VStack> <Heading  size={"lg"}> Total ETH Pool: </Heading> <Heading bgGradient={"linear(to-r, red.500, yellow.500)"} bgClip={"text"} size={isSmallerThan721 ? "md" :"lg"}> {balance} </Heading> </VStack>
                </Center>
                : <Center mb={"4vh"}>
                <HStack> <Heading  size={"lg"}> Total ETH Pool: </Heading> <Heading bgGradient={"linear(to-r, red.500, yellow.500)"} bgClip={"text"} size={isSmallerThan721 ? "md" :"lg"}> {balance} </Heading> </HStack>
            </Center> }
            <Center> <Heading color={"black"} size={"lg"}> Current members: </Heading> </Center>
            <Center mt={"2vh"} > <Box minWidth={"50%"}>
            <UnorderedList mt={"4vh"}>
                {players.map( (player) => {
                    return (
                        <ListItem color={"red.500"} key={players.indexOf(player)}>
                            <Center><Box>
                                <Text fontSize={"lg"} color={"black"}>
                                    {player}
                                </Text> <Box width={"100%"} height={"2px"} bgGradient={'linear(to-r, #7C82FF,teal.400 )'}> </Box> </Box> </Center>

                            <Center mt={"8vh"} > <Box minWidth={"50%"}>

                            </Box>
                            </Center>
                        </ListItem>

                    )
                })}
            </UnorderedList>
            </Box>
            </Center>
            <Center> <Heading bgGradient={"linear(to-r, red.500, yellow.500)"} bgClip={"text"} size={"lg"}> Latest Winner: </Heading> </Center>
            <Center> <Heading bgGradient={'linear(to-r, #7C82FF,teal.400 )'} bgClip={"text"} size={isSmallerThan721 ? "sm" : "lg"}> {winner} </Heading> </Center>
            <Center> <svg width="0" height="0">
                <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop stopColor="yellow" offset="0%" />
                    <stop stopColor="red" offset="100%" />
                </linearGradient>
            </svg> <GiPodiumWinner size={"20vh"} style={{ fill: "url(#blue-gradient)" }} /> </Center>

        </Flex>
    )
}