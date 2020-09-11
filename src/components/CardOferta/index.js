import React, { useState , useEffect } from 'react';

import './styles.css'

import { db } from '../../services/firebase';

import { Card } from 'antd';
import ModalOfertas from '../ModalOfertas';

const CardOferta = () => {
  const [ofertas, setOfertas] = useState([]);
  
  const getOfertas = async () => {
    
    await db.collection('ofertas')
     .onSnapshot((querySnapshot) => {
             const docs = [];
             querySnapshot.forEach((doc) => {
                 docs.push({...doc.data(), id:doc.id});
         });

         setOfertas(docs);
     });
    };

    useEffect(() => {
        getOfertas();
    }, [])

  //   const getLinkById = async (id) => {
  //     const doc = await db.collection('ofertas').doc(id).get();
  //     setValores({...doc.data()})
  //  }

  //  useEffect(() => {
  //      if(props.idUsando === ''){
  //          setValores({...iniciandoForm});
  //      } else {
  //          getLinkById(props.idUsando);
  //      }
  //  // eslint-disable-next-line react-hooks/exhaustive-deps
  //  }, [props.idUsando]) 

  return (
    <>
      <div className="WrapperOferta">

            { ofertas.map( oferta => {
              return(
                <div className="ContentOferta">
                  <Card key={oferta.id}
                  className="CardOferta" 
                  hoverable
                  
                  >
                    <img alt="example" src={oferta.fotos} />

                    <p>{oferta.preco}</p>
                    <p>{oferta.ano}</p>
                    <p>{oferta.marca}</p>
                    <p>{oferta.modelo}</p>
                    <p>{oferta.visualizacao}</p>
              
                  <ModalOfertas/>
                  </Card>

                </div>
                  );  
            })}
            
      </div>
    </>
    )
}
  
export default CardOferta;