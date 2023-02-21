import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import { NotificationContextProvider } from './NotificationContext' // importataan notificationcontext provider

import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <NotificationContextProvider> { /* tämä on context provider, joka tarjoaa contextin kaikille lapsikomponenteille */}
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </NotificationContextProvider>
)