import React from 'react'
import { Link } from 'react-router-dom'
import Column from './Column'

type Props = {
  columns: any[],
  data: any[],
  onDelete: (id: number) => void
}

const Row = (props: Props) => { 
  console.log(props.data)
  return (
    <tr>
      {props.columns.map((col, index) => 
        <Column key={index} type={col} value={props.data[col]} />)
      }
      <td className="w-[100px] px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <Link to={`/admin/product/edit/${props.data.id}`} className="text-indigo-600 hover:text-indigo-900">
        Edit
      </Link>
      </td>
      <td className="w-[100px] px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <button onClick={() => props.onDelete(props.data.id)} className="text-indigo-600 hover:text-indigo-900">
        Delete
      </button>
      </td>
    </tr>
  )
}

export default Row