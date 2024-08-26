import React, { useEffect, useState } from 'react'
import Button from './components/Button'

export default function App() {
  const [data, setData] = useState([])
  const [sort,setSort] = useState([])

  useEffect(() => {
    // fetch("https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json").then(response => response.json()).then(data => setData(data))
    // console.log(data.uid);
    const fetchData = async () => {
      try {
        const response = await fetch('https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json')
        if (!response.ok) {
          throw Error(response.statusText)
        }

        const list = await response.json()
        setData(list)
        setSort(list)

      } catch (error) {
        console.log(error);

      }
    }
    fetchData()
  }, [])

  const formatDate = (dateString) => {
    const options = {year: 'numeric', month: 'short', day: '2-digit'}
    return new Date(dateString).toLocaleDateString('en-US',options)
  }

  const sortData = (c) => {
    const sorted = [...data].sort((a,b) => b.twubric[c] - a.twubric[c])
    setSort(sorted)
  }
  return (
    <div className='m-5 font-sans'>
           <div className='m-30'>
            <h3 className='font-bold'>Sort By</h3>
                <Button name="Twubric Score" onClick={()=>sortData('total')}></Button>
                <Button name="Friends" onClick={()=>sortData('friends')}></Button>
                <Button name="Influence" onClick={()=>sortData('influence')}></Button>
                <Button name="Chirpiness" onClick={()=>sortData('chirpiness')}></Button>
                </div>

                {/* <div>
                <h3>Joined Twitter between</h3>
                <p>Start Date</p>
                {data.join_date}
                </div> */}
      {sort.map((i) => {
        return (
          <div className='inline-grid gap-4 m-5'>
          <table key={i.uid} className='w-full border-2 text-center'>
            <tr className='border-2'>
              <th>{i.username}</th>
              <th></th>
              <th>{i.twubric.total}</th>
            </tr>
            <tr className='border-2'>
              <td className='border-2 p-3'><span className='block p-3'>{i.twubric.friends}</span> Friends</td>
              <td className='border-2 p-3'><span className='block p-3'>{i.twubric.influence}</span> Influence</td>
              <td className='border-2 p-3'><span className='block p-3'>{i.twubric.chirpiness}</span> Chirpiness</td>
            </tr>
            <tr>
              <td>{formatDate(i.join_date)}</td>
              <td></td>
              <td>asdasd</td>
            </tr>
          </table>
          </div>
        )
      })}
    </div>
  )
}
