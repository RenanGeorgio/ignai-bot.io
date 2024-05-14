import * as React from 'react';
import { Button } from '@chakra-ui/react';
import './History.module.css';

interface ModalHistoryProps {
    close: () => void; 
}

export default function ModalHistory({ close }: ModalHistoryProps) {
    const [open, setOpen] = React.useState(true);
    return (
        <div>
            {open ? (
                <div className='wrapperHistory'>
                    <div className='add'>
                        <span className='textTitle'>Adicionar</span>
                        <div className='btnClose'>
                            <button onClick={close}>X</button>
                        </div>
                    </div>
                    <div 
                    className='formHistory'>
                        <div className='containerHistory'>
                            <span className='spanTitle'>Contato</span>
                            <input className='inputHistory' type="text" />
                        </div>
                  
                        <div className='containerHistory'>
                            <span className='spanTitle'>Assunto</span>
                            <input className='inputHistory' type="text" />
                        </div>
                        <div className='containerHistory'>
                            <span className='spanTitle'>Data</span>
                            <input className='inputHistory' type="date" />
                        </div>
                
                        <div className='containerHistory'>
                            <span className='spanTitle'>Ticket</span>
                            <input className='inputHistory' type="text" />
                        </div>
                        <div className='containerHistory'>
                            <span className='spanTitle'>Status</span>
                            <input className='inputHistory' type="text" />
                        </div>
                        <div className='buttonContainerHistory'>
                            <Button variant='contained'>Confirmar</Button>
                            <Button variant='contained' disabled>Cancelar</Button>
                        </div>
                    </div>

                </div>
            ) : ''}
        </div>
    );
}