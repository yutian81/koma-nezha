import { SharedClient } from "@/hooks/use-rpc2"
import { getKomariNodes, komariToNezhaWebsocketResponse } from "@/lib/utils"
import React, { useEffect, useRef, useState } from "react"

import { WebSocketContext, WebSocketContextType } from "./websocket-context"

interface WebSocketProviderProps {
  url: string
  children: React.ReactNode
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ url: _url, children }) => {
  const [lastMessage, setLastMessage] = useState<{ data: string } | null>(null)
  const [messageHistory, setMessageHistory] = useState<{ data: string }[]>([])
  const [connected, setConnected] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const getData = () => {
    const rpc2 = SharedClient()
    return rpc2
      .call("common:getNodesLatestStatus")
      .then((res) => {
        const nzwsres = komariToNezhaWebsocketResponse(res)
        setLastMessage({ data: JSON.stringify(nzwsres) })
        setMessageHistory((prev) => {
          const updated = [{ data: JSON.stringify(nzwsres) }, ...prev]
          return updated.slice(0, 30)
        })
      })
      .catch((err) => {
        console.warn("getNodesLatestStatus 失败,等待下一轮:", err?.message || err)
      })
  }

  useEffect(() => {
    getKomariNodes()
    getData().then(() => {
      setConnected(true)
    })

    intervalRef.current = setInterval(() => {
      getData()
    }, 2000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  const contextValue: WebSocketContextType = {
    lastMessage,
    connected,
    messageHistory,
    reconnect: () => {},
    needReconnect: false,
    setNeedReconnect: () => {},
  }

  return <WebSocketContext.Provider value={contextValue}>{children}</WebSocketContext.Provider>
}
