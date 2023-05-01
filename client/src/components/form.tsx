import * as React from 'react';
import { GAMES } from '../services/mockGames'
import { useState } from 'react';
import { RocketIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import {  Item } from '../types/types'
// import { postBoardUp } from '../services/apiService';
const postBoardUp = require('../services/apiService')

export function Form() {

  // console.log(GAMES)

  const nav = useNavigate();

  // const [games, setGames] = useState<MockGame[] | undefined>(undefined);
  const [item, setItem] = useState({
    game: '',
    level: '',
    location: '',
    players: '',
    date: '',
    details: '',
    email: '',

  })

  const handleChange = (e: React.ChangeEvent): void => {
    const value = (e.target as HTMLInputElement).value
    setItem({
      ...item,
      [(e.target as HTMLInputElement).name]: value
    })
  }

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    post(item)
    console.log(item)
  }

  //Request to post the form to the BE
  async function post(obj: Item) {
    const res = await postBoardUp(obj);
    return res
  }

  return (
    <div className='grid mt-2 justify-items-center text-accent text-xl font-mono'>

      <div className='bg-black text-base'>
        <div className='grid justify-items-center bg-black pb-5 pt-5 top-0 z-50 cursor-pointer'>
          <img src='./../../logo.png' className='h-16' alt='click logo to redirect to homepage'
            onClick={() => nav('/')}>

          </img>
          <br />
          <p>Create a boardup invite!</p>
        </div>
        <form className="text-accent m-2" onSubmit={handleSubmit}>

          <div className='mb-2'>
            <label>Game:  </label>
            <select
              // size=''
              className='bg-black text-slate-300 border rounded-md' name='game' onChange={handleChange} required>
              <option className='' value=''>search game ...</option>
              {GAMES?.map((ele: any) =>
              //Storing the entire element (game) in the value, to be able to store add info in DB
              (
                <option key={ele.gameID} value={ele.gameName}>{ele.gameName}</option>
              )
              )}
            </select>
          </div>

          <div className='mb-2'>
            <label>Level:  </label>
            <select className='bg-black text-slate-300 border rounded-md' name='level' onChange={handleChange} required>
              <option value="">select level</option>
              <option value="Rookies">Rookies</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert players only">Expert players only</option>
              <option value="All level are welcome!">All levels are welcome!</option>
            </select>
          </div>
          <div className='mb-2'>
            <label>How many players are you looking for? </label>
            <br />
            <input type='number' min='1' max='10' value={item.players} name='players'
              className='bg-black text-slate-300 border rounded-md' onChange={handleChange} required />
          </div>
          <br />

          <label>Location:  </label>
          <div className='flex flex-row mb-2'>
            <textarea
              // rows='3' cols='40'
              style={{ resize: 'none' }}
              value={item.location}
              name='location'
              placeholder=" address or venue.."
              className='bg-black text-slate-300 border rounded-md'
              onChange={handleChange} required >
            </textarea>
          </div>

          <div className='mb-2'>
            <label>Date & Time:  </label>
            <input
              type='datetime-local'
              name='date'
              value={item.date}
              className='bg-black text-slate-300 border rounded-md dark:text-slate-300 dark:[color-scheme:dark]'
              onChange={handleChange}
              required />
          </div>

          <br />

          <label>Details:  </label>

          <div className='mb-2'>
            <textarea
              // rows='3' cols='40'
              style={{ resize: 'none' }}
              value={item.details}
              name='details'
              placeholder=" Tell us more :)"
              className='bg-black text-slate-300 border rounded-md'
              onChange={handleChange} required>
            </textarea>
          </div>

          <div className='mb-2'>
            <label>Your email:  </label>
            <input
              type='email'
              // size='29'
              value={item.email}
              name='email'
              placeholder=" dungeons@dragons.dnd"
              className='bg-black text-slate-300 border rounded-md'
              onChange={handleChange}
              required />
          </div>

          <br />
          <div className='grid justify-items-end'>
            <button className='bg-accent hover:bg-slate-300 text-sm text-black font-bold font-mono py-1 px-1 rounded mt-2'><RocketIcon />Send</button>
          </div>

        </form>
      </div>

    </div>
  )

}