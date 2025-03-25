import { useState, useEffect, useRef } from 'react'
import './App.css'
import CreateUpgrade from './upgrades'
import Achievements from './achievements'

function App() {
  const [health, setHealth] = useState(2)
  const [damage, setDamage] = useState(1)
  const [money, setMoney] = useState(0)
  const [PDamage, setPDamage] = useState(0)
  const [defeated, setDefeated] = useState(0)
  const [achieveOpen, setAchieveOpen] = useState(false)
  const newTargetCalled = useRef(false)

 function doDamage() {
    setHealth((prevHealth) => {
      const newHealth = prevHealth - damage;
      if (newHealth <= 0 && !newTargetCalled.current) {
        newTarget();
        newTargetCalled.current = true; 
      }
      return newHealth
    });
  }

  function newTarget() {
    setHealth(() => (defeated + 1) * 4)
    setDefeated((prevDefeated) => prevDefeated + 1);
    setMoney(() => (defeated + 1) * 4)
  }

  useEffect(() => {
    newTargetCalled.current = false;
  }, [health]);

  const upgradeList = [
    {name: 'Stick', desc: 'A stick', cost: 2, passive: false},
    {name: 'Stone', desc: 'A stone', cost: 10, passive: false},
    {name: 'Flower', desc: 'A flower', cost: 50, passive: false},
    {name: 'Tooth', desc: 'A tooth', cost: 250, passive: false},
    {name: 'Hug', desc: 'A hug', cost: 1250, passive: false},
    {name: 'Artisan', desc: 'You have learned how to create tools', cost: 6250, passive: true},
    {name: 'Crude Club', desc: 'A crude club', cost: 31250, passive: false},
  ]

  function toggleAchieveOpen() {
    setAchieveOpen(!achieveOpen)
  }

  return (
    <div id='container'>
      <div id="upgrades-container">
        <h1>Upgrades</h1>
        {upgradeList.map((upgrade) => {
          return (
          <CreateUpgrade 
            key={upgrade.name}
            name={upgrade.name}
            desc={upgrade.desc}
            cost={upgrade.cost}
            setD={setDamage}
            setM={setMoney}
            money={money}
            setPD={setPDamage}
            passive={upgrade.passive}
          />
          )
        })}
      </div>
      <div id="target-container">
        <h1>Target</h1>
        <button type="button" id="target" onClick={doDamage}>{health}</button>
      </div>
      <button type="button" id="open-achievements" onClick={toggleAchieveOpen}>Achievements</button>
      <div id="info-container">
        <div id="money-displayer">Money: {money}</div>
        <div id="damage-displayer">Damage: {damage}</div>
        <div id="passive-damage-displayer">Passive Damage: {PDamage}</div>
        <div id="defeated-displayer">Defeated: {defeated}</div>
      </div>
      <dialog id="achievements-container" className={achieveOpen ? '' : 'hidden'}></dialog>
    </div>
  )
}

export default App
