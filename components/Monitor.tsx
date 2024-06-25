import React, { Fragment, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import testAbi from '../utils/abi/testAbi.json'

const provider = new ethers.WebSocketProvider(
  process.env.NEXT_PUBLIC_WEBSOCKET_PROVIDER ?? ''
)
const newPaymentProcessorContract = new ethers.Contract(
  '0x7a2A1269Bf90D28955f6D8Ac3eae91c3E113F236',
  testAbi.abi,
  provider
)


export async function initMonitorWebSocket() {
  console.log('initMonitorWebSocket on ');
  newPaymentProcessorContract.on('PaymentProcessed', (from, to, amount, event) => {
    console.log('PaymentProcessed arrived', from, to, amount, event);
    return { from, to, amount, event }
  })
  provider.websocket.close = (code: number, reason: string) => {
    console.log('WebSocket Close:', code, reason)
  }
  provider.websocket.onerror = (error: Error) => {
    console.error('WebSocket Error:', error)
  }
}