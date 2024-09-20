import Box from "./box"
import React from "react"

export default function Row (props : {order : boolean}){
    
    if (props.order){
    return<div className=' row flex justify-center' >
    <Box holding = {false} black = {true}></Box>
    <Box holding = {false} black = {false}></Box>
    <Box holding = {false} black = {true}></Box>
    <Box holding = {false} black = {false}></Box>
    <Box holding = {false} black = {true}></Box>
    <Box holding = {false} black = {false}></Box>
    <Box holding = {true} black = {true}></Box>
    <Box holding = {false} black = {false}></Box>
  </div>}
  else{
  return <div className=' row flex justify-center' >
  <Box holding = {false}  black = {false}></Box>
  <Box holding = {false} black = {true}></Box>
  <Box holding = {false}  black = {false}></Box>
  <Box holding = {false} black = {true}></Box>
  <Box holding = {false} black = {false}></Box>
  <Box holding = {false} black = {true}></Box>
  <Box holding = {true} icon = {"whiterook.png"} black = {false}></Box>
  <Box holding = {false} black = {true}></Box>
</div>
  }
}