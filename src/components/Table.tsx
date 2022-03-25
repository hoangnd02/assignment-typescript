import React from 'react'
import Row from './Row';

type Props = {
  data: any[],
  onDelete: (id: number) => void
}

const Table = (props: Props) => {
  let keys: any[] = [];
  if (props.data.length > 0) {
    keys = Object.keys(props.data[0]);
    console.log(keys)
  }
  return (
    <div>
      <div className="py-[20px] flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-6">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {keys.map((key, index) => 
                    <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {key}
                    </th>
                  )}
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {props.data.map((dataItem, index) => <Row onDelete={props.onDelete} columns={keys} key={index} data={dataItem}/>)}
              </tbody>
              </table>
          </div>
          </div>
      </div>
      </div>
    </div>
  )
}

export default Table