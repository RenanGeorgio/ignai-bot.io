import { useState, useEffect } from 'react';
import { EventsContext, TasksContext } from '../eventsContext';
//import { eventsStore } from '@store';
//import { UpdateEvents } from '@typography/types/store';
import { useWorkspace } from '@/features/workspace/WorkspaceProvider';
import { EventsSrcProps } from '@typography/interfaces';
import { env } from '@typebot.io/env';
import useUser from '@/hooks/useUser';

export const ClientsProvider = ({ clientId, children }: EventsSrcProps) => { 
    const { jwt } = useUser();
    const { workspace } = useWorkspace();

    const [ conciliationEvent, setConciliationEvent ] = useState<any>({});
    const [ eventsList, setEventsList ] = useState<any[]>([]);

    const workspaceId = workspace?.id;

    //const updateEvents: UpdateEvents = eventsStore(({ updateEvents }) => updateEvents);

    /*useEffect(() => {
        if ((eventsList.length > 0) && (eventsList != undefined)) {
            if (updateEvents != undefined) {
                updateEvents(eventsList);
            }
        }
    }, [eventsList]);*/

    useEffect(() => {
        let events: any = {};

        try {
            try {
                events = new EventSource(`${env.NEXT_PUBLIC_CHATBOT_URL}/updates/events`);
            } catch (e) {
                console.log(e);
            }
            
            const getEvents = (workspaceId: string) => fetch(`/api/events?id=${workspaceId}`, { 
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            }).then((response) => response).catch(err => console.error('[request failed]', err.message));

            try {
                Promise.all([getEvents(workspaceId)])
                .then((responses) => {
                    const dataPromises = responses.map((response: any) => {
                        if (!response.ok) {
                            throw new Error(`Request failed with status ${response.status}`);
                        }
                        return response.json();
                    });
                    return Promise.all(dataPromises);
                    })
                .then((data) => {
                    const { events } = data[0];
                    setEventsList(events);
                })
                .catch((errors) => {
                    console.error(errors)
                });
            } catch (err) {
                console.error(err)
                throw new Error('Request failed to retrieve resources')
            }

            events.addEventListener('update', (event) => {
                const data = event.data;
                setEventsList(data);
                setConciliationEvent(data.data);
            });

            return () => {
                events.close();
            };
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <EventsContext.Provider value={{ conciliationEvent, conciliationLayout }}>
            <TasksContext.Provider value={{ eventsList }}>
                {children}
            </TasksContext.Provider>
        </EventsContext.Provider>
    );
}