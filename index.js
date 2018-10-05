"use strict"
const log = (...v) => console.log(...v)

const clova = require('@line/clova-cek-sdk-nodejs')
const dgram = require("dgram")
const sock = dgram.createSocket("udp4")

const express = require('express')
const bodyParser = require('body-parser')
const port = 3000

const tello = {
    address: "192.168.10.1",
    port: 8889
}



//////// message ////////////////////////////////////////////////////////////////

const REPROMPT_MESSAGE = "操作したい動作をおっしゃってください。"
const START_MESSAGE = `ドローンコントローラーを起動しました。${REPROMPT_MESSAGE}`
const HELP_MESSAGE = `操作したい動作を言って頂ければドローンを操作します。`
const STOP_MESSAGE = "さようなら！"
const FALLBACK_MESSAGE = "すみません、もう一度話しかけて下さい。"



//////// slot table ////////////////////////////////////////////////////////////////

// 
const actionTable = {
    "離陸": "takeoff",
    "着陸": "land",
    "上昇": "up",
    "下降": "down",
    "旋回": "turn",
    "フリップ": "flip",
    "移動": "move",
}
const directionTable = {
    "右": "right", 
    "左": "left", 
    "前": "forward", 
    "バック": "back", 
}



//////// function ////////////////////////////////////////////////////////////////

// speech
const speech = (responseHelper, message, reprompt) => {
    responseHelper.setSimpleSpeech(
        clova.SpeechBuilder.createSpeechText(message)
    )
    if (!reprompt) return
    responseHelper.setSimpleSpeech(
        clova.SpeechBuilder.createSpeechText(reprompt), true
    )
}

// wait
const wait = ms => new Promise(res => setTimeout(res, ms))

// Telloへcommand送信
const sendTello = async buf => {
    const message = new Buffer(buf)
    sock.send(message, 0, message.length, tello.port, tello.address)
    await wait(100)
}

//
const checkDistance = number => {
    number = Number(number)
    // 200 -> 500 とすることで最大500cmまで指定可能
    return number >= 0 && (number >= 20 && number <= 200)
}
const checkAngle = number => {
    number = Number(number)
    return number >= 0 && (number >= 1 && number <= 360)
}



//////// Handler ////////////////////////////////////////////////////////////////

// 
const launchHandler = async responseHelper => {
    console.log('launchHandler!')
    speech(responseHelper, START_MESSAGE, REPROMPT_MESSAGE)
}

// 
const controllHandler = async responseHelper => {
    console.log('controllHandler!')
    
    let err = false
    
    // get slot
    const slots = responseHelper.getSlots()
    
    const actionName = slots.action || "移動"
    const directionName = slots.direction
    const unitName = slots.unit
    
    const action = actionTable[actionName]
    const direction = directionTable[directionName]
    const number = slots.number
    
    console.log(actionName, directionName, unitName)
    console.log(action, direction, number)
    
    // command
    let command = `${action} `
    let commandName = actionName
    switch (action) {
        case "flip":
            if (direction === "" || !direction) {err = true; break}
            command += direction.slice(0, 1)
            commandName = directionName + actionName
            break
            
        case "up":
        case "down":
            if (!checkDistance(number)) {err = true; break}
            command += number
            commandName = number + unitName + actionName
            break
            
        case "turn":
            if (!checkAngle(number)) {err = true; break}
            if (direction === "right") {
                command = `cw ${number}`
            } else if (direction === "left") {
                command = `ccw ${number}`
            } else {
                err = true
            }
            commandName = number + unitName + directionName + actionName
            break
            
        case "move":
            if (direction === "" || !direction) {err = true; break}
            if (!checkDistance(number)) {err = true; break}
            command = `${direction} ${number}`
            commandName = number + unitName + directionName + "に" +  actionName
            break
            
        case "takeoff":
        case "land":
            command = command.trim()
            break
        default:
            err = true
    }
    console.log(command)
    
    // send tello
    let message = `命令に誤りがあります！もう一度${REPROMPT_MESSAGE}`
    if (!err) {
        await sendTello("command")
        await sendTello(command)
        message = `ラジャー！${commandName}します！`
    }
    console.log(message)
    console.log("")
    
    // speech
    speech(responseHelper, message, "")
}

// 
const guideHandler = async responseHelper => {
    console.log('guideHandler!')
    speech(responseHelper, HELP_MESSAGE)
}

// 
const cancelHandler = async responseHelper => {
    console.log('cancelHandler!')
    sessionEndedHandler(responseHelper)
}

// 
const yesHandler = async responseHelper => {
    console.log('yesHandler!')
    fallbackHandler(responseHelper)
}

// 
const noHandler = async responseHelper => {
    console.log('noHandler!')
    fallbackHandler(responseHelper)
}

// 
const fallbackHandler = async responseHelper => {
    console.log('fallbackHandler!')
    speech(responseHelper, FALLBACK_MESSAGE)
}

// 
const sessionEndedHandler = async responseHelper => {
    console.log('sessionEndedHandler!')
    responseHelper.endSession()
}



//////// export ////////////////////////////////////////////////////////////////

const intentHandler = async responseHelper => {
    switch (responseHelper.getIntentName()) {
        case 'ControllIntent':  return controllHandler(responseHelper)
        case 'Clova.CancelIntent': return cancelHandler(responseHelper)
        case 'Clova.GuideIntent': return guideHandler(responseHelper)
        case 'Clova.YesIntent': return yesHandler(responseHelper)
        case 'Clova.NoIntent': return noHandler(responseHelper)
        default: return fallbackHandler(responseHelper)
    }
}

const skillHandler = clova.Client
    .configureSkill()
    .onLaunchRequest(launchHandler)
    .onIntentRequest(intentHandler)
    .onSessionEndedRequest(sessionEndedHandler)
    .handle()

const app = express()
app.listen(port)
app.use(bodyParser.json(), skillHandler)
