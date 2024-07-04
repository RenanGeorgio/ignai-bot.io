import { Context, createContext } from 'react';
// import { EventsProps, TasksProps } from '@typography/interfaces';
import { ChatClient } from '@/contexts/chat/types';

interface ClientProps {
    clients: ChatClient[] | null;
}

// export const EventsContext: Context<EventsProps> = createContext<any>({} as EventsProps);

// export const TasksContext: Context<TasksProps> = createContext<any>({} as TasksProps);

export const ClientsContext: Context<ClientProps> = createContext<ClientProps>({} as ClientProps);