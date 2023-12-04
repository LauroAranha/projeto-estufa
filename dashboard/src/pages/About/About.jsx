import React from 'react';

// Importando Estilo
import './_about.scss';

// Importando Imagens
import system1 from '../../imgs/system1.png';
import system2 from '../../imgs/system2.png';
import system3 from '../../imgs/system3.png';
import estufa1 from '../../imgs/estufa1.png';
import estufa2 from '../../imgs/estufa2.png';
import estufa3 from '../../imgs/estufa3.png';

const About = () => {
  return (
    <div className="container-about">
      <section className="container-introduction">
        <h1 className="introduction-title">Introdução</h1>
        <div className="content-introduction">
          <p className="content-text-introduction">
            O presente trabalho propõe a melhoria do gerenciamento e
            monitoramento de estufas agrícolas por meio da Internet das Coisas
            (IoT).
          </p>
          <p className="content-text-introduction">
            Nesse contexto, o objetivo deste trabalho é usar a IoT para coletar,
            informar e controlar as variáveis edafoclimáticas (temperatura e
            umidade) em estufas agrícolas.
          </p>
          <p className="content-text-introduction">
            Os dados coletados por sensores serão enviados a um servidor em
            nuvem. A partir desse servidor, os dados poderão ser monitorados por
            meio de um Web Site
          </p>
        </div>
      </section>
      <section className="container-groups">
        <h1 className="groups-title">Grupos</h1>
        <div className="align-groups">
          <div className="groups">
            <h4 className="content-title-groups">Grupo Irrigação</h4>
            <p className="content-text-groups">
              Responsáveis pelo desenvolvimento do sistema de irrigação
              automática do projeto de sistema de monitoramento e controle de
              estufas agrícolas.
            </p>
            <ul className="components-list">
              <li>• Sensor de umidade do solo</li>
              <li>• Minibomba 12V RS-385</li>
              <li>• Módulo relé 1 canal</li>
            </ul>
            <img src={system1} alt="logo image" className="arduino-imgs" />
          </div>
          <div className="groups">
            <h4 className="content-title-groups">Grupo Entrada/Saída de ar</h4>
            <p className="content-text-groups">
              Responsáveis pelo desenvolvimento do sistema de controle de
              temperatura e ventilação do projeto de sistema de monitoramento e
              controle de estufas agrícolas.
            </p>

            <ul className="components-list">
              <li>• Entrada/Saída de ar</li>
              <li>• Módulo sensor de temperatura DHT11</li>
              <li>• Micro ventilador 12V 120MM</li>
            </ul>
            <img src={system2} alt="logo image" className="arduino-imgs" />
          </div>
          <div className="groups">
            <h4 className="content-title-groups">Grupo Abertura de Porta</h4>
            <p className="content-text-groups">
              Responsáveis pelo desenvolvimento do sistema de abertura de porta
              do projeto de sistema de monitoramento e controle de estufas
              agrícolas.
            </p>
            <ul className="components-list">
              <li>• Micro servo SG90 - 9Go</li>
              <li>• Módulo sensor de temperatura DHT11</li>
            </ul>
            <img src={system3} alt="logo image" className="arduino-imgs" />
          </div>
        </div>
      </section>
      <section className="container-introduction">
        <h1 className="introduction-title">Estufa e Componentes</h1>
        <div className="content-greenhouse">
          <img src={estufa1} alt="logo image" className="greenhouse-imgs" />
          <img src={estufa2} alt="logo image" className="greenhouse-imgs" />
          <img src={estufa3} alt="logo image" className="greenhouse-imgs" />
        </div>
      </section>
    </div>
  );
};

export default About;
