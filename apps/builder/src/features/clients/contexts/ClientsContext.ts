import { Context, createContext } from 'react';
import { EventsProps, TasksProps } from '@typography/interfaces';

export const EventsContext: Context<EventsProps> = createContext<any>({} as EventsProps);

export const TasksContext: Context<TasksProps> = createContext<any>({} as TasksProps);

export const ClientsContext: Context<any> = createContext<any>({} as any);