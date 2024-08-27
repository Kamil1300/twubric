import React, { useEffect, useState } from 'react'
import Button from './components/Button'
import { BorderBeam } from "@/components/magicui/border-beam.tsx";

export default function App() {
  const [sort, setSort] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json')
        if (!response.ok) {
          throw Error(response.statusText)
        }

        const list = await response.json()
        setSort(list)

      } catch (error) {
        console.log(error);

      }
    }
    fetchData()
  }, [])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const sortData = (c) => {
    const sorted = [...sort].sort((a, b) => b.twubric[c] - a.twubric[c])
    setSort(sorted)
  }


  const handleDelete = (uid) => {
    const updatedSort = sort.filter(item => item.uid !== uid)
    setSort(updatedSort)
  }

  return (
    <div className='m-5 font-sans'>
    <div className='flex flex-col items-center mb-10'>
      <h3 className='font-bold mb-4 text-center'>Sort By</h3>
      <div className='flex flex-wrap justify-center gap-4'>
        <Button name="Twubric Score" onClick={() => sortData('total')} />
        <Button name="Friends" onClick={() => sortData('friends')} />
        <Button name="Influence" onClick={() => sortData('influence')} />
        <Button name="Chirpiness" onClick={() => sortData('chirpiness')} />
      </div>
    </div>
      {/* <div>
                <h3>Joined Twitter between</h3>
                <p>Start Date</p>
                {data.join_date}
                </div> */}
      {sort.map((i) => {
        return (
          <div key={i.uid} className='inline-grid gap-4 m-10'>
            <div className="relative">
            <table className='w-full border-2 text-center'>
              <tr className='border-2'>
                <th className='p-3'>{i.username}</th>
                <th className='p-3'></th>
                <th className='p-3'>{i.twubric.total}</th>
              </tr>
              <tr className='border-2'>
                <td className='border-2 p-3'><span className='block p-3'>{i.twubric.friends}</span> Friends</td>
                <td className='border-2 p-3'><span className='block p-3'>{i.twubric.influence}</span> Influence</td>
                <td className='border-2 p-3'><span className='block p-3'>{i.twubric.chirpiness}</span> Chirpiness</td>
              </tr>
              <tr>
                <td>{formatDate(i.join_date)}</td>
                <td></td>
                <button onClick={() => handleDelete(i.uid)} className='p-3 border-2 border-red-500 hover:bg-red-700 hover:text-white text-black focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-2'>Remove</button>
              </tr>
            </table>
              <BorderBeam />
            </div>
          </div>
        )
      })}
    </div>
  )
}
