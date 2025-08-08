'use client'

import { useState, useEffect, use } from "react";
import api from "@/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
export default function detailPoke({params}:{params:Promise<{detail:string}>}){

    const unwrapped = use(params);
    const pokeId = unwrapped.detail;

    const [pokemonName, setPokemonName] = useState([])
    const [pokeData, setPokeData] = useState([])
    const getPokeData = async ()=>{
        const response = await api.get(`ability/${pokeId}`)
        setPokeData(response.data)
        setPokemonName(response.data.pokemon)
    }

    useEffect(()=>{
        getPokeData()
    },[])

    return(
        <div className="flex flex-col justify-center items-center p-10 w-full h-full" >
            <h1>
            Abilty {pokeData.name}
            </h1>
            <div className="py-10" >
                <Table>
                    <TableCaption>list pokemon with {pokeData.name}</TableCaption>
                    <TableHeader>
                    <TableRow>
                        <TableHead>name</TableHead>
                        <TableHead>link</TableHead>
                        {/* <TableHead>detail</TableHead> */}
                        
                    </TableRow>
                    </TableHeader>
                    {pokemonName.length > 0 ? (
                        <TableBody>
                        {pokemonName.map((pokemon, index)=>(
                            <TableRow key={index}>
                                <TableCell>{pokemon.pokemon.name}</TableCell>
                                <TableCell>{pokemon.pokemon.url}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    ):(
                    <TableRow>
                        <TableCell colSpan={2} > data not found</TableCell>
                    </TableRow>
                    )}
                    
                </Table>
                {/* <h1>Pokemon List</h1>
                {pokemonName.map((pokemon, index)=>(
                    <div key={index}>
                        <h1>{pokemon.pokemon.name}</h1>
                    </div>
                ))} */}
            </div>
        </div>
    )

}