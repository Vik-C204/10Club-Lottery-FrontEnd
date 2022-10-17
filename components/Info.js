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
    Spacer, Text, UnorderedList
} from "@chakra-ui/react";
import {Input} from "@chakra-ui/react";
import abi from "../constants/abi.json"
import {useEffect, useState} from "react";
import  {ethers} from "ethers";
import {useNotification} from "web3uikit";
import Moralis from "moralis-v1";
export default function Info() {

    const { isWeb3Enabled } = useMoralis()

    const [players, setPlayers] = useState([])
    const [balance, setBalance] = useState("0")
    const [winner, setWinner] = useState("null")


    async function updateUIValues() {
        // Another way we could make a contract call:
        // const options = { abi, contractAddress: raffleAddress }
        // const fee = await Moralis.executeFunction({
        //     functionName: "getEntranceFee",
        //     ...options,
        // })
        const playersL = await getPlayers()
        const balanceL = (await getBalance())._hex.toString()
        const winnerL = (await getRecentWinner()).toString()


        setPlayers(playersL)
        setBalance(ethers.utils.formatUnits(balanceL, "ether"))
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
            contractAddress: "0x9CB7A11015AA6DD3E16E5e59EeE9D3eA4DF08D47",
            functionName: "getPlayers",
            params: {},
        });

    const {runContractFunction: getBalance} =
        useWeb3Contract({
            abi: abi,
            contractAddress: "0x9CB7A11015AA6DD3E16E5e59EeE9D3eA4DF08D47",
            functionName: "getBalance",
            params: {},
        });

    const {runContractFunction: getRecentWinner} =
        useWeb3Contract({
            abi: abi,
            contractAddress: "0x9CB7A11015AA6DD3E16E5e59EeE9D3eA4DF08D47",
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
            <Center mt={"9vh"} mb={"3vh"}> <Heading size={"3xl"} bgClip={"text"} bgGradient={'linear(to-r, #7C82FF,teal.400 )'} mb={"3vh"}> Check the Club State </Heading> </Center>
            <Center mb={"4vh"}>
                <HStack> <Heading color={"#DCAB53"} size={"lg"}> Total ETH Pool: </Heading> <Heading color={"#7C82FF"} size={"lg"}> {balance} </Heading> </HStack>
            </Center>
            <Center> <Heading color={"#DCAB53"} size={"lg"}> Current members: </Heading> </Center>
            <Center mt={"2vh"} > <Box minWidth={"50%"}>
            <UnorderedList mt={"4vh"}>
                {players.map( (player) => {
                    return (
                        <ListItem color={"#DCAB53"} key={players.indexOf(player)}>
                            <Center><Box>
                                <Text fontSize={"lg"} color={"black"}>
                                    {player}
                                </Text> <Box width={"100%"} height={"2px"} bg={"#7C82FF"}> </Box> </Box> </Center>

                            <Center mt={"8vh"} > <Box minWidth={"50%"}>

                            </Box>
                            </Center>
                        </ListItem>

                    )
                })}
            </UnorderedList>
            </Box>
            </Center>
            <Center> <Heading color={"#DCAB53"} size={"lg"}> Latest Winner: </Heading> </Center>
            <Center> <Heading color={"#7C82FF"} size={"lg"}> {winner} </Heading> </Center>
            <Center> <GiPodiumWinner size={"20vh"} color={"#DCAB53"}/>  </Center>

        </Flex>
    )
}